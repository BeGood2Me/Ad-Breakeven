import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAdProfit,
  calculateBreakEvenAds,
  calculateBreakEvenRoas,
  calculateMaxCpa,
  calculateMaxCpcFromInputs,
  resolveEffectiveAov,
} from "./calculations.ts";
import {
  formatCurrency,
  formatNumber,
  formatRoas,
} from "./format.ts";
import { buildNextStepsLines } from "./next-steps.ts";

function hubNextSteps(
  result: ReturnType<typeof calculateBreakEvenAds>,
  opts: {
    model: "ecommerce" | "leadgen";
    adSpend: number;
    conversionRate: number;
    closeRate?: number;
  }
) {
  return buildNextStepsLines({
    variant: "hub",
    model: opts.model,
    breakEvenRoas: result.breakEvenRoas,
    maxCpa: result.maxCpa,
    maxCpc: result.maxCpc,
    breakEvenSales: result.breakEvenSales,
    adSpend: opts.adSpend,
    conversionRate: opts.conversionRate,
    closeRate: opts.closeRate,
    hasValidContribution: result.contributionPerOrder !== null,
  });
}

test("break-even ads with fixed costs per order", () => {
  const result = calculateBreakEvenAds({
    aov: 100,
    marginPercent: 50,
    adSpend: 800,
    conversionRatePercent: 2,
    fixedCostPerOrder: 10,
  });

  assert.equal(result.contributionPerOrder, 40);
  assert.equal(result.breakEvenSales, 20);
  assert.equal(result.maxCpa, 40);
  assert.equal(result.maxCpc, 0.8);
  assert.equal(result.breakEvenRoas, 2.5);

  const lines = hubNextSteps(result, {
    model: "ecommerce",
    adSpend: 800,
    conversionRate: 2,
  });
  const text = lines.join(" ");
  assert.match(text, new RegExp(formatRoas(result.breakEvenRoas!).replace("×", "×")));
  assert.match(text, new RegExp(formatCurrency(result.maxCpa!).replace("$", "\\$")));
  assert.match(text, new RegExp(formatCurrency(result.maxCpc!).replace("$", "\\$")));
  assert.match(text, new RegExp(formatNumber(result.breakEvenSales)!));
});

test("lead gen hub calculator and next steps align", () => {
  const effectiveAov = resolveEffectiveAov("leadgen", 5000, 20);
  assert.equal(effectiveAov, 1000);

  const result = calculateBreakEvenAds({
    aov: effectiveAov,
    marginPercent: 40,
    adSpend: 2000,
    conversionRatePercent: 3,
    fixedCostPerOrder: 25,
  });

  assert.equal(result.contributionPerOrder, 375);
  assert.equal(result.maxCpc, 11.25);
  assert.equal(result.breakEvenRoas, 1000 / 375);

  const lines = hubNextSteps(result, {
    model: "leadgen",
    adSpend: 2000,
    conversionRate: 3,
    closeRate: 20,
  });
  const text = lines.join(" ");
  assert.match(text, /leads/);
  assert.match(text, /cost per lead/i);
  assert.match(text, /CRM closed-deal cost/i);
  assert.match(text, new RegExp(formatCurrency(result.maxCpa!).replace("$", "\\$")));
  assert.match(text, new RegExp(formatCurrency(result.maxCpc!).replace("$", "\\$")));
  assert.match(text, new RegExp(formatNumber(result.breakEvenSales)!));
  assert.match(text, /\$2,000\.00/);
});

test("max CPA calculator matches contribution including fixed costs", () => {
  const maxCpa = calculateMaxCpa(120, 55, 8);
  assert.equal(maxCpa, 58);

  const lines = buildNextStepsLines({
    variant: "max-cpa",
    model: "ecommerce",
    maxCpa,
    closeRate: 0,
  });
  assert.match(lines.join(" "), /\$58\.00/);
});

test("max CPC with fixed costs matches next steps", () => {
  const { maxCpa, maxCpc } = calculateMaxCpcFromInputs(120, 55, 8, 1.5);
  assert.equal(maxCpa, 58);
  assert.equal(maxCpc, 0.87);

  const lines = buildNextStepsLines({
    variant: "max-cpc",
    model: "ecommerce",
    maxCpc,
    maxCpa,
    conversionRate: 1.5,
  });
  const text = lines.join(" ");
  assert.match(text, /\$0\.87/);
  assert.match(text, /\$58\.00/);
  assert.match(text, /1\.5%/);
});

test("ad profit at exact break-even uses break-even next steps", () => {
  const results = calculateAdProfit({
    aov: 100,
    marginPercent: 50,
    adSpend: 1000,
    sales: 20,
    fixedCostPerOrder: 0,
  });

  assert.equal(results.profit, 0);
  assert.equal(results.roas, 2);
  assert.equal(results.breakEvenRoas, 2);

  const lines = buildNextStepsLines({
    variant: "ad-profit",
    model: "ecommerce",
    profit: results.profit,
    roas: results.roas,
    breakEvenRoas: results.breakEvenRoas,
  });
  assert.match(lines[0], /At break-even/i);
  assert.match(lines[0], /2×/);
});

test("lead gen ad profit next steps match results", () => {
  const aov = resolveEffectiveAov("leadgen", 8000, 25);
  const results = calculateAdProfit({
    aov,
    marginPercent: 35,
    adSpend: 1500,
    sales: 12,
    fixedCostPerOrder: 50,
  });

  assert.equal(aov, 2000);
  assert.equal(results.contribution, 12 * (2000 * 0.35 - 50));
  assert.equal(results.profit, results.contribution! - 1500);

  const lines = buildNextStepsLines({
    variant: "ad-profit",
    model: "leadgen",
    profit: results.profit,
    roas: results.roas,
    breakEvenRoas: results.breakEvenRoas,
  });
  const text = lines.join(" ");
  assert.match(text, new RegExp(formatCurrency(results.profit!).replace("$", "\\$")));
  assert.match(text, new RegExp(formatRoas(results.roas!).replace("×", "×")));
  assert.match(text, new RegExp(formatRoas(results.breakEvenRoas!).replace("×", "×")));
});

test("break-even ROAS invalid contribution next steps", () => {
  const { breakEvenRoas, contributionPerOrder } = calculateBreakEvenRoas(
    100,
    10,
    15
  );
  assert.equal(contributionPerOrder, null);
  assert.equal(breakEvenRoas, null);

  const lines = buildNextStepsLines({
    variant: "break-even-roas",
    model: "ecommerce",
    breakEvenRoas,
    contribution: contributionPerOrder,
  });
  assert.match(lines[0], /Adjust margin or fixed costs/i);
});

test("all calculator variants expose consistent break-even ROAS for same economics", () => {
  const aov = 100;
  const margin = 50;
  const fixed = 0;

  const hub = calculateBreakEvenAds({
    aov,
    marginPercent: margin,
    adSpend: 500,
    conversionRatePercent: 2,
    fixedCostPerOrder: fixed,
  });
  const roasCalc = calculateBreakEvenRoas(aov, margin, fixed);
  const adProfit = calculateAdProfit({
    aov,
    marginPercent: margin,
    adSpend: 500,
    sales: 10,
    fixedCostPerOrder: fixed,
  });

  assert.equal(hub.breakEvenRoas, roasCalc.breakEvenRoas);
  assert.equal(adProfit.breakEvenRoas, roasCalc.breakEvenRoas);
  assert.equal(hub.maxCpa, calculateMaxCpa(aov, margin, fixed));
});
