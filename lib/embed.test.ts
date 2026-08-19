import test from "node:test";
import assert from "node:assert/strict";
import { buildWidgetScript } from "./embed/widget-script.ts";
import { WIDGET_CATALOG } from "./widgets/catalog.ts";

test("widget script includes site link and calculator mount", () => {
  const script = buildWidgetScript("https://adbreakeven.com", "Ad Breakeven");
  assert.match(script, /https:\/\/adbreakeven\.com/);
  assert.match(script, /Ad Breakeven/);
  assert.match(script, /data-adbreakeven-widget/);
});

test("widget script supports all catalog calculators", () => {
  const script = buildWidgetScript();
  for (const widget of WIDGET_CATALOG) {
    assert.match(script, new RegExp('kind==="' + widget.id + '"'));
  }
});
