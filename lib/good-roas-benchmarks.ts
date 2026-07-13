/** Break-even ROAS at common margins with no fixed cost per order (ROAS = 1 / margin%). */
export const BREAK_EVEN_ROAS_BY_MARGIN = [
  { margin: 25, breakEvenRoas: 4.0 },
  { margin: 30, breakEvenRoas: 3.33 },
  { margin: 40, breakEvenRoas: 2.5 },
  { margin: 50, breakEvenRoas: 2.0 },
  { margin: 60, breakEvenRoas: 1.67 },
  { margin: 70, breakEvenRoas: 1.43 },
] as const;
