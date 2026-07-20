import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/page-metadata";
import { FAQ_PAGE_TITLE, GUIDE_DESCRIPTIONS, GUIDE_NAV_LINKS } from "@/lib/site";

const PAGE = {
  title: "Ad Breakeven Guides | ROAS, CPA & Paid Media Profitability",
  description:
    "Step-by-step guides on break-even ROAS, target CPA, Google Ads settings, and ROAS vs ROI — with free calculators and worked examples.",
  path: "/guides",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

const GUIDES_INDEX = [
  ...GUIDE_NAV_LINKS.map(({ href, label }) => ({ href, label })),
  { href: "/faq", label: FAQ_PAGE_TITLE },
] as const;

export default function GuidesIndexPage() {
  return (
    <article className="page-content">
      <h1>Guides</h1>
      <p className="intro">
        Step-by-step guides for break-even ROAS, acquisition caps, and paid
        media profitability — with free calculators and worked examples.
      </p>

      <section className="content-section" aria-labelledby="guides-list-heading">
        <h2 id="guides-list-heading" className="visually-hidden">
          All guides
        </h2>
        <ul className="blog-index-list">
          {GUIDES_INDEX.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
              {GUIDE_DESCRIPTIONS[href] && (
                <p className="blog-index-excerpt">{GUIDE_DESCRIPTIONS[href]}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
