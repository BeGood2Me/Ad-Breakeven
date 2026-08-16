import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

const PAGE = {
  title: "Ad Breakeven Chrome Extension | Break-even ROAS in a Popup",
  description:
    "Free Chrome extension: break-even ROAS, max CPA, and max CPC from your margin. Local storage only — no account. Same formulas as Ad Breakeven.",
  path: "/chrome-extension",
};

const PAGE_FAQ = [
  {
    question: "What does the Ad Breakeven Chrome extension do?",
    answer:
      "It is a popup calculator. Enter AOV and gross margin to get break-even ROAS and max CPA. Add conversion rate for max CPC. Inputs stay on your device.",
  },
  {
    question: "Does the extension track me?",
    answer:
      "No. It uses Chrome local storage only. There is no account, no analytics in the extension, and no access to the pages you browse.",
  },
  {
    question: "Is it the same math as the website?",
    answer:
      "Yes. Contribution = (AOV × margin %) − fixed cost per order. Break-even ROAS = AOV ÷ contribution. Max CPC = max CPA × conversion rate.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function ChromeExtensionPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Chrome extension", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "Ad Breakeven Chrome extension",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Ad Breakeven Chrome extension</h1>
      <p className="intro">
        A popup calculator for break-even ROAS, max CPA, and max CPC — so you
        can set bid floors without leaving Google Ads or your sheet. Free, no
        account. Inputs stay on your device.
      </p>

      <section className="content-section" aria-labelledby="what-it-does">
        <h2 id="what-it-does">What it calculates</h2>
        <ul>
          <li>
            <strong>Break-even ROAS</strong> from AOV, gross margin, and optional
            per-order costs
          </li>
          <li>
            <strong>Max CPA</strong> — contribution per order, your purchase
            ceiling
          </li>
          <li>
            <strong>Max CPC</strong> when you add conversion rate
          </li>
        </ul>
        <p>
          Need lead-gen mode, share links, or full walkthroughs? Use the{" "}
          <Link href="/break-even-roas-calculator">
            Break Even ROAS Calculator
          </Link>
          ,{" "}
          <Link href="/max-cpa-calculator">Max CPA Calculator</Link>, and{" "}
          <Link href="/max-cpc-calculator">Max CPC Calculator</Link> on the
          site.
        </p>
      </section>

      <section className="content-section" aria-labelledby="install">
        <h2 id="install">Install</h2>
        <p>
          Chrome Web Store listing coming next. Until then you can load it
          unpacked from the project&apos;s <code>extension/</code> folder:
        </p>
        <ol>
          <li>
            Open <code>chrome://extensions</code>
          </li>
          <li>Turn on Developer mode</li>
          <li>
            Click <strong>Load unpacked</strong> and select the{" "}
            <code>extension</code> folder
          </li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="privacy">
        <h2 id="privacy">Privacy</h2>
        <p>
          The extension does not read the pages you visit. It only uses the
          Chrome <code>storage</code> permission to remember AOV, margin, and
          related inputs on this device. See the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">People also ask</h2>
        <ul className="faq-list">
          {PAGE_FAQ.map((item) => (
            <li key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
