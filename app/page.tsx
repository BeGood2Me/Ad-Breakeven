import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenAdsCalculator from "@/components/calculators/BreakEvenAdsCalculator";
import { QuickAnswer } from "@/components/QuickAnswer";
import { ToolsSection } from "@/components/ToolsSection";
import { PILLAR_INDEX } from "@/generated/content-manifest";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { QUICK_ANSWERS } from "@/lib/snippet-definitions";

const HOME_GUIDES = [
  { href: "/how-to-calculate-break-even-roas", label: "ROAS formula" },
  { href: "/max-cpa-calculator", label: "Max CPA" },
  { href: "/max-cpc-calculator", label: "Max CPC" },
  { href: "/what-is-a-good-roas", label: "Good ROAS?" },
] as const;

const HOME_BLOG_LABELS: Record<string, string> = {
  "ad-profitability": "Ad profit",
  "cpa-acquisition": "CPA",
  "cpc-bidding": "CPC",
  "roas-break-even": "ROAS",
};

const PAGE = {
  title: "Break-even Ads Calculator (Free) | ROAS + CPA + CPC Hub",
  description:
    "Free hub calculator for break-even ad planning: ROAS, max CPA, and max CPC from your margin. For a ROAS-only floor, use the Break Even ROAS Calculator. No signup.",
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
          One hub for ROAS, CPA, and CPC floors from your margin — free, no
          signup. Need only break-even ROAS? Use the{" "}
          <Link href="/break-even-roas-calculator">
            Break Even ROAS Calculator
          </Link>
          .
        </p>
      </header>

      <QuickAnswer>
        <p>{QUICK_ANSWERS.home}</p>
      </QuickAnswer>

      <BreakEvenAdsCalculator />

      <ToolsSection />

      <section className="content-section home-guides" aria-labelledby="guides-heading">
        <div className="home-guides-header">
          <h2 id="guides-heading">Guides</h2>
          <Link href="/guides" className="home-guides-all">
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

      <section className="content-section home-guides" aria-labelledby="blog-heading">
        <div className="home-guides-header">
          <h2 id="blog-heading">Blog</h2>
          <Link href="/blog" className="home-guides-all">
            All blog posts
          </Link>
        </div>
        <ul className="home-guides-grid">
          {PILLAR_INDEX.map(({ slug, path }) => (
            <li key={slug}>
              <Link href={path} className="home-guide-card">
                {HOME_BLOG_LABELS[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
