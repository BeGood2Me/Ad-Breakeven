import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata } from "@/lib/page-metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

const PAGE = {
  title: "How to Set Target CPA | Max CPA Guide for Ecommerce & Lead Gen",
  description:
    "Learn how to set a target CPA from margin and AOV. Ecommerce max CPA per purchase vs lead gen cost-per-lead caps — with worked examples and a free calculator.",
  path: "/max-cpa-guide",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function MaxCpaGuidePage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How to Set Target CPA", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "How to Set Target CPA",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <h1>How to Set Target CPA</h1>
      <p className="intro">
        Your target CPA (cost per acquisition) should never exceed what you keep
        per conversion after product or fulfillment costs. That ceiling is your{" "}
        <strong>max CPA</strong> — the highest you can pay and still break even on
        ad spend.
      </p>

      <section className="content-section" aria-labelledby="cpa-formula">
        <h2 id="cpa-formula">The formula</h2>
        <p className="formula-block">
          Max CPA = (value × gross margin %) − fixed cost per conversion
        </p>
        <p>
          Ecommerce: value is AOV per purchase. Lead gen: use customer value ×
          close rate as expected revenue per lead, and fixed cost per lead.
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
          <p>Contribution = ($90 × 50%) − $6 = <strong>$39</strong></p>
          <p>
            <strong>Target CPA:</strong> $39 — enter this as your target cost per
            purchase in Google Ads or benchmark Meta cost per purchase against it.
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
          <p>Expected revenue per lead = $5,000 × 15% = <strong>$750</strong></p>
          <p>Contribution per lead = $750 × 60% = <strong>$450</strong></p>
          <p>
            <strong>Target cost per lead:</strong> $450 in your ad platform.
          </p>
          <p>
            <strong>CRM closed-deal cap:</strong> $450 ÷ 15% = <strong>$3,000</strong>{" "}
            max cost per closed deal.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="set-in-platform">
        <h2 id="set-in-platform">Where to set target CPA</h2>
        <ul>
          <li>
            <strong>Google Ads:</strong> Target CPA bidding or manual CPA caps in
            campaign settings — compare actual cost per conversion to your max.
          </li>
          <li>
            <strong>Meta Ads:</strong> Cost per result (purchase or lead) vs your
            calculated cap; use as a reporting benchmark even on ROAS campaigns.
          </li>
          <li>
            <strong>Lead gen CRM:</strong> Track cost per lead in ads and cost per
            closed deal in CRM separately — they use different denominators.
          </li>
        </ul>
      </section>

      <RelatedTools
        links={[
          {
            before: "Calculate your max CPA instantly with the ",
            linkText: "Max CPA Calculator",
            href: "/max-cpa-calculator",
            after: ".",
          },
          {
            before: "Translate max CPA into max CPC with the ",
            linkText: "Max CPC Calculator",
            href: "/max-cpc-calculator",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
