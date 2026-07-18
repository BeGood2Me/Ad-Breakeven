import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenAdsCalculator from "@/components/calculators/BreakEvenAdsCalculator";
import { ToolsSection } from "@/components/ToolsSection";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";

const HOME_GUIDES = [
  { href: "/what-is-a-good-roas", label: "Good ROAS?" },
  { href: "/how-to-calculate-break-even-roas", label: "ROAS formula" },
  { href: "/max-cpa-guide", label: "Target CPA" },
  { href: "/faq", label: "FAQ" },
] as const;

const PAGE = {
  title: "Break-even Ads Calculator | Find Your Minimum ROAS, CPA & CPC",
  description:
    "Find break-even ROAS, max CPA, max CPC, and sales volume from your margin and conversion rate. Free hub calculator for ecommerce and lead gen with shareable results.",
  path: "/",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function HomePage() {
  return (
    <article className="page-content home-page">
      <CalculatorJsonLd
        title="Break-even Ads Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <header className="home-hero">
        <h1>Break-even Ads Calculator</h1>
        <p className="intro intro--short">
          Your margin-based floor for ROAS, CPA, and CPC — free, no signup.
        </p>
      </header>

      <BreakEvenAdsCalculator />

      <ToolsSection />

      <section className="content-section home-guides" aria-labelledby="guides-heading">
        <div className="home-guides-header">
          <h2 id="guides-heading">Guides</h2>
          <Link href="/blog" className="home-guides-all">
            All guides
          </Link>
        </div>
        <ul className="home-guides-grid">
          {HOME_GUIDES.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="home-guide-card">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
