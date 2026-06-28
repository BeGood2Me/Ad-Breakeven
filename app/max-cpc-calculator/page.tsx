import type { Metadata } from "next";
import MaxCpcCalculator from "@/components/calculators/MaxCpcCalculator";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";

const PAGE = {
  title: "Max CPC Calculator | Find the Highest Click Cost You Can Afford",
  description:
    "Calculate break-even CPC from margin, max CPA, and conversion rate. Free bid-planning tool for Google Ads, Meta Ads, ecommerce, and lead gen campaigns.",
  path: "/max-cpc-calculator",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function MaxCpcPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Max CPC Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <h1>Max CPC Calculator</h1>
      <p className="intro">
        CPC (cost per click) is what you pay each time someone clicks your ad.
        Your break-even CPC depends on how much profit you keep per conversion
        (max CPA for ecommerce, max cost per lead for lead gen) and how often
        clicks convert. Bid above break-even CPC and you will lose money even
        with good traffic.
      </p>

      <MaxCpcCalculator />

      <section className="content-section" aria-labelledby="cpc-formula">
        <h2 id="cpc-formula">The formula</h2>
        <p className="formula-block">
          Max CPC = max acquisition cost × conversion rate
        </p>
        <p>
          Ecommerce: max acquisition cost is max CPA per purchase. Lead gen: it
          is max cost per lead from the calculator. Conversion rate is expressed
          as a decimal (e.g., 2% = 0.02).
        </p>
      </section>

      <RelatedTools
        links={[
          {
            before:
              "If you're not sure about your CPA yet, calculate it first with the ",
            linkText: "Max CPA Calculator",
            href: "/max-cpa-calculator",
            after: ".",
          },
          {
            before: "See all metrics together on the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
