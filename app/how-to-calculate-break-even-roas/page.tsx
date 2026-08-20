import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { QuickAnswer } from "@/components/QuickAnswer";
import { RelatedTools } from "@/components/RelatedTools";
import {
  BREAK_EVEN_ROAS_BY_MARGIN,
  formatRoasMultiple,
} from "@/lib/good-roas-benchmarks";
import { buildPageMetadata } from "@/lib/page-metadata";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import {
  BREAK_EVEN_ROAS_DEFINITION,
  CONTRIBUTION_MARGIN_DEFINITION,
  FORMULAS,
  QUICK_ANSWERS,
} from "@/lib/snippet-definitions";

const PAGE = {
  title: "How to Calculate Break-even ROAS | Formula & Examples",
  description:
    "Learn the break-even ROAS formula from contribution margin. Ecommerce and lead gen examples, margin table, and worked steps — then use the free calculator.",
  path: "/how-to-calculate-break-even-roas",
};

const PAGE_FAQ = [
  {
    question: "What is break-even ROAS?",
    answer: BREAK_EVEN_ROAS_DEFINITION,
  },
  {
    question: "What is breakeven ROAS meaning?",
    answer:
      "Breakeven ROAS (same as break-even ROAS) means zero profit after COGS and per-order fees. Platform revenue ROAS is not the same number — it ignores margin.",
  },
  {
    question: "How do you calculate break-even ROAS?",
    answer:
      "Divide AOV by contribution per order. Contribution = (AOV × gross margin %) − fixed cost per order. With no fixed costs, break-even ROAS equals 1 ÷ margin. For instant results, use the Break Even ROAS Calculator.",
  },
  {
    question: "Where can I calculate break-even ROAS online?",
    answer:
      "Use the free Break Even ROAS Calculator on Ad Breakeven. This guide explains the formula; the calculator page is the tool for instant results from your margin and AOV.",
  },
  {
    question: "What is contribution margin for ecommerce ads?",
    answer: CONTRIBUTION_MARGIN_DEFINITION,
  },
  {
    question: "What is contribution margin break-even ROAS?",
    answer:
      "Contribution margin break-even ROAS is AOV ÷ contribution per order. Contribution = (AOV × gross margin %) − fixed cost. That is the minimum ROAS after product costs — use the Break Even ROAS Calculator for an instant number.",
  },
  {
    question: "Does conversion rate affect break-even ROAS?",
    answer:
      "No. Break-even ROAS depends on margin and value per conversion. Conversion rate affects max CPC and how much traffic you can afford at a given bid.",
  },
  {
    question: "What is break-even ROAS at 50% margin?",
    answer:
      "At 50% gross margin with no fixed costs, break-even ROAS is 2.0×. Fixed costs per order raise that number above 2.0×.",
  },
  {
    question: "Is platform ROAS the same as break-even ROAS?",
    answer:
      "No. Google Ads and Meta report revenue ROAS (revenue ÷ ad spend). Break-even ROAS accounts for contribution margin after COGS and fees.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function HowToCalculateRoasPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How to Calculate Break-even ROAS", path: PAGE.path },
        ])}
      />
      <JsonLd data={howToSchema()} />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>How to Calculate Break-even ROAS</h1>
      <p className="intro">
        {BREAK_EVEN_ROAS_DEFINITION} Platform dashboards show revenue ROAS, not
        profit ROAS, so you need a margin-based threshold before scaling Google
        Ads or Meta. This guide walks through the formula and examples.
      </p>

      <div className="example-box">
        <p>
          <strong>Want the number now?</strong> Use the free{" "}
          <Link href="/break-even-roas-calculator">
            Break Even ROAS Calculator
          </Link>{" "}
          — enter margin and AOV for an instant floor. Come back here for the
          step-by-step math.
        </p>
      </div>

      <QuickAnswer>
        <p>{QUICK_ANSWERS.howToCalculate}</p>
        <p className="formula-block">{FORMULAS.breakEvenRoasEcommerce}</p>
      </QuickAnswer>

      <section className="content-section" aria-labelledby="what-is-roas">
        <h2 id="what-is-roas">What is break-even ROAS? (breakeven ROAS meaning)</h2>
        <p>
          {BREAK_EVEN_ROAS_DEFINITION} Below that threshold, you spend more on
          ads than you earn back in profit after COGS.
        </p>
        <p>
          A campaign reporting 3× ROAS can still lose money if your margin is
          thin. Always compare platform ROAS to <strong>your</strong>{" "}
          break-even figure — not an industry benchmark.
        </p>
      </section>

      <section
        className="content-section"
        aria-labelledby="contribution-margin"
      >
        <h2 id="contribution-margin">
          Contribution margin break-even ROAS
        </h2>
        <p>
          Break-even ROAS always starts from{" "}
          <strong>contribution margin</strong> — what you keep after product
          costs and per-order fees, before ads. For ecommerce:
        </p>
        <p className="formula-block">
          Contribution = (AOV × gross margin %) − fixed cost per order
        </p>
        <p>
          That contribution is also your{" "}
          <Link href="/max-cpa-calculator">max CPA</Link>. Contribution margin
          break-even ROAS is how much revenue you need per dollar of ad spend so
          that contribution covers the spend:
        </p>
        <p className="formula-block">
          Break-even ROAS = AOV ÷ contribution per order
        </p>
        <p>
          Example source chain: $100 AOV, 40% margin, $0 fixed → contribution
          $40 → break-even ROAS = $100 ÷ $40 = <strong>2.5×</strong>. Raise
          shipping or payment fees and contribution falls, so break-even ROAS
          rises.
        </p>
      </section>

      <section className="content-section" aria-labelledby="formula">
        <h2 id="formula">The break-even ROAS formula</h2>
        <p className="formula-block">
          Break-even ROAS = AOV ÷ [(AOV × gross margin %) − fixed cost per order]
        </p>
        <p>Where:</p>
        <ul>
          <li>
            <strong>AOV</strong> — average order value (revenue per sale). For
            lead gen, use customer value × close rate as expected revenue per
            lead (not per closed deal).
          </li>
          <li>
            <strong>Gross margin %</strong> — profit per sale as a share of AOV,
            before ad spend
          </li>
          <li>
            <strong>Fixed cost per order</strong> — shipping subsidies, payment
            fees, fulfillment, or other per-sale costs (optional). In lead gen
            mode, enter fixed cost per lead.
          </li>
        </ul>
        <p>
          With no fixed costs, this simplifies to{" "}
          <strong>1 ÷ gross margin</strong>. Full reference:{" "}
          <Link href="/break-even-roas-by-margin">
            break-even ROAS by margin table
          </Link>
          .
        </p>
        <p>
          Prefer not to calculate by hand? Open the{" "}
          <Link href="/break-even-roas-calculator">
            Break Even ROAS Calculator
          </Link>{" "}
          and enter the same inputs.
        </p>
      </section>

      <section className="content-section" aria-labelledby="margin-table">
        <h2 id="margin-table">Quick break-even ROAS by margin (ecommerce)</h2>
        <p>
          Common margins with no fixed costs per order. Use your row as a
          sanity check, then add shipping and fees in the calculator.
        </p>
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
      </section>

      <section className="content-section" aria-labelledby="example">
        <h2 id="example">Worked example (ecommerce)</h2>
        <div className="example-box">
          <p>An ecommerce brand with:</p>
          <ul>
            <li>AOV = $90</li>
            <li>Gross margin = 45%</li>
            <li>Fixed cost per order = $6 (shipping + payment fees)</li>
          </ul>
          <p>Step 1: Calculate contribution margin per order</p>
          <p className="formula-block">
            ($90 × 45%) − $6 = $40.50 − $6 = $34.50
          </p>
          <p>Step 2: Calculate break-even ROAS</p>
          <p className="formula-block">$90 ÷ $34.50 = 2.61×</p>
          <p>
            The brand needs at least <strong>2.61× ROAS</strong> to break even.
            A platform showing 2.2× ROAS means the campaign is unprofitable after
            contribution margin.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="leadgen">
        <h2 id="leadgen">Break-even ROAS for lead gen</h2>
        <p>
          Lead gen campaigns rarely report revenue ROAS in the ad platform.
          Start with the value of a closed deal, your close rate, and your
          margin:
        </p>
        <p className="formula-block">
          Effective value = customer value × close rate
        </p>
        <p>
          Then apply the same contribution-margin formula. Example: $5,000
          customer value, 15% close rate, 45% margin, $25 fixed cost per lead.
        </p>
        <ul>
          <li>Expected revenue per lead = $5,000 × 15% = $750</li>
          <li>Contribution per lead = ($750 × 45%) − $25 = $312.50</li>
          <li>
            Break-even ROAS = $750 ÷ $312.50 = <strong>2.4×</strong>
          </li>
          <li>
            Max cost per lead = <strong>$312.50</strong>
          </li>
          <li>
            Max cost per closed deal (CRM) = $312.50 ÷ 15% ={" "}
            <strong>$2,083.33</strong>
          </li>
        </ul>
        <p>
          Compare ad platform <em>cost per lead</em> to $312.50. Use the{" "}
          <Link href="/">Break-even Ads Calculator</Link> in lead gen mode to
          model this automatically.
        </p>
      </section>

      <section className="content-section" aria-labelledby="after-calc">
        <h2 id="after-calc">What to do after you calculate break-even ROAS</h2>
        <ol>
          <li>
            <strong>Compare</strong> — Check platform-reported ROAS against your
            break-even figure every week.
          </li>
          <li>
            <strong>Set a floor</strong> — Treat break-even ROAS as the minimum
            efficiency bar when evaluating campaigns. See{" "}
            <Link href="/google-ads-break-even">
              Google Ads break-even ROAS
            </Link>{" "}
            for Target ROAS settings.
          </li>
          <li>
            <strong>Translate to CPA and CPC</strong> — Use your contribution
            per order as{" "}
            <Link href="/max-cpa-calculator">max CPA</Link>, then calculate{" "}
            <Link href="/max-cpc-calculator">max CPC</Link> from your conversion
            rate.
          </li>
          <li>
            <strong>Measure profit in dollars</strong> — Plug real spend and
            sales into the{" "}
            <Link href="/ad-profit-calculator">Ad Profit Calculator</Link>.
          </li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="factors">
        <h2 id="factors">What affects break-even ROAS</h2>
        <ul>
          <li>
            <strong>Higher margin</strong> lowers break-even ROAS. At 50% margin
            with no fixed costs, break-even is only 2.0×. See the{" "}
            <Link href="/break-even-roas-by-margin">full margin table</Link>.
          </li>
          <li>
            <strong>Higher fixed costs</strong> raise break-even ROAS because
            each sale contributes less profit.
          </li>
          <li>
            <strong>Conversion rate</strong> does not change break-even ROAS
            directly, but it affects max CPC and how much traffic you can
            afford.
          </li>
          <li>
            <strong>AOV and deal value</strong> — raising average order value or
            customer LTV lowers the ROAS you need at the same margin.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">People also ask about break-even ROAS</h2>
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
            before: "Calculate your floor now with the ",
            linkText: "Break Even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: " — the primary tool for instant results.",
          },
          {
            before: "Convert contribution to a purchase cap with the ",
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
            before: "Compare ROAS to ROI and CPA in ",
            linkText: "ROAS vs ROI vs CPA",
            href: "/roas-vs-roi-vs-cpa",
            after: ".",
          },
          {
            before: "Read ",
            linkText: "Break-even ROAS Explained",
            href: "/blog/break-even-roas-explained",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
