import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateBreakEvenAds,
  calculateBreakEvenRoas,
  calculateMaxCpcFromInputs,
  resolveEffectiveAov,
} from "./calculations.ts";
import {
  hasRequiredInputs,
  fieldsAreValid,
  parseInput,
  validateField,
} from "./format.ts";
import { effectiveConversionValue } from "./business-model.ts";

test("break-even ROAS at 50% margin", () => {
  const { breakEvenRoas } = calculateBreakEvenRoas(100, 50, 0);
  assert.equal(breakEvenRoas, 2);
});

test("break-even ads example", () => {
  const result = calculateBreakEvenAds({
    aov: 100,
    marginPercent: 50,
    adSpend: 1000,
    conversionRatePercent: 2,
    fixedCostPerOrder: 0,
  });
  assert.equal(result.breakEvenSales, 20);
  assert.equal(result.maxCpa, 50);
  assert.equal(result.maxCpc, 1);
});

test("lead gen effective value", () => {
  assert.equal(effectiveConversionValue("leadgen", 1000, 10), 100);
  assert.equal(resolveEffectiveAov("ecommerce", 100, 10), 100);
});

test("max CPC zero conversion", () => {
  const { maxCpc } = calculateMaxCpcFromInputs(100, 50, 0, 0);
  assert.equal(maxCpc, null);
});

test("format validation", () => {
  assert.equal(validateField("abc", "currency"), "Enter a valid number");
  assert.equal(validateField("110", "percent"), "Must be 100% or less");
  assert.equal(hasRequiredInputs("100", "50"), true);
  assert.equal(hasRequiredInputs("", "50"), false);
  assert.equal(parseInput(""), 0);
  assert.equal(
    fieldsAreValid([
      { value: "100", type: "currency" },
      { value: "110", type: "percent" },
    ]),
    false
  );
  assert.equal(
    fieldsAreValid([
      { value: "100", type: "currency" },
      { value: "50", type: "percent" },
    ]),
    true
  );
  assert.equal(validateField("2.5", "count"), "Enter a whole number");
  assert.equal(validateField("3", "count"), null);
});
