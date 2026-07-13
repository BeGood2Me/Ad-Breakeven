import type { Metadata } from "next";
import BreakEvenRoasCalculator from "@/components/calculators/BreakEvenRoasCalculator";
import EmbedCodeSection from "@/components/EmbedCodeSection";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";

const PAGE = {
  title: "Break-even ROAS Calculator | Calculate Your Minimum Profitable ROAS",
  description:
    "Calculate the minimum ROAS your ads need to break even after margin and fixed costs. Free tool for ecommerce and lead gen with formula, instant results, and next steps.",
  path: "/break-even-roas-calculator",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function BreakEvenRoasPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Break-even ROAS Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <h1>Break-even ROAS Calculator</h1>
      <p className="intro">
        ROAS (return on ad spend) tells you how much revenue you earn for every
        dollar spent on ads. Break-even ROAS is the minimum ROAS where ad spend
        equals your profit contribution — below that number, campaigns lose money
        after product costs.
      </p>

      <BreakEvenRoasCalculator />

      <section className="content-section" aria-labelledby="roas-formula">
        <h2 id="roas-formula">The formula</h2>
        <p className="formula-block">
          Break-even ROAS = AOV ÷ (AOV × margin% − fixed cost per order)
        </p>
        <p>
          With no fixed per-order costs, this simplifies to{" "}
          <code>1 ÷ margin%</code>. A 50% margin means you need at least 2.0×
          ROAS to break even.
        </p>
      </section>

      <EmbedCodeSection
        embedPath="/embed/break-even-roas"
        title="Break-even ROAS Calculator"
      />

      <RelatedTools
        links={[
          {
            before: "Use the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after:
              " to see the full picture across ROAS, CPA, CPC and sales.",
          },
          {
            before:
              "If you want to turn break-even ROAS into a maximum affordable CPA, try the ",
            linkText: "Max CPA Calculator",
            href: "/max-cpa-calculator",
            after: ".",
          },
          {
            before: "Learn the formula in ",
            linkText: "How to Calculate Break-even ROAS",
            href: "/how-to-calculate-break-even-roas",
            after: ".",
          },
          {
            before: "See margin-based benchmarks in ",
            linkText: "What Is a Good ROAS?",
            href: "/what-is-a-good-roas",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
