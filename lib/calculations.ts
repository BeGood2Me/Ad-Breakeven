import {
  effectiveConversionValue,
  type BusinessModel,
} from "./business-model";

export type { BusinessModel };

export interface EcommerceInputs {
  aov: number;
  marginPercent: number;
  fixedCostPerOrder: number;
}

export interface BreakEvenAdsInputs extends EcommerceInputs {
  adSpend: number;
  conversionRatePercent: number;
}

export interface BreakEvenAdsResults {
  contributionPerOrder: number | null;
  breakEvenSales: number | null;
  maxCpa: number | null;
  maxCpc: number | null;
  breakEvenRoas: number | null;
  breakEvenRevenue: number | null;
}

export interface AdProfitInputs extends EcommerceInputs {
  adSpend: number;
  sales: number;
}

export interface AdProfitResults {
  revenue: number;
  contribution: number | null;
  profit: number | null;
  roas: number | null;
  profitMarginOnRevenue: number | null;
  isProfitable: boolean | null;
  breakEvenRoas: number | null;
}

export function resolveEffectiveAov(
  model: BusinessModel,
  value: number,
  closeRatePercent: number
): number {
  return effectiveConversionValue(model, value, closeRatePercent);
}

function marginDecimal(marginPercent: number): number {
  return marginPercent / 100;
}

function conversionDecimal(conversionRatePercent: number): number {
  return conversionRatePercent / 100;
}

function safeDivide(numerator: number, denominator: number): number | null {
  if (denominator === 0 || !Number.isFinite(denominator)) return null;
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

export function contributionPerOrder(
  aov: number,
  marginPercent: number,
  fixedCostPerOrder: number
): number | null {
  const contribution = aov * marginDecimal(marginPercent) - fixedCostPerOrder;
  if (contribution <= 0) return null;
  return contribution;
}

export function calculateBreakEvenAds(
  inputs: BreakEvenAdsInputs
): BreakEvenAdsResults {
  const contribution = contributionPerOrder(
    inputs.aov,
    inputs.marginPercent,
    inputs.fixedCostPerOrder
  );

  const breakEvenSales = contribution
    ? safeDivide(inputs.adSpend, contribution)
    : null;

  const maxCpa = contribution;
  const maxCpc =
    contribution && inputs.conversionRatePercent > 0
      ? contribution * conversionDecimal(inputs.conversionRatePercent)
      : null;

  const breakEvenRevenue =
    breakEvenSales !== null ? breakEvenSales * inputs.aov : null;

  const breakEvenRoas =
    breakEvenRevenue !== null && inputs.adSpend > 0
      ? safeDivide(breakEvenRevenue, inputs.adSpend)
      : null;

  return {
    contributionPerOrder: contribution,
    breakEvenSales,
    maxCpa,
    maxCpc,
    breakEvenRoas,
    breakEvenRevenue,
  };
}

export function calculateBreakEvenRoas(
  aov: number,
  marginPercent: number,
  fixedCostPerOrder: number
): { breakEvenRoas: number | null; contributionPerOrder: number | null } {
  const contribution = contributionPerOrder(aov, marginPercent, fixedCostPerOrder);
  const breakEvenRoas =
    contribution !== null && aov > 0 ? safeDivide(aov, contribution) : null;

  return { breakEvenRoas, contributionPerOrder: contribution };
}

export function calculateMaxCpa(
  aov: number,
  marginPercent: number,
  fixedCostPerOrder: number
): number | null {
  return contributionPerOrder(aov, marginPercent, fixedCostPerOrder);
}

export function calculateMaxCpcFromInputs(
  aov: number,
  marginPercent: number,
  fixedCostPerOrder: number,
  conversionRatePercent: number
): { maxCpa: number | null; maxCpc: number | null } {
  const maxCpa = calculateMaxCpa(aov, marginPercent, fixedCostPerOrder);
  const maxCpc =
    maxCpa !== null && conversionRatePercent > 0
      ? maxCpa * conversionDecimal(conversionRatePercent)
      : null;
  return { maxCpa, maxCpc };
}

export function calculateAdProfit(inputs: AdProfitInputs): AdProfitResults {
  const revenue = inputs.sales * inputs.aov;
  const contributionPerSale = contributionPerOrder(
    inputs.aov,
    inputs.marginPercent,
    inputs.fixedCostPerOrder
  );

  const contribution =
    contributionPerSale !== null ? contributionPerSale * inputs.sales : null;

  const profit =
    contribution !== null ? contribution - inputs.adSpend : null;

  const roas =
    inputs.adSpend > 0 ? safeDivide(revenue, inputs.adSpend) : null;

  const profitMarginOnRevenue =
    profit !== null && revenue > 0
      ? (safeDivide(profit, revenue) ?? 0) * 100
      : null;

  const isProfitable = profit !== null ? profit > 0 : null;

  const breakEvenRoasResult = calculateBreakEvenRoas(
    inputs.aov,
    inputs.marginPercent,
    inputs.fixedCostPerOrder
  );

  return {
    revenue,
    contribution,
    profit,
    roas,
    profitMarginOnRevenue,
    isProfitable,
    breakEvenRoas: breakEvenRoasResult.breakEvenRoas,
  };
}
