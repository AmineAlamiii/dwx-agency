import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const environment = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const context = { waitUntil() {}, passThroughOnException() {} };
const render = (path = "/") =>
  worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    environment,
    context,
  );

test("serves the agency page with its public navigation and usable contact fields", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Dwx Agency/);
  for (const destination of [
    "top",
    "services",
    "work",
    "process",
    "about",
    "contact",
  ])
    assert.match(html, new RegExp(`id="${destination}"`));
  for (const name of ["name", "email", "focus", "message"])
    assert.match(html, new RegExp(`name="${name}"`));
  assert.match(html, /type="email"/);
  assert.match(html, /Send my enquiry/);
  assert.match(html, /Trusted by entrepreneurs/);
  assert.match(html, /artists in/);
  assert.doesNotMatch(html, /Clients include/);
  assert.doesNotMatch(html, /ElGrandeToto|egtworld|work\/elgrandetoto/);
  assert.match(html, /Improve my website/);
  assert.match(html, /INTERACTIVE CONCEPTS/);
  assert.doesNotMatch(html, /Prepare project brief|You review and send/);
  assert.doesNotMatch(
    html,
    /Your site is taking shape|react-loading-skeleton|Building your site/,
  );
});

test("removed project is unavailable and privacy information remains accessible", async () => {
  assert.equal((await render("/work/elgrandetoto")).status, 404);
  const privacy = await render("/privacy");
  assert.equal(privacy.status, 200);
  assert.match(await privacy.text(), /Do Not Track/);
});

function leadEnvironment() {
  const database = new DatabaseSync(":memory:");
  database.exec(
    readFileSync(
      new URL("../drizzle/0000_chubby_bulldozer.sql", import.meta.url),
      "utf8",
    ),
  );
  const DB = {
    prepare(sql) {
      const statement = database.prepare(sql);
      let values = [];
      return {
        bind(...args) {
          values = args;
          return this;
        },
        async first() {
          return statement.get(...values) ?? null;
        },
        async run() {
          return statement.run(...values);
        },
      };
    },
  };
  return { database, env: { ...environment, DB } };
}

const post = (path, body, env, headers = {}) =>
  worker.fetch(
    new Request(`http://localhost${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost",
        ...headers,
      },
      body: JSON.stringify(body),
    }),
    env,
    context,
  );
const validLead = () => ({
  id: randomUUID(),
  name: "QA Business",
  email: "qa@example.invalid",
  focus: "A better website",
  website: "https://example.com",
  message: "We would like to make booking easier.",
  company: "",
});

test("the retired enquiry endpoint cannot bypass Firebase protections", async () => {
  const { database, env } = leadEnvironment();
  try {
    assert.equal((await post("/api/inquiries", validLead(), env)).status, 410);
    assert.equal((await worker.fetch(new Request("http://localhost/api/inquiries"), env, context)).status, 410);
    assert.equal(database.prepare("SELECT COUNT(*) AS count FROM inquiries").get().count, 0);
  } finally { database.close(); }
});

test("conversion tracking stores aggregate counters and rejects arbitrary events", async () => {
  const { database, env } = leadEnvironment();
  try {
    assert.equal(
      (
        await post(
          "/api/events",
          {
            event: "contact_clicked",
            source: "review",
            email: "should-not-be-stored@example.invalid",
          },
          env,
        )
      ).status,
      204,
    );
    assert.equal(
      (
        await post(
          "/api/events",
          { event: "contact_clicked", source: "review" },
          env,
        )
      ).status,
      204,
    );
    const row = database.prepare("SELECT * FROM conversion_daily").get();
    assert.equal(row.count, 2);
    assert.deepEqual(Object.keys(row).sort(), [
      "count",
      "day",
      "event",
      "source",
    ]);
    assert.equal(
      (await post("/api/events", { event: "unknown", source: "review" }, env))
        .status,
      400,
    );
  } finally {
    database.close();
  }
});

test("server rendering preserves tab-panel associations before hydration", async () => {
  const html = await (await render()).text();
  for (const prefix of ["why-tab", "cap-tab", "hero-tab"])
    for (let index = 0; index < 3; index++)
      assert.match(html, new RegExp(`id="${prefix}-${index}"`));
  for (const panel of ["why-panel", "capability-panel"]) {
    assert.match(html, new RegExp(`id="${panel}"`));
    assert.match(html, new RegExp(`aria-controls="${panel}"`));
  }
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tabpanel"/);
});

test("production robots and sitemap routes remain available", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:/);
  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /<urlset\b/);
});
