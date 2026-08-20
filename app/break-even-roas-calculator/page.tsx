import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenRoasCalculator from "@/components/calculators/BreakEvenRoasCalculator";
import WidgetSetupSection from "@/components/WidgetSetupSection";
import WidgetCodeSection from "@/components/WidgetCodeSection";
import { getWidgetById } from "@/lib/widgets/catalog";
import JsonLd from "@/components/JsonLd";
import { QuickAnswer } from "@/components/QuickAnswer";
import { RelatedTools } from "@/components/RelatedTools";
import {
  BREAK_EVEN_ROAS_BY_MARGIN,
  formatRoasMultiple,
} from "@/lib/good-roas-benchmarks";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";
import {
  FORMULAS,
  QUICK_ANSWERS,
} from "@/lib/snippet-definitions";

const PAGE = {
  title: "Break Even ROAS Calculator (Free) | Instant Minimum ROAS",
  description:
    "Free break even ROAS calculator for ecommerce and lead gen. Enter margin and AOV for your Google Ads or Meta floor — no signup, shareable results.",
  path: "/break-even-roas-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is a break even ROAS calculator?",
    answer:
      "A break even ROAS calculator turns your margin and AOV into the minimum ROAS ads need before they lose money after product costs. This page is the free tool — enter inputs and get an instant floor.",
  },
  {
    question: "How do I use this break even ROAS calculator?",
    answer:
      "Enter average order value (or lead value), gross margin %, and optional fixed cost per order. The calculator returns contribution per conversion and break-even ROAS you can use as a Target ROAS floor.",
  },
  {
    question: "How do I calculate break-even ROAS manually?",
    answer:
      "Divide value per conversion by contribution per order. Contribution = (AOV × gross margin %) − fixed cost. With no fixed costs, break-even ROAS = 1 ÷ margin. For a full walkthrough, see How to Calculate Break-even ROAS.",
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
  {
    question: "Can I use this as a break even calculator for dropshipping?",
    answer:
      "Yes. Enter your product sell price as AOV, real landed gross margin, and shipping or payment fees as fixed cost per order. Thin dropshipping margins often need a much higher break-even ROAS than a generic 3× target.",
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
        Free break even ROAS calculator — find the minimum ROAS your ads need
        before they lose money after product costs. Enter margin and AOV (or
        lead value) for an instant floor you can use in Google Ads Target ROAS
        or Meta. No signup.
      </p>

      <QuickAnswer>
        <p>{QUICK_ANSWERS.breakEvenRoasCalculator}</p>
        <p className="formula-block">{FORMULAS.breakEvenRoasEcommerce}</p>
      </QuickAnswer>

      <BreakEvenRoasCalculator />

      <section className="content-section" aria-labelledby="roas-formula">
        <h2 id="roas-formula">Break-even ROAS formula (quick)</h2>
        <p className="formula-block">{FORMULAS.breakEvenRoasEcommerce}</p>
        <p>
          With no fixed per-order costs, this simplifies to{" "}
          <code>1 ÷ margin%</code>. A 50% margin means you need at least 2.0×
          ROAS to break even. For step-by-step examples and lead gen math, see{" "}
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

      <section className="content-section" aria-labelledby="dropshipping">
        <h2 id="dropshipping">Dropshipping break-even ROAS</h2>
        <p>
          Dropshipping margins are often thin once product cost, shipping, and
          payment fees are included. A generic “3× ROAS” target can still lose
          money. Use this break even calculator for dropshipping by entering
          your real landed margin and per-order shipping.
        </p>
        <div className="example-box">
          <ul>
            <li>Product sell price (AOV) = $25</li>
            <li>Gross margin after product cost = 20%</li>
            <li>Shipping + payment fees = $4 fixed cost per order</li>
          </ul>
          <p>
            Contribution = ($25 × 20%) − $4 = $5 − $4 = <strong>$1</strong>
          </p>
          <p>
            Break-even ROAS = $25 ÷ $1 = <strong>25×</strong>
          </p>
          <p>
            At that margin, ads must return $25 of revenue for every $1 of ad
            spend just to break even — which is why low-margin dropshipping
            rarely works on paid traffic without raising price or cutting costs.
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
            break-even ROAS by margin table
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

      <WidgetSetupSection />
      <WidgetCodeSection widget={getWidgetById("break-even-roas")!} />

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
            linkText: "max CPA calculator",
            href: "/max-cpa-calculator",
            after: " (break-even CPA).",
          },
          {
            before: "Learn how to calculate max CPC with the ",
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
