import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenAdsCalculator from "@/components/calculators/BreakEvenAdsCalculator";
import { ToolsSection } from "@/components/ToolsSection";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";

const LEARN_MORE_LINKS = [
  {
    href: "/what-is-a-good-roas",
    label: "What Is a Good ROAS?",
    description: "break-even benchmarks by margin",
  },
  {
    href: "/how-to-calculate-break-even-roas",
    label: "How to Calculate Break-even ROAS",
    description: "formula, example, and tips",
  },
  {
    href: "/max-cpa-guide",
    label: "How to Set Target CPA",
    description: "ecommerce and lead gen worked examples",
  },
  {
    href: "/google-ads-break-even",
    label: "Google Ads Break-even ROAS",
    description: "tROAS settings from your margin",
  },
  {
    href: "/roas-vs-roi-vs-cpa",
    label: "ROAS vs ROI vs CPA",
    description: "when to use each metric (plus CPC)",
  },
  {
    href: "/faq",
    label: "FAQ",
    description: "common questions about ROAS, CPA, and ad profit",
  },
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
    <article className="page-content">
      <CalculatorJsonLd
        title="Break-even Ads Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <h1>Break-even Ads Calculator</h1>
      <p className="intro">
        Before you scale paid ads, you need to know the numbers where spend
        stops being a loss. This calculator shows your break-even ROAS, max CPA,
        max CPC, and how many sales you need — all from your margin, AOV, and
        conversion rate.
      </p>

      <BreakEvenAdsCalculator />

      <ToolsSection />

      <section className="content-section" aria-labelledby="guides-heading">
        <h2 id="guides-heading">Learn more</h2>
        <ul>
          {LEARN_MORE_LINKS.map(({ href, label, description }) => (
            <li key={href}>
              <Link href={href}>{label}</Link> — {description}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
