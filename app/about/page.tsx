import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE = {
  title: "About Ad Breakeven | Free Break-even Calculators for Paid Ads",
  description:
    "Ad Breakeven is a free toolkit for break-even ROAS, CPA, CPC, and ad profit planning. Built for ecommerce and lead gen marketers — no signup required.",
  path: "/about",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function AboutPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: `About ${SITE_NAME}`,
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <h1>About {SITE_NAME}</h1>
      <p className="intro">
        {SITE_NAME} helps marketers and store owners find the numbers where paid
        ad spend stops being a loss — break-even ROAS, max CPA, max CPC, and ad
        profit — from margin and conversion economics, not generic benchmarks.
      </p>

      <section className="content-section" aria-labelledby="why-exists">
        <h2 id="why-exists">Why it exists</h2>
        <p>
          Platform dashboards show revenue ROAS. They do not subtract COGS,
          shipping, or fulfillment. Campaigns that look profitable on 3× ROAS can
          lose money at 45% margin. Lead gen adds another layer: cost per lead vs
          cost per closed deal are often confused.
        </p>
        <p>
          We built {SITE_NAME} so you can answer &ldquo;what ROAS or CPA can I
          afford?&rdquo; in seconds — with separate modes for ecommerce (AOV) and
          lead gen (deal value × close rate).
        </p>
      </section>

      <section className="content-section" aria-labelledby="what-included">
        <h2 id="what-included">What&apos;s included</h2>
        <ul>
          <li>
            <Link href="/">Break-even Ads Calculator</Link> — hub for ROAS, CPA,
            CPC, and volume
          </li>
          <li>
            Dedicated calculators for{" "}
            <Link href="/break-even-roas-calculator">ROAS</Link>,{" "}
            <Link href="/max-cpa-calculator">max CPA</Link>,{" "}
            <Link href="/max-cpc-calculator">max CPC</Link>, and{" "}
            <Link href="/ad-profit-calculator">ad profit</Link>
          </li>
          <li>
            Guides on{" "}
            <Link href="/how-to-calculate-break-even-roas">break-even ROAS</Link>,{" "}
            <Link href="/what-is-a-good-roas">good ROAS benchmarks</Link>, and{" "}
            <Link href="/google-ads-break-even">Google Ads tROAS</Link>
          </li>
          <li>Shareable URLs and tailored next steps after each calculation</li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="methodology">
        <h2 id="methodology">Methodology</h2>
        <p>
          All calculators use contribution margin: (value × gross margin %) minus
          fixed cost per conversion. Lead gen uses customer value × close rate as
          expected revenue per lead. Formulas match standard unit economics used in
          PPC planning — see the{" "}
          <Link href="/faq">FAQ</Link> for details.
        </p>
      </section>

      <section className="content-section" aria-labelledby="disclaimer">
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          {SITE_NAME} is for informational and educational purposes only — not
          financial, tax, or legal advice. Verify all results with your own data
          before changing ad spend or budgets. See our{" "}
          <Link href="/terms">Terms of Use</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          Site: <Link href={SITE_URL}>{SITE_URL}</Link>
        </p>
      </section>
    </article>
  );
}
