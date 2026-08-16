import type { Metadata } from "next";
import Link from "next/link";
import MaxCpcCalculator from "@/components/calculators/MaxCpcCalculator";
import JsonLd from "@/components/JsonLd";
import { QuickAnswer } from "@/components/QuickAnswer";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";
import {
  FORMULAS,
  MAX_CPC_DEFINITION,
  QUICK_ANSWERS,
} from "@/lib/snippet-definitions";

const PAGE = {
  title: "Max CPC Calculator (Free) | Break-Even Bid From Your CPA",
  description:
    "Free max CPC calculator from max CPA and conversion rate. Set Google Ads & Meta bid ceilings that still break even. No signup.",
  path: "/max-cpc-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is max CPC?",
    answer: MAX_CPC_DEFINITION,
  },
  {
    question: "How do you calculate max CPC?",
    answer: `${FORMULAS.maxCpc}. Example: $40 max CPA at 2% conversion rate → $0.80 max CPC.`,
  },
  {
    question: "What is the max CPC formula?",
    answer:
      "Max CPC = max acquisition cost × conversion rate (as a decimal). Ecommerce uses max CPA per purchase; lead gen uses max cost per lead.",
  },
  {
    question: "Does conversion rate change max CPC?",
    answer:
      "Yes. Higher conversion rates raise max CPC because more clicks turn into conversions. Max CPA stays the same; only the click-level bid ceiling changes.",
  },
  {
    question: "Max CPC vs max CPA — what’s the difference?",
    answer:
      "Max CPA is your cost ceiling per conversion. Max CPC is that ceiling divided across clicks using conversion rate — the bid you can afford before the click converts.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function MaxCpcPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Max CPC Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Max CPC Calculator</h1>
      <p className="intro">
        Calculate the highest cost per click you can afford before ads lose
        money. Max CPC comes from your{" "}
        <Link href="/max-cpa-calculator">max CPA</Link> and conversion rate —
        free, no signup.
      </p>

      <QuickAnswer>
        <p>{QUICK_ANSWERS.maxCpcCalculator}</p>
        <p className="formula-block">{FORMULAS.maxCpc}</p>
      </QuickAnswer>

      <MaxCpcCalculator />

      <section className="content-section" aria-labelledby="what-is-max-cpc">
        <h2 id="what-is-max-cpc">What is max CPC?</h2>
        <p>
          {MAX_CPC_DEFINITION} Bid above it and you lose money even with
          “good” traffic.
        </p>
        <p>
          Step-by-step bidding guide:{" "}
          <Link href="/blog/max-cpc-bidding-guide">Max CPC Bidding Guide</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="cpc-formula">
        <h2 id="cpc-formula">Max CPC formula</h2>
        <p className="formula-block">{FORMULAS.maxCpc}</p>
        <p>
          Ecommerce: max acquisition cost is{" "}
          <Link href="/max-cpa-calculator">max CPA</Link> per purchase. Lead
          gen: it is max cost per lead. Conversion rate is a decimal (2% =
          0.02).
        </p>
      </section>

      <section className="content-section" aria-labelledby="how-to-calc">
        <h2 id="how-to-calc">How to calculate max CPC</h2>
        <ol>
          <li>
            Find{" "}
            <Link href="/max-cpa-calculator">max CPA</Link> from margin and AOV
            (or lead value × close rate).
          </li>
          <li>Measure landing-page conversion rate for the campaign.</li>
          <li>Multiply: max CPC = max CPA × conversion rate.</li>
          <li>
            Cap manual bids near that number, or use it as a sanity check under
            Smart Bidding.
          </li>
        </ol>
        <div className="example-box">
          <p>
            Example: max CPA <strong>$50</strong>, conversion rate{" "}
            <strong>2%</strong> → max CPC = $50 × 0.02 = <strong>$1.00</strong>.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="max-cpc-vs-cpa">
        <h2 id="max-cpc-vs-cpa">Max CPC vs max CPA</h2>
        <ul>
          <li>
            <strong>Max CPA</strong> — dollars you can spend per conversion.
            Start with the{" "}
            <Link href="/max-cpa-calculator">Max CPA Calculator</Link>.
          </li>
          <li>
            <strong>Max CPC</strong> — dollars you can spend per click at your
            current conversion rate.
          </li>
          <li>
            Compare both to ROAS in{" "}
            <Link href="/roas-vs-roi-vs-cpa">ROAS vs ROI vs CPA</Link> —
            especially if you are weighing CPC ROAS vs CPA bidding.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="max-cpc-bids">
        <h2 id="max-cpc-bids">How to use max CPC for bidding</h2>
        <p>
          Use max CPC as a manual bid ceiling or as a sanity check against
          automated bids. If live CPC sits above max CPC for long, either
          conversion rate must rise, AOV/margin must improve, or that keyword
          should pause. Full walkthrough:{" "}
          <Link href="/blog/max-cpc-bidding-guide">max CPC bidding guide</Link>.
          For Target ROAS instead of CPC caps, use the{" "}
          <Link href="/target-roas-calculator">Target ROAS Calculator</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">People also ask about max CPC</h2>
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
            before: "Calculate your acquisition ceiling first with the ",
            linkText: "Max CPA Calculator",
            href: "/max-cpa-calculator",
            after: ".",
          },
          {
            before: "See ROAS, CPA, and CPC together on the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after: ".",
          },
          {
            before: "Find your ROAS floor with the ",
            linkText: "Break Even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: ".",
          },
          {
            before: "Read ",
            linkText: "Max CPC Bidding Guide",
            href: "/blog/max-cpc-bidding-guide",
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
