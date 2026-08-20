import type { Metadata } from "next";
import Link from "next/link";
import AdProfitCalculator from "@/components/calculators/AdProfitCalculator";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";

const PAGE = {
  title: "Ad Profit Calculator | Real ROAS After Product Costs",
  description:
    "Ecommerce real ROAS calculator after product costs and ad spend. See net ad profit vs break-even — not platform revenue ROAS alone. Free, no signup.",
  path: "/ad-profit-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is real ROAS after COGS?",
    answer:
      "Platform ROAS is revenue ÷ ad spend. Real ROAS for ecommerce profit compares that to your break-even after product costs (COGS), fees, and spend — so you know if ads make money, not just revenue.",
  },
  {
    question: "Is this a real ROAS calculator for ecommerce?",
    answer:
      "Yes. Enter sales, AOV, margin, and ad spend to see net profit and whether your actual ROAS is above or below break-even after product costs.",
  },
  {
    question: "How is ad profit different from ROAS?",
    answer:
      "ROAS is a revenue multiple. Ad profit is dollars left after contribution and ad spend. A campaign can show healthy platform ROAS and still lose money if margin is thin.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function AdProfitPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Ad Profit Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />
      <h1>Ad Profit Calculator</h1>
      <p className="intro">
        Ecommerce ad profit / real ROAS after product costs — not platform
        revenue ROAS alone. This calculator subtracts COGS and ad spend to show
        net profit and whether you are above or below break-even.
      </p>

      <AdProfitCalculator />

      <section className="content-section" aria-labelledby="profit-formula">
        <h2 id="profit-formula">The formula</h2>
        <p className="formula-block">
          Profit = (Sales × contribution per order) − ad spend
        </p>
        <p className="formula-block">
          ROAS = (Sales × AOV) ÷ ad spend
        </p>
        <p>
          Compare actual ROAS to your{" "}
          <Link href="/break-even-roas-calculator">break-even ROAS</Link>. Above
          the floor with positive profit means real ROAS after COGS is working;
          below means you are funding sales with margin you do not have.
        </p>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">Frequently asked questions</h2>
        <ul className="faq-list">
          {PAGE_FAQ.map((item) => (
            <li key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      <RelatedTools
        links={[
          {
            before: "Find your break-even thresholds with the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after: ".",
          },
          {
            before: "Calculate minimum ROAS with the ",
            linkText: "Break-even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
