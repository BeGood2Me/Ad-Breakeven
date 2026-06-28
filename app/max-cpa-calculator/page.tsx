import type { Metadata } from "next";
import MaxCpaCalculator from "@/components/calculators/MaxCpaCalculator";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";

const PAGE = {
  title: "Max CPA Calculator | Find Your Break-even Cost Per Acquisition",
  description:
    "Find the highest CPA (ecommerce) or cost per lead (lead gen) you can afford before ads lose money. Uses margin, AOV or deal value, and close rate.",
  path: "/max-cpa-calculator",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function MaxCpaPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Max CPA Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <h1>Max CPA Calculator</h1>
      <p className="intro">
        CPA (cost per acquisition) is what you pay for each conversion. For
        ecommerce, max CPA is your cap per purchase. For lead gen (toggle above),
        the result is max cost per lead — divide by close rate for a CRM
        closed-deal cap. Spend above your cap and every acquisition loses money.
      </p>

      <MaxCpaCalculator />

      <section className="content-section" aria-labelledby="cpa-formula">
        <h2 id="cpa-formula">The formula</h2>
        <p className="formula-block">
          Max acquisition cost = (value × margin%) − fixed cost
        </p>
        <p>
          Ecommerce: value is AOV and fixed cost is per order — this is your max
          CPA per purchase. Lead gen: use customer value × close rate as value and
          fixed cost per lead — the result is max cost per lead. That same
          contribution is the profit you keep before ad spend.
        </p>
      </section>

      <RelatedTools
        links={[
          {
            before:
              "Your max CPA depends on your margins and conversion rate. Use the ",
            linkText: "Break-even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: " to find the ROAS threshold first.",
          },
          {
            before:
              "If you want to translate max CPA into a maximum CPC at your current conversion rate, use the ",
            linkText: "Max CPC Calculator",
            href: "/max-cpc-calculator",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
