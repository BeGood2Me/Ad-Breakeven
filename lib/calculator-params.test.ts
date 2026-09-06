import test from "node:test";
import assert from "node:assert/strict";
import {
  hasMeaningfulCalculatorParams,
  serializeParams,
} from "./calculator-params.ts";

test("hasMeaningfulCalculatorParams ignores empty defaults", () => {
  assert.equal(hasMeaningfulCalculatorParams({}), false);
  assert.equal(hasMeaningfulCalculatorParams({ model: "ecommerce" }), false);
  assert.equal(hasMeaningfulCalculatorParams("?model=ecommerce"), false);
  assert.equal(hasMeaningfulCalculatorParams(new URLSearchParams()), false);
});

test("hasMeaningfulCalculatorParams detects shared calculator state", () => {
  assert.equal(hasMeaningfulCalculatorParams({ margin: "50" }), true);
  assert.equal(hasMeaningfulCalculatorParams("?margin=50"), true);
  assert.equal(hasMeaningfulCalculatorParams({ model: "leadgen" }), true);
  assert.equal(
    hasMeaningfulCalculatorParams(new URLSearchParams("margin=50")),
    true
  );
});

test("serializeParams matches meaningful param detection", () => {
  assert.equal(serializeParams({}), "");
  assert.equal(serializeParams({ model: "ecommerce" }), "");
  assert.equal(serializeParams({ model: "ecommerce", margin: "" }), "");
  assert.equal(serializeParams({ margin: "40", value: "100" }), "margin=40&value=100");
  assert.equal(
    serializeParams({ model: "ecommerce", margin: "40", value: "100" }),
    "margin=40&value=100"
  );
  assert.equal(
    serializeParams({ model: "leadgen", margin: "40" }),
    "model=leadgen&margin=40"
  );
});
