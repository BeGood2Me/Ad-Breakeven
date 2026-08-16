import type { Metadata } from "next";
import Link from "next/link";
import MaxCpaCalculator from "@/components/calculators/MaxCpaCalculator";
import JsonLd from "@/components/JsonLd";
import { QuickAnswer } from "@/components/QuickAnswer";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";
import {
  FORMULAS,
  MAX_CPA_DEFINITION,
  QUICK_ANSWERS,
} from "@/lib/snippet-definitions";

const PAGE = {
  title: "Max CPA Calculator (Free) | Break-Even Cost Per Acquisition",
  description:
    "Free max CPA calculator: (AOV × margin) − fixed costs. Set Target CPA for Google Ads & Meta. Ecommerce + lead gen. No signup.",
  path: "/max-cpa-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is max CPA?",
    answer: MAX_CPA_DEFINITION,
  },
  {
    question: "How do you calculate max CPA?",
    answer:
      "Max CPA = (value × gross margin %) − fixed cost per conversion. For ecommerce, value is AOV. For lead gen, value is customer value × close rate.",
  },
  {
    question: "What is max CPA vs target CPA?",
    answer:
      "Max CPA is your break-even ceiling. Target CPA in Google Ads or Meta should usually sit at or below max CPA so you leave room for profit and variance.",
  },
  {
    question: "What is a good max CPA for ecommerce?",
    answer:
      "There is no universal good max CPA — it equals your contribution per order. A $90 AOV at 50% margin with $6 fixed costs has a $39 max CPA. Use your own margin and costs.",
  },
  {
    question: "How does max CPA relate to break-even ROAS?",
    answer:
      "They are the same economics in different units. Max CPA is contribution per conversion in dollars. Break-even ROAS is AOV ÷ contribution. Raising max CPA lowers break-even ROAS.",
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

      <QuickAnswer>
        <p>{QUICK_ANSWERS.maxCpaCalculator}</p>
        <p className="formula-block">{FORMULAS.maxCpa}</p>
      </QuickAnswer>

      <MaxCpaCalculator />

      <section className="content-section" aria-labelledby="what-is-max-cpa">
        <h2 id="what-is-max-cpa">What is max CPA?</h2>
        <p>
          {MAX_CPA_DEFINITION} Spend above max CPA and every sale or lead loses
          money, even when platform ROAS looks fine.
        </p>
        <p>
          Read the full explainer in{" "}
          <Link href="/blog/max-cpa-explained-for-ecommerce">
            Max CPA Explained for Ecommerce
          </Link>{" "}
          or the{" "}
          <Link href="/max-cpa-guide">How to Set Target CPA</Link> guide.
        </p>
      </section>

      <section className="content-section" aria-labelledby="cpa-formula">
        <h2 id="cpa-formula">Max CPA formula</h2>
        <p className="formula-block">
          Max CPA = (value × margin%) − fixed cost
        </p>
        <p>
          Ecommerce: value is AOV and fixed cost is per order — this is your max
          CPA per purchase. Lead gen: use customer value × close rate as value
          and fixed cost per lead — the result is max cost per lead.
        </p>
      </section>

      <section className="content-section" aria-labelledby="max-vs-target">
        <h2 id="max-vs-target">Max CPA vs target CPA</h2>
        <ul>
          <li>
            <strong>Max CPA</strong> — break-even ceiling from your margin and
            costs. Do not bid above it.
          </li>
          <li>
            <strong>Target CPA</strong> — the bid goal you enter in Google Ads or
            Meta. Set it at or below max CPA if you want profit, not just
            break-even.
          </li>
        </ul>
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
            against it.
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
              Break Even ROAS Calculator
            </Link>{" "}
            or{" "}
            <Link href="/target-roas-calculator">Target ROAS Calculator</Link>{" "}
            to set a floor plus buffer. Also see{" "}
            <Link href="/how-to-calculate-break-even-roas">
              how to calculate break-even ROAS
            </Link>
            .
          </li>
          <li>
            <strong>Max CPC</strong> — turn max CPA into a click bid with the{" "}
            <Link href="/max-cpc-calculator">Max CPC Calculator</Link>.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="max-cpa-bids">
        <h2 id="max-cpa-bids">How to use max CPA in Google Ads and Meta</h2>
        <p>
          After you calculate max CPA, set Target CPA at or below that ceiling so
          average cost per conversion stays profitable. Pair with the{" "}
          <Link href="/blog/max-cpa-explained-for-ecommerce">
            max CPA ecommerce guide
          </Link>{" "}
          and compare units in{" "}
          <Link href="/roas-vs-roi-vs-cpa">ROAS vs ROI vs CPA</Link>. For keyword
          bids, convert max CPA to{" "}
          <Link href="/max-cpc-calculator">max CPC</Link> using your conversion
          rate.
        </p>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">People also ask about max CPA</h2>
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
            linkText: "Break Even ROAS Calculator",
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
            before: "Compare metrics in ",
            linkText: "ROAS vs ROI vs CPA",
            href: "/roas-vs-roi-vs-cpa",
            after: ".",
          },
          {
            before: "More answers on the ",
            linkText: "Ad Breakeven FAQ",
            href: "/faq",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
