import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const repository = process.env.GITHUB_REPOSITORY || "AmineAlamiii/dwx-agency";
const [owner, name, ...extra] = repository.split("/");
assert.ok(owner && name && extra.length === 0, `Invalid GitHub repository: ${repository}`);

const userSite = name.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (userSite ? "" : `/${name}`);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${owner.toLowerCase()}.github.io${basePath}`;
Object.assign(process.env, {
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_SITE_URL: siteUrl,
  NEXT_PUBLIC_AGGREGATE_TRACKING: "disabled",
});

const build = spawnSync(process.execPath, ["scripts/build-firebase-hosting.mjs"], {
  stdio: "inherit",
  env: process.env,
});
if (build.status !== 0) process.exit(build.status || 1);

const output = resolve("dist/client");
const home = await readFile(resolve(output, "index.html"), "utf8");
const privacy = await readFile(resolve(output, "privacy.html"), "utf8");
const notFound = await readFile(resolve(output, "404.html"), "utf8");
const assets = await readdir(resolve(output, "assets"));
const privacyPath = basePath ? `${basePath}/privacy.html` : "/privacy";
const clientBundles = await Promise.all(
  assets.filter((file) => file.endsWith(".js")).map((file) => readFile(resolve(output, "assets", file), "utf8")),
);

assert.ok(home.includes(`${basePath}/assets/`), "Pages asset paths are missing the repository base path.");
assert.ok(home.includes(`${basePath}/images/rental/`), "Public image paths are missing the repository base path.");
assert.ok(home.includes(privacyPath), "The privacy link is not Pages-compatible.");
assert.ok(privacy.includes(`${basePath}/`), "The privacy page does not link back to the Pages site root.");
assert.ok(notFound.includes(`href="${basePath}/"`), "The not-found page does not link back to the Pages site root.");
assert.ok(clientBundles.some((bundle) => bundle.includes(basePath) && bundle.includes("/data/land.json")), "The map data path is not present in the client bundle.");
await access(resolve(output, "images/rental/suv.webp"));
await access(resolve(output, "data/land.json"));

console.log(`GitHub Pages export ready for ${siteUrl}`);
