const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

test("every share button is paired with an existing share menu", () => {
  const buttons = [...html.matchAll(/data-share-button[^>]*aria-controls="([^"]+)"/g)].map(m => m[1]);
  const menuIds = [...html.matchAll(/id="([^"]+)" data-share-menu/g)].map(m => m[1]);
  assert.ok(buttons.length >= 2, "expected the inline and floating share buttons");
  assert.ok(menuIds.length >= 2, "expected both share menus");
  for (const id of buttons) {
    assert.ok(menuIds.includes(id), `share button controls a missing menu: #${id}`);
  }
});

test("both share menus offer every channel", () => {
  for (const channel of ["copy", "whatsapp", "messenger", "telegram", "email"]) {
    const n = [...html.matchAll(new RegExp(`data-share="${channel}"`, "g"))].length;
    assert.ok(n >= 2, `channel "${channel}" must exist in both menus (found ${n})`);
  }
});

test("the script wires toggling, outside-click close and Escape", () => {
  assert.match(script, /aria-expanded/);
  assert.match(script, /\[data-share-button\]/);
  assert.match(script, /Escape/);
});

test("copy link falls back to execCommand when the Clipboard API fails", () => {
  assert.match(script, /navigator\.clipboard\.writeText/);
  assert.match(script, /execCommand\('copy'\)/);
});

test("channel buttons are wired within their own menu only", () => {
  // $$() is document-scoped — wiring with $$(selector, menu) would match
  // every channel button on the page, and each menu's loop would attach a
  // second listener: one Copy click, "Link copied" toast twice.
  assert.doesNotMatch(script, /\$\$\s*\([^)]*menu\s*\)/);
  assert.match(script, /menu\.querySelectorAll\('\[data-share\]'\)/);
});

test("the messaging channels compose prefilled links", () => {
  assert.match(script, /https:\/\/wa\.me\/\?text=/);
  assert.match(script, /fb-messenger:\/\/share\/\?link=/);
  assert.match(script, /https:\/\/t\.me\/share\/url\?url=/);
  assert.match(script, /mailto:\?subject=/);
});

test("the share link text comes from the config, not the script", () => {
  assert.match(script, /CFG\.calendar\.title/);
  assert.match(script, /CFG\.weddingDateTime/);
});

test("menus use the open class over the hidden attribute once JS runs", () => {
  assert.match(css, /\.share-menu[^\n]*visibility:\s*hidden/);
  assert.match(css, /\.share-menu\.open[^\n]*visibility:\s*visible/);
  assert.match(css, /\.float-share\.show/);
});
