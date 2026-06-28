import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { FAQ_ITEMS, faqJsonLd } from "@/lib/faq";
import { buildPageMetadata } from "@/lib/page-metadata";
import { FAQ_PAGE_TITLE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const PAGE = {
  title: `${FAQ_PAGE_TITLE} | Break-even ROAS, CPA, CPC & Ad Profit`,
  description:
    "Answers about break-even ROAS, max CPA, max CPC, ad profit, lead gen, and how to tell if paid campaigns are actually profitable. Free calculators included.",
  path: "/faq",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function FaqPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <h1>{FAQ_PAGE_TITLE}</h1>
      <p className="intro">
        Answers about break-even ROAS, max CPA, max CPC, ad profit, and lead gen
        campaigns. Each answer links to the relevant calculator or guide when
        helpful.
      </p>

      <section aria-label="Frequently asked questions">
        <ul className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <li key={item.question} className="faq-item">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section" aria-labelledby="more-help">
        <h2 id="more-help">More resources</h2>
        <ul>
          <li>
            <Link href="/">Break-even Ads Calculator</Link> — ROAS, CPA, CPC, and
            sales in one place
          </li>
          <li>
            <Link href="/how-to-calculate-break-even-roas">
              How to Calculate Break-even ROAS
            </Link>{" "}
            — formula and worked examples
          </li>
          <li>
            <Link href="/roas-vs-roi-vs-cpa">ROAS vs ROI vs CPA vs CPC</Link> —
            when to use each metric
          </li>
          <li>
            <Link href="/ad-profit-calculator">Ad Profit Calculator</Link> — net
            profit after ad spend
          </li>
          <li>
            <Link href="/terms">Terms of Use</Link> — informational use only
          </li>
        </ul>
      </section>
    </article>
  );
}
