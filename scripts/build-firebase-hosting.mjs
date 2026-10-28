import { spawnSync } from "node:child_process";
import { readFile, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";

// A separate export target preserves the existing Worker development setup.
const origin = "https://dwx-agency-leads.web.app";
Object.assign(process.env, {
  DWX_FIREBASE_HOSTING: "1",
  NEXT_PUBLIC_SITE_URL: origin,
  NEXT_PUBLIC_AGGREGATE_TRACKING: "disabled",
});
const build = spawnSync(process.execPath, ["node_modules/vinext/dist/cli.js", "build"], {
  stdio: "inherit", env: process.env,
});
if (build.status !== 0) process.exit(build.status || 1);

const { default: worker } = await import("../dist/server/index.js");
const output = resolve("dist/client");
// The Worker returns a plain-text 404; Hosting needs a complete HTML document.
await writeFile(resolve(output, "404.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Dwx Agency</title>
<style>body{margin:0;min-height:100svh;display:grid;place-items:center;font:18px/1.5 Arial,sans-serif;color:#111;background:#fff}main{padding:32px;max-width:640px}small{color:#777}h1{font-size:clamp(42px,8vw,72px);font-weight:500;letter-spacing:-.06em;line-height:1.05}p{color:#666}a{display:inline-block;margin-top:20px;border-radius:40px;padding:14px 24px;background:#111;color:#fff;text-decoration:none}a:focus-visible{outline:3px solid #f86a35;outline-offset:5px}</style></head>
<body><main><small>DWX AGENCY · 404</small><h1>Let’s get you<br>back on track.</h1><p>We couldn’t find that page.</p><a href="/">Back to Dwx Agency ↗</a></main></body></html>`);
// Vinext exports HTML/RSC pages; metadata routes also need static files.
for (const path of ["/robots.txt", "/sitemap.xml"]) {
  const response = await worker.fetch(new Request(origin + path), {}, { waitUntil() {} });
  assert.equal(response.status, 200, `Export failed: ${path}`);
  const text = await response.text();
  assert.ok(text.includes(origin), `Incorrect public origin in ${path}`);
  await writeFile(resolve(output, path.slice(1)), text);
}
for (const file of ["index.html", "privacy.html", "404.html"]) {
  const html = await readFile(resolve(output, file), "utf8");
  assert.ok(html.length > (file === "404.html" ? 100 : 1000), `Empty export: ${file}`);
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)/g)) {
    await access(resolve(output, match[1].slice(1)));
  }
}
const home = await readFile(resolve(output, "index.html"), "utf8");
assert.ok(home.includes("Send my enquiry"), "Contact form missing from export");
assert.ok(home.includes("Google reCAPTCHA"), "Security disclosure missing");
console.log("Firebase Hosting export verified: pages, metadata and linked assets.");
