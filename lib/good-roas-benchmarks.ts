/** Break-even ROAS with no fixed cost per order (ROAS = 100 ÷ margin %). */
export function breakEvenRoasFromMargin(marginPercent: number): number {
  return Math.round((100 / marginPercent) * 100) / 100;
}

export function breakEvenRoasWithFixedCosts(
  aov: number,
  marginPercent: number,
  fixedCostPerOrder: number
): number | null {
  const contribution = aov * (marginPercent / 100) - fixedCostPerOrder;
  if (contribution <= 0) return null;
  return Math.round((aov / contribution) * 100) / 100;
}

export function formatRoasMultiple(value: number): string {
  return `${value.toFixed(2)}×`;
}

export function breakEvenRoasCalculatorHref(margin: number): string {
  return `/break-even-roas-calculator?model=ecommerce&value=100&margin=${margin}&fixedCost=0`;
}

/** Full reference table: 10%–80% gross margin in 5% steps. */
export const BREAK_EVEN_ROAS_TABLE = Array.from({ length: 15 }, (_, index) => {
  const margin = 10 + index * 5;
  return { margin, breakEvenRoas: breakEvenRoasFromMargin(margin) };
});

/** Common margins for shorter benchmark tables. */
export const BREAK_EVEN_ROAS_BY_MARGIN = BREAK_EVEN_ROAS_TABLE.filter((row) =>
  [25, 30, 40, 50, 60, 70].includes(row.margin)
);

export const FIXED_COST_EXAMPLE = {
  aov: 100,
  margin: 50,
  fixedCosts: [0, 5, 10, 15] as const,
};

export function isProfitableAtRoas(
  breakEvenRoas: number,
  targetRoas: number
): boolean {
  return targetRoas >= breakEvenRoas;
}
