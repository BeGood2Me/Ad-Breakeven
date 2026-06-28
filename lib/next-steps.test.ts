import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAdProfit,
  calculateBreakEvenAds,
  calculateBreakEvenRoas,
  calculateMaxCpcFromInputs,
  resolveEffectiveAov,
} from "./calculations.ts";
import { buildNextStepsLines } from "./next-steps.ts";

test("hub next steps match break-even ads results", () => {
  const result = calculateBreakEvenAds({
    aov: 100,
    marginPercent: 50,
    adSpend: 1000,
    conversionRatePercent: 2,
    fixedCostPerOrder: 0,
  });

  const lines = buildNextStepsLines({
    variant: "hub",
    model: "ecommerce",
    breakEvenRoas: result.breakEvenRoas,
    maxCpa: result.maxCpa,
    maxCpc: result.maxCpc,
    breakEvenSales: result.breakEvenSales,
    adSpend: 1000,
    conversionRate: 2,
    hasValidContribution: result.contributionPerOrder !== null,
  });

  assert.match(lines[0], /2×/);
  assert.match(lines[0], /\$50\.00/);
  assert.match(lines[0], /\$1\.00/);
  assert.match(lines[2], /20/);
  assert.match(lines[2], /\$1,000\.00/);
});

test("hub next steps handle zero conversion without em dash CPC", () => {
  const result = calculateBreakEvenAds({
    aov: 100,
    marginPercent: 50,
    adSpend: 1000,
    conversionRatePercent: 0,
    fixedCostPerOrder: 0,
  });

  const lines = buildNextStepsLines({
    variant: "hub",
    model: "ecommerce",
    breakEvenRoas: result.breakEvenRoas,
    maxCpa: result.maxCpa,
    maxCpc: result.maxCpc,
    breakEvenSales: result.breakEvenSales,
    adSpend: 1000,
    conversionRate: 0,
    hasValidContribution: true,
  });

  assert.equal(result.maxCpc, null);
  assert.doesNotMatch(lines.join(" "), /CPC against —/);
  assert.match(lines[0], /conversion rate above 0%/i);
  assert.match(lines[1], /Set CPA target/i);
});

test("break-even ROAS next steps match calculator output", () => {
  const { breakEvenRoas, contributionPerOrder } = calculateBreakEvenRoas(
    80,
    40,
    5
  );

  const lines = buildNextStepsLines({
    variant: "break-even-roas",
    model: "ecommerce",
    breakEvenRoas,
    contribution: contributionPerOrder,
  });

  assert.match(lines[0], /2\.96×/);
  assert.match(lines[2], /\$27\.00/);
});

test("max CPA lead gen next steps include cost per lead cap", () => {
  const aov = resolveEffectiveAov("leadgen", 5000, 15);
  const maxCpa = aov * 0.45;

  const lines = buildNextStepsLines({
    variant: "max-cpa",
    model: "leadgen",
    maxCpa,
    closeRate: 15,
  });

  const text = lines.join(" ");
  assert.match(text, /\$337\.50/);
  assert.match(text, /cost per lead/i);
  assert.match(text, /\$2,250\.00/);
});

test("max CPC next steps match calculator output", () => {
  const { maxCpa, maxCpc } = calculateMaxCpcFromInputs(100, 50, 0, 2.5);

  const lines = buildNextStepsLines({
    variant: "max-cpc",
    model: "ecommerce",
    maxCpc,
    maxCpa,
    conversionRate: 2.5,
  });

  assert.match(lines[0], /\$1\.25/);
  assert.match(lines[1], /\$1\.25/);
  assert.match(lines[2], /\$50\.00/);
});

test("ad profit next steps reflect profitable campaign", () => {
  const results = calculateAdProfit({
    aov: 100,
    marginPercent: 50,
    adSpend: 1000,
    sales: 25,
    fixedCostPerOrder: 0,
  });

  const lines = buildNextStepsLines({
    variant: "ad-profit",
    model: "ecommerce",
    profit: results.profit,
    roas: results.roas,
    breakEvenRoas: results.breakEvenRoas,
  });

  assert.match(lines[0], /Profitable/i);
  assert.match(lines[0], /\$250\.00/);
  assert.match(lines[0], /2\.5×/);
  assert.match(lines[0], /2×/);
});

test("ad profit next steps reflect losing campaign", () => {
  const results = calculateAdProfit({
    aov: 100,
    marginPercent: 50,
    adSpend: 1000,
    sales: 15,
    fixedCostPerOrder: 0,
  });

  const lines = buildNextStepsLines({
    variant: "ad-profit",
    model: "ecommerce",
    profit: results.profit,
    roas: results.roas,
    breakEvenRoas: results.breakEvenRoas,
  });

  assert.match(lines[0], /Below break-even/i);
  assert.match(lines[0], /-\$250\.00/);
});

test("invalid contribution shows fix-first guidance", () => {
  const lines = buildNextStepsLines({
    variant: "hub",
    model: "ecommerce",
    breakEvenRoas: null,
    maxCpa: null,
    maxCpc: null,
    breakEvenSales: null,
    adSpend: 1000,
    conversionRate: 2,
    hasValidContribution: false,
  });

  assert.match(lines[0], /Fix margin and fixed costs first/i);
  assert.equal(lines.length, 2);
});
