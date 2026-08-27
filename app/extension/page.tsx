import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CHROME_EXTENSION_URL, SITE_NAME } from "@/lib/site";

const PAGE = {
  title: "Chrome Extension | Ad Breakeven Calculator Popup",
  description:
    "Install the free Ad Breakeven Chrome extension. Popup calculator for break-even ROAS, max CPA, and max CPC from your margin — no account required.",
  path: "/extension",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function ExtensionPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Chrome Extension", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "Ad Breakeven Chrome Extension",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />

      <h1>Ad Breakeven Chrome Extension</h1>
      <p className="intro">
        A popup calculator for paid-media floors. Enter average order value and
        gross margin to see break-even ROAS, max CPA, and max CPC while you plan
        bids in Google Ads or Meta.
      </p>

      <p>
        <a
          href={CHROME_EXTENSION_URL}
          className="home-widgets-cta"
          rel="noopener noreferrer"
          target="_blank"
        >
          Install from Chrome Web Store
        </a>
      </p>

      <section className="content-section" aria-labelledby="what-you-get">
        <h2 id="what-you-get">What you get</h2>
        <ul>
          <li>
            <strong>Break-even ROAS</strong> — minimum revenue multiple before
            ads lose money after product costs
          </li>
          <li>
            <strong>Max CPA</strong> — highest cost per acquisition you can afford
          </li>
          <li>
            <strong>Max CPC</strong> — highest cost per click at your conversion
            rate
          </li>
        </ul>
        <p>
          Numbers stay on your device (Chrome local storage). No account, no
          tracking. Same formulas as {SITE_NAME}.
        </p>
      </section>

      <section className="content-section" aria-labelledby="how-to-use">
        <h2 id="how-to-use">How to use</h2>
        <ol>
          <li>Click the Ad Breakeven icon in your Chrome toolbar.</li>
          <li>Enter AOV and gross margin (%).</li>
          <li>Add conversion rate if you need a max CPC.</li>
          <li>Copy the floors into your campaign settings.</li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="full-site">
        <h2 id="full-site">Need more?</h2>
        <p>
          Open the full calculators on {SITE_NAME} for lead gen mode, shareable
          links, and worked examples — start with the{" "}
          <Link href="/">Break-even Ads Calculator</Link> or browse{" "}
          <Link href="/widgets">Free Widgets</Link> for your site.
        </p>
        <p>
          <Link href="/privacy">Privacy Policy</Link>
        </p>
      </section>
    </article>
  );
}
