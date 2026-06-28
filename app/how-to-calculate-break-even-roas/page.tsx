import type { Metadata } from "next";

import Link from "next/link";

import JsonLd from "@/components/JsonLd";

import { RelatedTools } from "@/components/RelatedTools";

import { buildPageMetadata } from "@/lib/page-metadata";

import { breadcrumbSchema, howToSchema } from "@/lib/schema";



const PAGE = {

  title: "How to Calculate Break-even ROAS | Formula, Example & Free Calculator",

  description:

    "Learn the break-even ROAS formula with a step-by-step example. See how margin, AOV, and fixed costs set your minimum profitable ROAS for ecommerce and lead gen ads.",

  path: "/how-to-calculate-break-even-roas",

};



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

      <h1>How to Calculate Break-even ROAS</h1>

      <p className="intro">

        Break-even ROAS is the return on ad spend where your campaign stops

        losing money after product costs. Platform dashboards show revenue ROAS —

        not profit ROAS — so you need your own margin-based threshold before

        scaling Google Ads, Meta Ads, or other paid channels.

      </p>



      <section className="content-section" aria-labelledby="what-is-roas">

        <h2 id="what-is-roas">What is break-even ROAS?</h2>

        <p>

          ROAS measures revenue generated per dollar of ad spend. Break-even

          ROAS is the minimum ROAS where total contribution margin from ad-driven

          sales equals your ad spend. Below that threshold, you spend more on ads

          than you earn back in profit.

        </p>

        <p>

          A campaign reporting 3× ROAS can still lose money if your margin is

          thin. Always compare platform ROAS to{" "}

          <strong>your</strong> break-even figure — not an industry benchmark.

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

          The denominator is your <strong>contribution per sale or lead</strong> —

          profit before ad costs. For ecommerce that is your max CPA; in lead gen

          mode it is your max cost per lead.

        </p>

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

          <p>Step 1: Calculate contribution per order</p>

          <p className="formula-block">

            ($90 × 45%) − $6 = $40.50 − $6 = $34.50

          </p>

          <p>Step 2: Calculate break-even ROAS</p>

          <p className="formula-block">$90 ÷ $34.50 = 2.61×</p>

          <p>

            The brand needs at least <strong>2.61× ROAS</strong> to break even.

            A platform showing 2.2× ROAS means the campaign is unprofitable.

          </p>

        </div>

      </section>



      <section className="content-section" aria-labelledby="leadgen">

        <h2 id="leadgen">Break-even ROAS for lead gen</h2>

        <p>

          Lead gen campaigns rarely report revenue ROAS in the ad platform. Start

          with the value of a closed deal, your close rate, and your margin:

        </p>

        <p className="formula-block">

          Effective value = customer value × close rate

        </p>

        <p>

          Then apply the same formula. Example: $5,000 customer value, 15% close rate,

          45% margin, $25 fixed cost per lead.

        </p>

        <ul>

          <li>Expected revenue per lead = $5,000 × 15% = $750</li>

          <li>Contribution per lead = ($750 × 45%) − $25 = $312.50</li>

          <li>Break-even ROAS = $750 ÷ $312.50 = <strong>2.4×</strong></li>

          <li>Max cost per lead = <strong>$312.50</strong></li>

          <li>Max cost per closed deal (CRM) = $312.50 ÷ 15% = <strong>$2,083.33</strong></li>

        </ul>

        <p>

          Compare ad platform <em>cost per lead</em> to $312.50. For CRM reporting

          on closed deals, stay at or below $2,083.33 per closed deal. Use the{" "}

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

            efficiency bar when evaluating campaigns.

          </li>

          <li>

            <strong>Translate to CPA and CPC</strong> — Use your contribution per

            order as max CPA, then calculate{" "}

            <Link href="/max-cpc-calculator">max CPC</Link> from your conversion

            rate.

          </li>

          <li>

            <strong>Measure profit in dollars</strong> — Plug real spend and sales

            into the <Link href="/ad-profit-calculator">Ad Profit Calculator</Link>.

          </li>

        </ol>

      </section>



      <section className="content-section" aria-labelledby="factors">

        <h2 id="factors">What affects break-even ROAS</h2>

        <ul>

          <li>

            <strong>Higher margin</strong> lowers break-even ROAS. At 50% margin

            with no fixed costs, break-even is only 2.0×.

          </li>

          <li>

            <strong>Higher fixed costs</strong> raise break-even ROAS because

            each sale contributes less profit.

          </li>

          <li>

            <strong>Conversion rate</strong> does not change break-even ROAS

            directly, but it affects max CPC and how much traffic you can afford.

          </li>

          <li>

            <strong>AOV and deal value</strong> — raising average order value or

            customer LTV lowers the ROAS you need at the same margin.

          </li>

        </ul>

      </section>



      <section className="content-section" aria-labelledby="tips">

        <h2 id="tips">Practical tips</h2>

        <ul>

          <li>

            Calculate break-even ROAS before setting campaign targets — do not

            copy generic benchmarks like 3× or 4×.

          </li>

          <li>

            Recalculate when margins, AOV, fulfillment costs, or close rate

            changes.

          </li>

          <li>

            Compare break-even ROAS to actual ROAS weekly during active scaling.

          </li>

          <li>

            For lead gen, model customer value and close rate — not lead volume

            alone.

          </li>

        </ul>

      </section>



      <RelatedTools

        links={[

          {

            before: "Skip the manual math with the ",

            linkText: "Break-even ROAS Calculator",

            href: "/break-even-roas-calculator",

            after: " — instant results from your inputs.",

          },

          {

            before: "See ROAS, CPA, CPC, and break-even sales on the ",

            linkText: "Break-even Ads Calculator",

            href: "/",

            after: ".",

          },

          {

            before: "Compare ROAS to ROI and CPA in ",

            linkText: "ROAS vs ROI vs CPA",

            href: "/roas-vs-roi-vs-cpa",

            after: ".",

          },

          {

            before: "Common questions answered in the ",

            linkText: "FAQ",

            href: "/faq",

            after: ".",

          },

        ]}

      />

    </article>

  );

}


