import type { Metadata } from "next";
import AdProfitCalculator from "@/components/calculators/AdProfitCalculator";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";

const PAGE = {
  title: "Ad Profit Calculator | Calculate ROAS, Profit and Break-even",
  description:
    "See net ad profit after spend and product costs. Compare actual ROAS to your break-even threshold — ecommerce and lead gen. Free with tailored next steps.",
  path: "/ad-profit-calculator",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function AdProfitPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Ad Profit Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <h1>Ad Profit Calculator</h1>
      <p className="intro">
        Revenue and ROAS alone do not tell you if ads are profitable. This
        calculator subtracts product costs and ad spend to show your actual net
        profit — and whether you are above or below break-even.
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
