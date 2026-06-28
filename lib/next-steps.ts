import type { BusinessModel } from "./business-model";
import {
  formatCurrency,
  formatNumber,
  formatPercentOf,
  formatRoas,
} from "./format";

export type NextStepsProps =
  | {
      variant: "hub";
      model: BusinessModel;
      breakEvenRoas: number | null;
      maxCpa: number | null;
      maxCpc: number | null;
      breakEvenSales: number | null;
      adSpend: number;
      conversionRate: number;
      closeRate?: number;
      hasValidContribution: boolean;
    }
  | {
      variant: "break-even-roas";
      model: BusinessModel;
      breakEvenRoas: number | null;
      contribution: number | null;
    }
  | {
      variant: "max-cpa";
      model: BusinessModel;
      maxCpa: number | null;
      closeRate: number;
    }
  | {
      variant: "max-cpc";
      model: BusinessModel;
      maxCpc: number | null;
      maxCpa: number | null;
      conversionRate: number;
    }
  | {
      variant: "ad-profit";
      model: BusinessModel;
      profit: number | null;
      roas: number | null;
      breakEvenRoas: number | null;
    };

export const NEXT_STEPS_HEADINGS: Record<NextStepsProps["variant"], string> = {
  hub: "What to do with your break-even targets",
  "break-even-roas": "What to do with your break-even ROAS",
  "max-cpa": "What to do with your max CPA",
  "max-cpc": "What to do with your max CPC",
  "ad-profit": "What to do with your profit results",
};

function maxClosedDealCost(maxCostPerLead: number, closeRate: number): number | null {
  if (closeRate <= 0) return null;
  return maxCostPerLead / (closeRate / 100);
}

export function buildNextStepsLines(props: NextStepsProps): string[] {
  switch (props.variant) {
    case "hub": {
      if (!props.hasValidContribution) {
        return [
          "Fix margin and fixed costs first — contribution must be positive before these targets are usable in your ad platform.",
          "Once contribution is positive, re-run the calculator and compare live ROAS, CPA, and CPC to the targets above.",
        ];
      }

      const roas = formatRoas(props.breakEvenRoas);
      const cpa = formatCurrency(props.maxCpa);
      const cpc = formatCurrency(props.maxCpc);
      const sales = formatNumber(props.breakEvenSales);
      const spend = formatCurrency(props.adSpend);
      const isLeadGen = props.model === "leadgen";
      const volumeLabel = isLeadGen ? "leads" : "sales";
      const acquisitionPhrase = isLeadGen ? "cost per lead" : "cost per acquisition";
      const closedDealCap =
        isLeadGen && props.closeRate && props.closeRate > 0 && props.maxCpa !== null
          ? formatCurrency(maxClosedDealCost(props.maxCpa, props.closeRate))
          : null;
      const leadGenNote = closedDealCap
        ? ` For CRM closed-deal cost, stay at or below ${closedDealCap}.`
        : "";

      const compare =
        props.maxCpc === null
          ? `Compare — Check campaign ROAS against ${roas} and ${acquisitionPhrase} against ${cpa}.${leadGenNote} Add a conversion rate above 0% to calculate a max CPC target.`
          : `Compare — Check campaign ROAS against ${roas}, ${acquisitionPhrase} against ${cpa}, and average CPC against ${cpc}.${leadGenNote}`;

      const steps = [
        compare,
        props.maxCpc === null && props.conversionRate === 0
          ? isLeadGen
            ? `Set CPL target — Use ${cpa} as your cost-per-lead target. Add a conversion rate above 0% to calculate a max CPC bid cap.`
            : `Set CPA target — Use ${cpa} as your target cost per acquisition. Add a conversion rate above 0% to calculate a max CPC bid cap.`
          : isLeadGen
            ? `Set limits — Use ${cpa} as your cost-per-lead target. Cap manual bids around ${cpc} at your current ${formatPercentOf(props.conversionRate)} lead conversion rate.`
            : `Set limits — Use ${cpa} as your target CPA in Google Ads or Meta Ads. Cap manual bids around ${cpc} at your current ${formatPercentOf(props.conversionRate)} conversion rate.`,
        `Hit break-even volume — You need ${sales} ${volumeLabel} to break even on ${spend} ad spend.`,
        `Measure profit — Plug real spend and ${volumeLabel} into the Ad Profit Calculator to see net profit in dollars.`,
        "Recalculate when pricing, margin, AOV, fulfillment costs, or close rate changes — every target shifts with your economics.",
      ];

      return steps;
    }
    case "break-even-roas": {
      if (props.contribution === null) {
        const unit = props.model === "leadgen" ? "lead" : "order";
        return [
          `Adjust margin or fixed costs until contribution per ${unit} is positive — break-even ROAS cannot be calculated otherwise.`,
        ];
      }

      const roas = formatRoas(props.breakEvenRoas);
      const contribution = formatCurrency(props.contribution);
      const unit = props.model === "leadgen" ? "lead" : "sale";

      return [
        `Compare — Check platform-reported ROAS against ${roas}. Platform ROAS ignores margin, so do not use a generic goal like 3× or 4×.`,
        `Set your floor — Treat ${roas} as the minimum efficiency bar in Google Ads, Meta Ads, or your reporting dashboard.`,
        props.model === "leadgen"
          ? `Know your CPL ceiling — You keep ${contribution} per ${unit}, so that is your max affordable cost per lead.`
          : `Know your CPA ceiling — You keep ${contribution} per ${unit}, so that is also your max affordable CPA.`,
        "See ROAS, CPA, CPC, and volume together on the Break-even Ads Calculator.",
      ];
    }
    case "max-cpa": {
      if (props.maxCpa === null) {
        const unit = props.model === "leadgen" ? "lead" : "order";
        return [
          props.model === "leadgen"
            ? `Fix margin and fixed costs until contribution is positive — max cost per lead equals profit per ${unit}.`
            : `Fix margin and fixed costs until contribution is positive — max CPA equals profit per ${unit}.`,
        ];
      }

      const cpa = formatCurrency(props.maxCpa);
      const steps =
        props.model === "leadgen"
          ? [
              `Compare — Check cost per lead against ${cpa}. Every dollar above that is a loss.`,
              `Set target — Use ${cpa} as your cost-per-lead target in Google Ads or Meta Ads.`,
            ]
          : [
              `Compare — Check cost per purchase against ${cpa}. Every dollar above that is a loss.`,
              `Set target CPA — Enter ${cpa} as your target in Google Ads, or benchmark Meta Ads cost per purchase against it.`,
            ];

      if (props.model === "leadgen" && props.closeRate > 0) {
        const closedDealCap = formatCurrency(
          maxClosedDealCost(props.maxCpa, props.closeRate)!
        );
        steps.push(
          `Closed deal cap — At your close rate, ${cpa} per lead equals ${closedDealCap} max cost per closed deal in your CRM.`
        );
      }

      steps.push(`Translate ${cpa} into a bid cap with the Max CPC Calculator.`);
      return steps;
    }
    case "max-cpc": {
      if (props.maxCpa === null) {
        const unit = props.model === "leadgen" ? "lead" : "order";
        return [
          `Fix margin and fixed costs first — max CPC depends on a positive contribution per ${unit}.`,
        ];
      }

      const cpa = formatCurrency(props.maxCpa);
      if (props.maxCpc === null) {
        return [
          props.model === "leadgen"
            ? `Add a conversion rate above 0% to calculate max CPC. At ${cpa} max cost per lead, CPC depends on how often clicks convert.`
            : `Add a conversion rate above 0% to calculate max CPC. At ${cpa} max CPA, CPC depends on how often clicks convert.`,
        ];
      }

      const cpc = formatCurrency(props.maxCpc);
      const cvr = formatPercentOf(props.conversionRate);
      const earnUnit = props.model === "leadgen" ? "lead" : "sale";

      return [
        `Compare — Check average CPC against ${cpc}. At ${cvr} conversion, clicks above that cost more than you earn per ${earnUnit}.`,
        `Set bid caps — Use ${cpc} as a ceiling for manual CPC bids or expensive keywords in Google Ads and Meta Ads.`,
        props.model === "leadgen"
          ? `Improve conversion — Raising conversion above ${cvr} increases affordable CPC without changing your ${cpa} cost-per-lead cap.`
          : `Improve conversion — Raising conversion above ${cvr} increases affordable CPC without changing your ${cpa} max CPA.`,
        "See all targets on the Break-even Ads Calculator.",
      ];
    }
    case "ad-profit": {
      if (props.profit === null || props.roas === null) {
        return [
          "Enter valid margin and cost inputs to see profit-based next steps.",
        ];
      }

      const profit = formatCurrency(props.profit);
      const roas = formatRoas(props.roas);
      const breakEven = formatRoas(props.breakEvenRoas);

      if (props.profit > 0) {
        return [
          `Profitable — Net profit is ${profit} at ${roas} ROAS. Break-even is ${breakEven} — you have room to test scaling if results hold.`,
          `Scale carefully — Increase budget gradually and watch whether ROAS stays at or above ${breakEven}.`,
          "Find other limits — Use the Break-even Ads Calculator for acquisition and CPC targets.",
        ];
      }
      if (props.profit === 0) {
        return [
          `At break-even — ROAS is ${roas}, matching your ${breakEven} threshold. No profit yet — improve margin or efficiency before scaling.`,
          `Find headroom — Small improvements to conversion or AOV push ROAS above ${breakEven} and into profit.`,
        ];
      }
      return [
        `Below break-even — Losing ${profit} at ${roas} ROAS. You need at least ${breakEven} to stop losing money.`,
        `Pause or cut spend — Reduce budget until ROAS exceeds ${breakEven}, or fix offer, landing page, and unit economics first.`,
        "Recalculate targets — Use the Break-even ROAS Calculator after any pricing or margin change.",
      ];
    }
  }
}
