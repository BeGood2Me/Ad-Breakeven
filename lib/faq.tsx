import Link from "next/link";
import type { ReactNode } from "react";
import {
  BREAK_EVEN_ROAS_DEFINITION,
  MAX_CPA_DEFINITION,
  MAX_CPC_DEFINITION,
  ROAS_VS_ROI_DEFINITION,
} from "@/lib/snippet-definitions";

export interface FaqItem {
  question: string;
  answer: ReactNode;
  plainAnswer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is break-even ROAS?",
    plainAnswer: BREAK_EVEN_ROAS_DEFINITION,
    answer: (
      <>
        {BREAK_EVEN_ROAS_DEFINITION} Use the{" "}
        <Link href="/break-even-roas-calculator">Break Even ROAS Calculator</Link>{" "}
        to find yours from margin and AOV.
      </>
    ),
  },
  {
    question: "How do I calculate break-even ROAS?",
    plainAnswer:
      "Use the free Break Even ROAS Calculator for instant results, or divide AOV by contribution per order manually. Contribution = (AOV × gross margin %) − fixed per-order costs.",
    answer: (
      <>
        For instant results, use the{" "}
        <Link href="/break-even-roas-calculator">Break Even ROAS Calculator</Link>
        . Manually: divide AOV by contribution per order — contribution = (AOV ×
        gross margin %) − fixed costs. Full walkthrough:{" "}
        <Link href="/how-to-calculate-break-even-roas">
          How to Calculate Break-even ROAS
        </Link>
        .
      </>
    ),
  },
  {
    question: "What is a good ROAS?",
    plainAnswer:
      "A good ROAS depends entirely on your margin. With 50% margins, 2.0× is break-even — anything above is profitable. With 25% margins, you need 4.0× just to break even. Do not use generic benchmarks.",
    answer: (
      <>
        A &ldquo;good&rdquo; ROAS depends entirely on your margin. With 50%
        margins, 2.0× is break-even. With 25% margins, you need 4.0× just to
        break even. Calculate your specific threshold with the{" "}
        <Link href="/what-is-a-good-roas">What Is a Good ROAS?</Link> guide or
        the{" "}
        <Link href="/break-even-roas-calculator">Break Even ROAS Calculator</Link>.
      </>
    ),
  },
  {
    question: "What is max CPA?",
    plainAnswer: `${MAX_CPA_DEFINITION} Also called break-even CPA — use the Max CPA Calculator for your number.`,
    answer: (
      <>
        {MAX_CPA_DEFINITION} It is the same as break-even CPA. Calculate it with
        the <Link href="/max-cpa-calculator">max CPA calculator</Link>, or read{" "}
        <Link href="/max-cpa-guide">How to Set Target CPA</Link>.
      </>
    ),
  },
  {
    question: "How do I calculate max CPC?",
    plainAnswer: `${MAX_CPC_DEFINITION} Example: $50 max CPA at 2% conversion → $1.00 max CPC.`,
    answer: (
      <>
        Find max CPA first, then multiply by conversion rate (as a decimal).
        Example: $50 max CPA at 2% conversion → $1.00 max CPC. Use the{" "}
        <Link href="/max-cpc-calculator">Max CPC Calculator</Link> to calculate
        max CPC from your margin and conversion rate.
      </>
    ),
  },
  {
    question: "Can ROAS look good but still lose money?",
    plainAnswer:
      "Yes. ROAS measures revenue, not profit. A 3× ROAS campaign with 25% margins loses money because break-even ROAS is 4×. Always compare ROAS to your margin-based break-even threshold.",
    answer: (
      <>
        Yes — ROAS measures revenue, not profit. A 3× ROAS campaign with 25%
        margins loses money because break-even is 4×. Check actual profit with
        the <Link href="/ad-profit-calculator">Ad Profit Calculator</Link>.
      </>
    ),
  },
  {
    question: "What is the difference between ROAS and ROI?",
    plainAnswer: ROAS_VS_ROI_DEFINITION,
    answer: (
      <>
        {ROAS_VS_ROI_DEFINITION} Read the full
        comparison in <Link href="/roas-vs-roi-vs-cpa">ROAS vs ROI vs CPA</Link>.
      </>
    ),
  },
  {
    question: "What inputs do I need for the break-even calculator?",
    plainAnswer:
      "You need average order value, gross margin percentage, ad spend, and conversion rate. Optionally add fixed per-order costs like shipping subsidies or payment fees for a more accurate result.",
    answer: (
      <>
        You need AOV, gross margin %, ad spend, and conversion rate. Optionally
        add fixed per-order costs. Enter them on the{" "}
        <Link href="/">Break-even Ads Calculator</Link> for instant results across
        ROAS, CPA, and CPC. Use lead gen mode for customer value and close rate.
      </>
    ),
  },
  {
    question: "Does conversion rate affect break-even ROAS?",
    plainAnswer:
      "No. Break-even ROAS depends on margin and AOV, not conversion rate. Conversion rate affects max CPC and how much traffic you can afford at a given bid, but not the ROAS threshold itself.",
    answer: (
      <>
        No — break-even ROAS depends on margin and AOV. Conversion rate affects{" "}
        <Link href="/max-cpc-calculator">max CPC</Link> and traffic affordability,
        not the ROAS threshold. See all metrics on the{" "}
        <Link href="/">Break-even Ads Calculator</Link>.
      </>
    ),
  },
  {
    question: "How often should I recalculate break-even?",
    plainAnswer:
      "Recalculate whenever margins, AOV, fulfillment costs, or product mix changes. For most ecommerce brands, reviewing monthly or after major pricing changes is sufficient.",
    answer: (
      <>
        Recalculate whenever margins, AOV, or fulfillment costs change. Monthly
        reviews work for most brands. Use the{" "}
        <Link href="/">Break-even Ads Calculator</Link> to update all thresholds at
        once.
      </>
    ),
  },
  {
    question: "How does lead gen change break-even calculations?",
    plainAnswer:
      "Use customer value × close rate as expected revenue per lead, then apply the same margin formulas. The calculator's max acquisition target is your cost-per-lead cap; divide by close rate for max cost per closed deal in your CRM.",
    answer: (
      <>
        Use customer value × close rate as expected revenue per lead, then
        calculate contribution and break-even ROAS the same way. Compare ad
        platform cost per lead to the calculator&apos;s max cost per lead. For
        CRM closed-deal cost, divide that cap by your close rate. The{" "}
        <Link href="/">Break-even Ads Calculator</Link> and{" "}
        <Link href="/max-cpa-calculator">Max CPA Calculator</Link> both support
        lead gen mode. See the{" "}
        <Link href="/how-to-calculate-break-even-roas">
          break-even ROAS guide
        </Link>{" "}
        for a worked example.
      </>
    ),
  },
  {
    question: "What should I do after calculating my break-even targets?",
    plainAnswer:
      "Compare live campaign ROAS, CPA, and CPC to your targets. Set CPA and bid caps in your ad platform, decide whether to scale or pause, and measure net profit in dollars — not ratios alone.",
    answer: (
      <>
        Compare live ROAS, CPA, and CPC to your targets. Set limits in Google Ads
        or Meta Ads, scale only when above break-even, and check dollar profit
        with the <Link href="/ad-profit-calculator">Ad Profit Calculator</Link>.
        Each calculator on this site shows tailored next steps when you enter
        your numbers.
      </>
    ),
  },
  {
    question: "Is this site financial advice?",
    plainAnswer:
      "No. Ad Breakeven calculators and guides are for informational and educational purposes only — not financial, tax, or legal advice. Verify results with your own data before changing ad spend.",
    answer: (
      <>
        No — calculators and guides are for informational purposes only, not
        financial, tax, or legal advice. Verify every result with your own data
        before changing budgets. Read the{" "}
        <Link href="/terms">Terms of Use</Link> for details.
      </>
    ),
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.plainAnswer,
    },
  })),
};
