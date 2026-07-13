import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata } from "@/lib/page-metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

const PAGE = {
  title: "Google Ads Break-even ROAS | Set tROAS From Your Margin",
  description:
    "Find your Google Ads break-even ROAS from margin and AOV, then set target ROAS (tROAS) bidding. Works for Search, Shopping, and Performance Max campaigns.",
  path: "/google-ads-break-even",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function GoogleAdsBreakEvenPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Google Ads Break-even ROAS", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "Google Ads Break-even ROAS",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <h1>Google Ads Break-even ROAS</h1>
      <p className="intro">
        Google Ads reports conversion value ROAS — not profit ROAS. Before you
        set <strong>target ROAS (tROAS)</strong> bidding on Search, Shopping, or
        Performance Max, calculate the minimum ROAS where your margin covers ad
        spend.
      </p>

      <section className="content-section" aria-labelledby="find-margin">
        <h2 id="find-margin">Step 1: Get your margin inputs</h2>
        <ul>
          <li>
            <strong>AOV</strong> — average order value from Google Ads or Shopify
            (conversion value ÷ conversions).
          </li>
          <li>
            <strong>Gross margin %</strong> — revenue minus COGS, as a share of
            AOV. Use Shopify profit reports or your P&amp;L, not ad platform data.
          </li>
          <li>
            <strong>Fixed cost per order</strong> — shipping subsidies, payment
            fees, packaging (optional but recommended).
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="calculate-floor">
        <h2 id="calculate-floor">Step 2: Calculate break-even ROAS</h2>
        <p className="formula-block">
          Break-even ROAS = AOV ÷ [(AOV × margin%) − fixed cost per order]
        </p>
        <div className="example-box">
          <p>
            Example: $90 AOV, 50% margin, $6 fixed costs → contribution $39 →
            break-even ROAS = <strong>2.31×</strong>
          </p>
        </div>
        <p>
          Use the{" "}
          <Link href="/break-even-roas-calculator">Break-even ROAS Calculator</Link>{" "}
          for instant results.
        </p>
      </section>

      <section className="content-section" aria-labelledby="set-troas">
        <h2 id="set-troas">Step 3: Set target ROAS in Google Ads</h2>
        <ol>
          <li>
            Open campaign → <strong>Settings</strong> → <strong>Bidding</strong>.
          </li>
          <li>
            Choose <strong>Maximize conversion value</strong> with a{" "}
            <strong>target ROAS</strong>, or portfolio tROAS if you manage
            multiple campaigns.
          </li>
          <li>
            Enter your break-even ROAS as the <em>floor</em>. For profit, set
            tROAS 10–25% above break-even (e.g. 2.31× floor → try 2.6×–2.9×).
          </li>
          <li>
            Allow 1–2 weeks of learning before judging performance — especially
            on Performance Max.
          </li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="shopify-note">
        <h2 id="shopify-note">Shopify + Google Ads</h2>
        <p>
          Shopify merchants often use Google Ads conversion value with default
          purchase events. Confirm your pixel sends <em>profit-aware</em> value
          or adjust tROAS upward if conversion value is gross revenue. Pair
          break-even ROAS with{" "}
          <Link href="/max-cpa-calculator">max CPA</Link> and{" "}
          <Link href="/max-cpc-calculator">max CPC</Link> when testing new
          keywords or Shopping feeds.
        </p>
      </section>

      <RelatedTools
        links={[
          {
            before: "New to the formula? Read ",
            linkText: "How to Calculate Break-even ROAS",
            href: "/how-to-calculate-break-even-roas",
            after: ".",
          },
          {
            before: "Wondering if 3× is enough? See ",
            linkText: "What Is a Good ROAS?",
            href: "/what-is-a-good-roas",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
