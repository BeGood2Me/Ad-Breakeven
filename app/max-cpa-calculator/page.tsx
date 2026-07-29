import type { Metadata } from "next";
import Link from "next/link";
import MaxCpaCalculator from "@/components/calculators/MaxCpaCalculator";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";

const PAGE = {
  title: "Max CPA Calculator | Break-even Cost Per Acquisition Free Tool",
  description:
    "Calculate max CPA from contribution margin — (AOV × margin) − fixed costs. Ecommerce purchase caps and lead gen cost-per-lead limits. Free, no signup.",
  path: "/max-cpa-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is max CPA?",
    answer:
      "Max CPA (maximum cost per acquisition) is the highest amount you can pay for one conversion and still break even after product costs. It equals contribution margin per conversion.",
  },
  {
    question: "How do you calculate max CPA?",
    answer:
      "Max CPA = (value × gross margin %) − fixed cost per conversion. For ecommerce, value is AOV. For lead gen, value is customer value × close rate.",
  },
  {
    question: "Is target CPA the same as max CPA?",
    answer:
      "Max CPA is your break-even ceiling. Target CPA in Google Ads or Meta should usually sit at or below max CPA so you leave room for profit and variance.",
  },
  {
    question: "How do I get max cost per lead for lead gen?",
    answer:
      "Toggle lead gen mode, enter deal value, close rate, margin, and any fixed cost per lead. The result is max cost per lead — divide by close rate for a CRM closed-deal cap.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function MaxCpaPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Max CPA Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Max CPA Calculator</h1>
      <p className="intro">
        Find the highest cost per acquisition you can afford before ads lose
        money. Max CPA equals your contribution margin per conversion — for
        ecommerce that is a purchase cap; for lead gen (toggle below) it is max
        cost per lead. Free, no signup.
      </p>

      <MaxCpaCalculator />

      <section className="content-section" aria-labelledby="cpa-formula">
        <h2 id="cpa-formula">The max CPA formula</h2>
        <p className="formula-block">
          Max acquisition cost = (value × margin%) − fixed cost
        </p>
        <p>
          Ecommerce: value is AOV and fixed cost is per order — this is your max
          CPA per purchase. Lead gen: use customer value × close rate as value
          and fixed cost per lead — the result is max cost per lead. That same
          contribution is the profit you keep before ad spend.
        </p>
        <p>
          Full walkthrough with platform settings:{" "}
          <Link href="/max-cpa-guide">How to Set Target CPA</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="ecommerce-example">
        <h2 id="ecommerce-example">Ecommerce example</h2>
        <div className="example-box">
          <ul>
            <li>AOV = $90</li>
            <li>Gross margin = 50%</li>
            <li>Fixed cost per order = $6 (shipping + payment fees)</li>
          </ul>
          <p>
            Contribution = ($90 × 50%) − $6 = <strong>$39</strong>
          </p>
          <p>
            <strong>Max CPA:</strong> $39 per purchase. Enter this as a Target
            CPA ceiling in Google Ads or benchmark Meta cost per purchase
            against it. Spending $45 per sale loses money even if ROAS looks
            fine on the platform.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="leadgen-example">
        <h2 id="leadgen-example">Lead gen example</h2>
        <div className="example-box">
          <ul>
            <li>Customer value = $5,000</li>
            <li>Close rate = 15%</li>
            <li>Gross margin = 60%</li>
            <li>Fixed cost per lead = $0</li>
          </ul>
          <p>
            Expected revenue per lead = $5,000 × 15% = <strong>$750</strong>
          </p>
          <p>
            Max cost per lead = $750 × 60% = <strong>$450</strong>
          </p>
          <p>
            CRM closed-deal cap = $450 ÷ 15% = <strong>$3,000</strong> max cost
            per closed deal.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="when-to-use">
        <h2 id="when-to-use">When to use max CPA vs break-even ROAS</h2>
        <ul>
          <li>
            <strong>Max CPA</strong> — when you bid or report on cost per
            conversion (Target CPA, cost caps, Meta cost per purchase).
          </li>
          <li>
            <strong>Break-even ROAS</strong> — when you optimize on return on
            ad spend (Target ROAS). Same economics, different unit. Use the{" "}
            <Link href="/break-even-roas-calculator">
              Break-even ROAS Calculator
            </Link>{" "}
            or see{" "}
            <Link href="/how-to-calculate-break-even-roas">
              how to calculate break-even ROAS
            </Link>
            .
          </li>
          <li>
            <strong>Max CPC</strong> — when you need a bid ceiling from CPA and
            conversion rate. Use the{" "}
            <Link href="/max-cpc-calculator">Max CPC Calculator</Link>.
          </li>
        </ul>
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
            before: "Find your ROAS floor with the ",
            linkText: "Break-even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: ".",
          },
          {
            before: "Turn max CPA into a bid ceiling with the ",
            linkText: "Max CPC Calculator",
            href: "/max-cpc-calculator",
            after: ".",
          },
          {
            before: "Read the full walkthrough in ",
            linkText: "How to Set Target CPA",
            href: "/max-cpa-guide",
            after: ".",
          },
          {
            before: "See ROAS, CPA, and CPC together on the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
