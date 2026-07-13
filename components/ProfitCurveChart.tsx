"use client";

import { formatCurrency } from "@/lib/format";

interface ProfitCurveChartProps {
  adSpend: number;
  sales: number;
  contributionPerUnit: number;
  breakEvenSpend: number | null;
}

export default function ProfitCurveChart({
  adSpend,
  sales,
  contributionPerUnit,
  breakEvenSpend,
}: ProfitCurveChartProps) {
  if (contributionPerUnit <= 0 || sales <= 0) return null;

  const revenuePerDollarSpend = (sales * contributionPerUnit) / adSpend;
  if (!Number.isFinite(revenuePerDollarSpend) || revenuePerDollarSpend <= 0) {
    return null;
  }

  const maxSpend = Math.max(adSpend * 1.5, breakEvenSpend ?? adSpend, adSpend);
  const points: string[] = [];
  const steps = 24;

  for (let i = 0; i <= steps; i++) {
    const spend = (maxSpend / steps) * i;
    const profit = sales * contributionPerUnit * (spend / adSpend) - spend;
    const x = 40 + (i / steps) * 280;
    const y = 150 - (profit / (maxSpend * 0.8)) * 120;
    const clampedY = Math.min(150, Math.max(20, y));
    points.push(`${x},${clampedY}`);
  }

  const currentX = 40 + (adSpend / maxSpend) * 280;
  const currentProfit =
    sales * contributionPerUnit - adSpend;
  const currentY = 150 - (currentProfit / (maxSpend * 0.8)) * 120;
  const clampedCurrentY = Math.min(150, Math.max(20, currentY));

  let breakEvenX: number | null = null;
  if (breakEvenSpend !== null && breakEvenSpend <= maxSpend) {
    breakEvenX = 40 + (breakEvenSpend / maxSpend) * 280;
  }

  return (
    <figure className="profit-chart" aria-label="Profit versus ad spend chart">
      <figcaption className="profit-chart-caption">
        Profit vs ad spend at your current sales volume ({sales} conversions)
      </figcaption>
      <svg
        viewBox="0 0 360 180"
        className="profit-chart-svg"
        role="img"
        aria-hidden="true"
      >
        <line x1="40" y1="150" x2="340" y2="150" stroke="var(--color-border)" />
        <line x1="40" y1="20" x2="40" y2="150" stroke="var(--color-border)" />
        <line
          x1="40"
          y1="90"
          x2="340"
          y2="90"
          stroke="var(--color-border)"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {breakEvenX !== null && (
          <line
            x1={breakEvenX}
            y1="20"
            x2={breakEvenX}
            y2="150"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        )}
        <circle
          cx={currentX}
          cy={clampedCurrentY}
          r="5"
          fill="var(--color-primary)"
        />
        <text x="40" y="172" fontSize="10" fill="var(--color-text-muted)">
          $0
        </text>
        <text x="300" y="172" fontSize="10" fill="var(--color-text-muted)">
          {formatCurrency(maxSpend)} spend
        </text>
        <text x="8" y="94" fontSize="10" fill="var(--color-text-muted)">
          $0
        </text>
      </svg>
      <p className="profit-chart-legend">
        <span className="profit-chart-legend-item">
          <span className="profit-chart-dot profit-chart-dot-current" />
          Your ad spend ({formatCurrency(adSpend)})
        </span>
        {breakEvenSpend !== null && (
          <span className="profit-chart-legend-item">
            <span className="profit-chart-dot profit-chart-dot-breakeven" />
            Break-even spend ({formatCurrency(breakEvenSpend)})
          </span>
        )}
      </p>
    </figure>
  );
}
