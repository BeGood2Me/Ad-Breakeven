import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenRoasCalculator from "@/components/calculators/BreakEvenRoasCalculator";
import EmbedCodeSection from "@/components/EmbedCodeSection";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import {
  BREAK_EVEN_ROAS_BY_MARGIN,
  formatRoasMultiple,
} from "@/lib/good-roas-benchmarks";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";

const PAGE = {
  title: "Break Even ROAS Calculator (Free) | Find Your Minimum ROAS",
  description:
    "Free break even ROAS calculator from your margin and AOV. Instant floor for Google Ads & Meta — ecommerce or lead gen. No signup. Shareable results.",
  path: "/break-even-roas-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is a break even ROAS calculator?",
    answer:
      "A break even ROAS calculator finds the minimum return on ad spend where contribution margin equals ad spend — the floor below which campaigns lose money after product costs.",
  },
  {
    question: "How do I calculate break-even ROAS?",
    answer:
      "Divide AOV by contribution per order. Contribution = (AOV × gross margin %) − fixed cost. With no fixed costs, break-even ROAS = 1 ÷ margin.",
  },
  {
    question: "What is break-even ROAS at 50% margin?",
    answer:
      "At 50% gross margin with no fixed costs, break-even ROAS is 2.0×. Shipping and payment fees raise that number.",
  },
  {
    question: "Is this calculator free?",
    answer:
      "Yes. Ad Breakeven’s break even ROAS calculator is free, with no signup. Results are shareable via URL.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function BreakEvenRoasPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Break Even ROAS Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Break Even ROAS Calculator</h1>
      <p className="intro">
        Find the minimum ROAS your ads need before they lose money after product
        costs — free, no signup. Enter margin and AOV (or lead value) for an
        instant floor you can use in Google Ads Target ROAS or Meta.
      </p>

      <BreakEvenRoasCalculator />

      <section className="content-section" aria-labelledby="roas-formula">
        <h2 id="roas-formula">Break-even ROAS formula</h2>
        <p className="formula-block">
          Break-even ROAS = AOV ÷ (AOV × margin% − fixed cost per order)
        </p>
        <p>
          With no fixed per-order costs, this simplifies to{" "}
          <code>1 ÷ margin%</code>. A 50% margin means you need at least 2.0×
          ROAS to break even. Full walkthrough:{" "}
          <Link href="/how-to-calculate-break-even-roas">
            how to calculate break-even ROAS
          </Link>
          .
        </p>
      </section>

      <section className="content-section" aria-labelledby="example">
        <h2 id="example">Worked example</h2>
        <div className="example-box">
          <ul>
            <li>AOV = $100</li>
            <li>Gross margin = 40%</li>
            <li>Fixed cost = $0</li>
          </ul>
          <p>
            Contribution = $100 × 40% = <strong>$40</strong>
          </p>
          <p>
            Break-even ROAS = $100 ÷ $40 = <strong>2.5×</strong>
          </p>
          <p>
            Platform ROAS at 2.0× still loses money. You need 2.5× just to cover
            contribution margin.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="quick-table">
        <h2 id="quick-table">Quick break-even ROAS by margin</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Gross margin</th>
                <th scope="col">Break-even ROAS</th>
              </tr>
            </thead>
            <tbody>
              {BREAK_EVEN_ROAS_BY_MARGIN.map(({ margin, breakEvenRoas }) => (
                <tr key={margin}>
                  <td>{margin}%</td>
                  <td>{formatRoasMultiple(breakEvenRoas)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Full table:{" "}
          <Link href="/break-even-roas-by-margin">
            break-even ROAS by margin
          </Link>
          .
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

      <EmbedCodeSection
        embedPath="/embed/break-even-roas"
        title="Break-even ROAS Calculator"
      />

      <RelatedTools
        links={[
          {
            before: "Set Target ROAS above your floor with the ",
            linkText: "Target ROAS Calculator",
            href: "/target-roas-calculator",
            after: ".",
          },
          {
            before: "See ROAS, CPA, and CPC together on the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after: ".",
          },
          {
            before: "Convert your floor to a purchase cap with the ",
            linkText: "Max CPA Calculator",
            href: "/max-cpa-calculator",
            after: ".",
          },
          {
            before: "Turn CPA into a click bid with the ",
            linkText: "Max CPC Calculator",
            href: "/max-cpc-calculator",
            after: ".",
          },
          {
            before: "Learn the formula in ",
            linkText: "How to Calculate Break-even ROAS",
            href: "/how-to-calculate-break-even-roas",
            after: ".",
          },
          {
            before: "Margin benchmarks in ",
            linkText: "What Is a Good ROAS?",
            href: "/what-is-a-good-roas",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
