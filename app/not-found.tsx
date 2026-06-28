import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <article className="page-content">
      <h1>Page not found</h1>
      <p className="intro">
        That URL doesn&apos;t exist. Head back to the break-even calculator or
        pick a tool below.
      </p>

      <section className="content-section" aria-labelledby="not-found-home">
        <h2 id="not-found-home">Start here</h2>
        <p>
          <Link href="/">Break-even Ads Calculator</Link> — ROAS, CPA, CPC, and
          sales targets from your margin and conversion rate.
        </p>
      </section>

      <section className="content-section" aria-labelledby="not-found-tools">
        <h2 id="not-found-tools">Calculators</h2>
        <ul>
          {TOOL_LINKS.map(({ href, title }) => (
            <li key={href}>
              <Link href={href}>{title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section" aria-labelledby="not-found-guides">
        <h2 id="not-found-guides">Guides</h2>
        <ul>
          <li>
            <Link href="/how-to-calculate-break-even-roas">
              How to Calculate Break-even ROAS
            </Link>
          </li>
          <li>
            <Link href="/roas-vs-roi-vs-cpa">ROAS vs ROI vs CPA vs CPC</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
