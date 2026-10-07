const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const config = require("../config.js");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("config carries a valid, future wedding datetime", () => {
  const t = new Date(config.weddingDateTime).getTime();
  assert.ok(Number.isFinite(t), "weddingDateTime must be a valid ISO datetime");
  assert.ok(t > Date.now(), "weddingDateTime should be in the future");
});

test("no temporary z.ai CDN photo links remain", () => {
  for (const text of [html, script]) {
    assert.doesNotMatch(text, /z-cdn-media\.chatglm\.cn/);
    assert.doesNotMatch(text, /auth_key=/);
  }
});

test("every local asset referenced by the page exists", () => {
  const refs = [...html.matchAll(/(?:href|content)="(assets\/[^"]+)"/g)].map(m => m[1]);
  for (const src of Object.values(config.photos)) refs.push(src);
  assert.ok(refs.length >= 5, "expected the stylesheet, favicon and photos to be referenced");
  for (const ref of refs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `missing file: ${ref}`);
  }
});

test("config.js loads before script.js and the script consumes it", () => {
  const cfgAt = html.indexOf('src="config.js"');
  const jsAt = html.indexOf('src="script.js"');
  assert.ok(cfgAt > -1, "config.js must be loaded from index.html");
  assert.ok(jsAt > cfgAt, "config.js must load before script.js");
  assert.match(script, /window\.INVITE_CONFIG/);
});

test("the photo hooks in the HTML match the config photo keys", () => {
  const hooks = [...html.matchAll(/data-photo="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(hooks.sort(), Object.keys(config.photos).sort());
});
