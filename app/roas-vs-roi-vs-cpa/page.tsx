import type { Metadata } from "next";

import Link from "next/link";

import JsonLd from "@/components/JsonLd";

import { RelatedTools } from "@/components/RelatedTools";

import { buildPageMetadata } from "@/lib/page-metadata";

import { articleSchema, breadcrumbSchema } from "@/lib/schema";



const PAGE = {

  title: "ROAS vs ROI vs CPA vs CPC | Which Metric to Use for Ad Profitability",

  description:

    "Compare ROAS, ROI, CPA, and CPC — what each paid media metric measures, when to use it, and how to tie them to break-even targets and real profit.",

  path: "/roas-vs-roi-vs-cpa",

};



export const metadata: Metadata = buildPageMetadata(PAGE);



export default function RoasVsRoiVsCpaPage() {

  return (

    <article className="page-content">

      <JsonLd

        data={breadcrumbSchema([

          { name: "Home", path: "/" },

          { name: "ROAS vs ROI vs CPA", path: PAGE.path },

        ])}

      />

      <JsonLd

        data={articleSchema({

          headline: "ROAS vs ROI vs CPA vs CPC",

          description: PAGE.description,

          path: PAGE.path,

        })}

      />

      <h1>ROAS vs ROI vs CPA vs CPC</h1>

      <p className="intro">

        ROAS, ROI, CPA, and CPC are the core paid media metrics — but they

        measure different things. Using the wrong one leads to scaling campaigns

        that look good in dashboards but lose money in your P&amp;L.

      </p>



      <section className="content-section" aria-labelledby="quick-answer">

        <h2 id="quick-answer">Quick answer</h2>

        <ul>

          <li>

            <strong>ROAS</strong> — revenue per ad dollar. Best for ecommerce

            efficiency, but ignores margin.

          </li>

          <li>

            <strong>ROI</strong> — profit per ad dollar. Best for business-level

            profitability reporting.

          </li>

          <li>

            <strong>CPA</strong> — cost per conversion. Best for lead gen and

            conversion-focused campaigns.

          </li>

          <li>

            <strong>CPC</strong> — cost per click. Best for bid caps and keyword

            affordability at your conversion rate.

          </li>

        </ul>

        <p>

          Tie every metric to a break-even threshold from your margin — use the{" "}

          <Link href="/">Break-even Ads Calculator</Link> to find yours.

        </p>

      </section>



      <section className="content-section" aria-labelledby="definitions">

        <h2 id="definitions">Definitions and formulas</h2>

        <table className="comparison-table">

          <thead>

            <tr>

              <th scope="col">Metric</th>

              <th scope="col">Formula</th>

              <th scope="col">What it tells you</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>ROAS</td>

              <td>Revenue ÷ ad spend</td>

              <td>How much revenue each ad dollar generates</td>

            </tr>

            <tr>

              <td>ROI</td>

              <td>Profit ÷ ad spend</td>

              <td>Return on investment as profit relative to spend</td>

            </tr>

            <tr>

              <td>CPA</td>

              <td>Ad spend ÷ conversions</td>

              <td>Cost to acquire one conversion (sale, lead, or signup)</td>

            </tr>

            <tr>

              <td>CPC</td>

              <td>Ad spend ÷ clicks</td>

              <td>Cost per click — depends on conversion rate for profitability</td>

            </tr>

          </tbody>

        </table>

      </section>



      <section className="content-section" aria-labelledby="roas">

        <h2 id="roas">ROAS (Return on Ad Spend)</h2>

        <p>

          ROAS is revenue-focused. A 3× ROAS means $3 in revenue for every $1

          spent. It is the default metric in Google Ads and Meta Ads because

          platforms track revenue easily.

        </p>

        <p>

          <strong>When to use it:</strong> Ecommerce campaign optimization,

          comparing ad sets, and setting minimum performance floors — but only

          against your{" "}

          <Link href="/how-to-calculate-break-even-roas">break-even ROAS</Link>{" "}

          from margin, not a generic target.

        </p>

        <p>

          <strong>Limitation:</strong> ROAS ignores product costs. A 4× ROAS

          campaign with 20% margins loses money; a 2.5× ROAS campaign with 60%

          margins can be highly profitable.

        </p>

      </section>



      <section className="content-section" aria-labelledby="roi">

        <h2 id="roi">ROI (Return on Investment)</h2>

        <p>

          ROI measures profit relative to spend. If you spend $1,000 and earn

          $250 in net profit (after product costs and ad spend), ROI is 25% on

          that spend.

        </p>

        <p>

          <strong>When to use it:</strong> Business-level decisions, comparing

          paid ads to other channels, and reporting to stakeholders who think in

          profit terms.

        </p>

        <p>

          <strong>Limitation:</strong> ROI requires accurate cost data. Many

          teams lack real-time COGS, so they use ROAS as a proxy and convert

          using margin assumptions — then confirm with the{" "}

          <Link href="/ad-profit-calculator">Ad Profit Calculator</Link>.

        </p>

      </section>



      <section className="content-section" aria-labelledby="cpa">

        <h2 id="cpa">CPA (Cost Per Acquisition)</h2>

        <p>

          CPA is spend divided by conversions. If you spend $500 and get 10

          sales, CPA is $50. It directly answers: &ldquo;What does each customer

          cost me?&rdquo;

        </p>

        <p>

          <strong>When to use it:</strong> Lead gen, app installs, subscription

          trials, and any campaign optimized for conversions rather than

          revenue. Compare CPA against your{" "}

          <Link href="/max-cpa-calculator">max affordable CPA</Link> (contribution

          margin per sale). In lead gen mode, the calculator shows max cost per

          lead; divide by close rate for a CRM closed-deal cap.

        </p>

        <p>

          <strong>Limitation:</strong> CPA alone ignores sale value. A $20 CPA

          is excellent for a $200 AOV product and terrible for a $15 AOV product.

          For lead gen, compare cost per lead to the calculator cap — then check

          closed-deal cost in your CRM (cap ÷ close rate).

        </p>

      </section>



      <section className="content-section" aria-labelledby="cpc">

        <h2 id="cpc">CPC (Cost Per Click)</h2>

        <p>

          CPC is what you pay each time someone clicks your ad. Affordable CPC

          depends on how much profit you keep per conversion and how often clicks

          convert: max CPC = max CPA × conversion rate.

        </p>

        <p>

          <strong>When to use it:</strong> Manual bid caps in Google Ads, evaluating

          expensive keywords, and search campaigns where click cost varies widely.

        </p>

        <p>

          <strong>Limitation:</strong> A cheap click that never converts is

          worthless. Use the{" "}

          <Link href="/max-cpc-calculator">Max CPC Calculator</Link> with your

          margin and conversion rate.

        </p>

      </section>



      <section className="content-section" aria-labelledby="example">

        <h2 id="example">Example: same campaign, four views</h2>

        <div className="example-box">

          <p>

            Ad spend = $2,000, sales = 40, AOV = $100, margin = 50%, clicks = 800

            (5% conversion)
          </p>

          <ul>

            <li>Revenue = 40 × $100 = $4,000</li>

            <li>Contribution = 40 × $50 = $2,000</li>

            <li>Profit = $2,000 − $2,000 = $0 (break-even)</li>

          </ul>

          <ul>

            <li>

              <strong>ROAS</strong> = $4,000 ÷ $2,000 = <strong>2.0×</strong>

            </li>

            <li>

              <strong>ROI</strong> = $0 ÷ $2,000 = <strong>0%</strong>

            </li>

            <li>

              <strong>CPA</strong> = $2,000 ÷ 40 = <strong>$50</strong>

            </li>

            <li>

              <strong>CPC</strong> = $2,000 ÷ 800 = <strong>$2.50</strong> —

              equal to max CPC at 5% conversion ($50 × 5%)

            </li>

          </ul>

        </div>

      </section>



      <section className="content-section" aria-labelledby="which">

        <h2 id="which">Which metric should you use?</h2>

        <ul>

          <li>

            <strong>Ecommerce scaling:</strong> Break-even ROAS as your floor,

            then track profit with ROI or the Ad Profit Calculator.

          </li>

          <li>

            <strong>Lead gen:</strong> Expected revenue per lead = deal value ×

            close rate. Max cost per lead from margin; max closed-deal cost = cap

            ÷ close rate.

          </li>

          <li>

            <strong>Bid management:</strong> Max CPC from max CPA and conversion

            rate.

          </li>

          <li>

            <strong>Executive reporting:</strong> Net profit or ROI — not platform

            ROAS alone.

          </li>

        </ul>

      </section>



      <RelatedTools

        links={[

          {

            before: "Calculate your break-even ROAS with the ",

            linkText: "Break-even ROAS Calculator",

            href: "/break-even-roas-calculator",

            after: ".",

          },

          {

            before: "Find max CPA and max CPC on the ",

            linkText: "Break-even Ads Calculator",

            href: "/",

            after: ".",

          },

          {

            before: "See net profit in dollars with the ",

            linkText: "Ad Profit Calculator",

            href: "/ad-profit-calculator",

            after: ".",

          },

          {

            before: "Full formula walkthrough: ",

            linkText: "How to Calculate Break-even ROAS",

            href: "/how-to-calculate-break-even-roas",

            after: ".",

          },

          {

            before: "More answers in the ",

            linkText: "FAQ",

            href: "/faq",

            after: ".",

          },

        ]}

      />

    </article>

  );

}


