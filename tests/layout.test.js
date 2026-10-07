const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const css = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

function declarations(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(escaped + "\\s*\\{([^}]*)\\}"));
  assert.ok(match, `Missing CSS rule for ${selector}`);
  return match[1];
}

test("the RSVP card corners stay pinned over the relative-children override", () => {
  // `.rsvp-card>*{position:relative}` comes later in the file and would
  // otherwise pull the four paisley corners into the text flow
  assert.match(declarations(".rsvp-card>.corner"), /position\s*:\s*absolute/);
});

test("panel and card corners share the same pinned sizing", () => {
  const corner = declarations(".corner");
  assert.match(corner, /width\s*:\s*34px/);
  assert.match(corner, /height\s*:\s*40px/);
});

test("mobile timeline nodes centre on the spine", () => {
  // The spine sits at 29px and nodes are 58px wide, so a centred node's
  // left edge must land at 0 — its left offset has to mirror the
  // article's margin-left exactly. A stray +29px once left the line
  // grazing the circles' left edge on mobile while desktop centred them.
  const article = declarations(".ev,.ev:nth-child(even)");
  const node = declarations(".ev:nth-child(odd) .node,.ev:nth-child(even) .node");
  const margin = article.match(/margin-left\s*:\s*([\d.]+)rem/);
  const left = node.match(/left\s*:\s*(-[\d.]+)rem/);
  assert.ok(margin, "mobile article rule should set margin-left in rem");
  assert.ok(left, "mobile node rule should set a negative rem left");
  assert.equal(
    left[1],
    `-${margin[1]}`,
    "node left offset must mirror the article margin so circles centre on the spine",
  );
});

test("mobile timeline entries all read left-aligned", () => {
  // Desktop alternates text-align per side; the narrow mobile column
  // must reset the odd entries with an equal-specificity rule, or their
  // text hugs the right edge, far from the spine.
  const mobileStart = css.indexOf("@media(max-width:760px)");
  assert.ok(mobileStart > -1, "the mobile media query should exist");
  assert.ok(
    css.indexOf(".ev:nth-child(odd){text-align:left}", mobileStart) > -1,
    "the mobile block must reset the odd entries' desktop text-align:right",
  );
});
