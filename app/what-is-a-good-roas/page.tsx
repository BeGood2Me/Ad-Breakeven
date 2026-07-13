import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata } from "@/lib/page-metadata";
import { BREAK_EVEN_ROAS_BY_MARGIN } from "@/lib/good-roas-benchmarks";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

const PAGE = {
  title: "What Is a Good ROAS? | Break-even Benchmarks by Margin",
  description:
    "A good ROAS depends on your margin — not generic 3× or 4× targets. See break-even ROAS benchmarks by margin and calculate your own floor with our free calculator.",
  path: "/what-is-a-good-roas",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function WhatIsAGoodRoasPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "What Is a Good ROAS?", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "What Is a Good ROAS?",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <h1>What Is a Good ROAS?</h1>
      <p className="intro">
        There is no universal &ldquo;good ROAS&rdquo; — only a ROAS that is
        profitable for <em>your</em> margin. A 3× ROAS sounds strong until you
        realize 50% margin businesses break even around 2×, and 25% margin
        businesses need 4× just to stop losing money.
      </p>

      <section className="content-section" aria-labelledby="good-roas-definition">
        <h2 id="good-roas-definition">Good ROAS vs break-even ROAS</h2>
        <p>
          <strong>Break-even ROAS</strong> is the minimum return on ad spend
          where contribution margin equals ad spend.{" "}
          <strong>Good ROAS</strong> is anything above that floor — the higher
          your margin, the lower your break-even ROAS, and the easier it is to be
          &ldquo;good&rdquo; on paper.
        </p>
        <p className="formula-block">
          Break-even ROAS = 1 ÷ gross margin (when there are no fixed costs per order)
        </p>
      </section>

      <section className="content-section" aria-labelledby="margin-table">
        <h2 id="margin-table">Break-even ROAS by margin</h2>
        <p>
          Use this table as a quick sanity check. Fixed costs per order (shipping,
          payment fees) raise your real break-even ROAS above these figures.
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Gross margin</th>
                <th scope="col">Break-even ROAS</th>
                <th scope="col">Example: good ROAS target</th>
              </tr>
            </thead>
            <tbody>
              {BREAK_EVEN_ROAS_BY_MARGIN.map(({ margin, breakEvenRoas }) => (
                <tr key={margin}>
                  <td>{margin}%</td>
                  <td>{breakEvenRoas.toFixed(2)}×</td>
                  <td>{(breakEvenRoas * 1.25).toFixed(2)}×+ (25% above break-even)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section" aria-labelledby="bad-benchmarks">
        <h2 id="bad-benchmarks">Why generic ROAS targets fail</h2>
        <ul>
          <li>
            <strong>&ldquo;3× ROAS is good&rdquo;</strong> — only true if your
            margin is ~33% or higher with no fixed costs.
          </li>
          <li>
            <strong>&ldquo;4× ROAS minimum&rdquo;</strong> — appropriate around
            25% margin, but wasteful if you have 60% margin (break-even ~1.67×).
          </li>
          <li>
            <strong>Platform ROAS alone</strong> — ignores COGS, shipping, and
            fees; revenue ROAS is not profit ROAS.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="calculate-yours">
        <h2 id="calculate-yours">Calculate your own threshold</h2>
        <p>
          Enter your AOV, margin, and optional fixed costs in the{" "}
          <Link href="/break-even-roas-calculator">Break-even ROAS Calculator</Link>{" "}
          or use the{" "}
          <Link href="/">Break-even Ads Calculator</Link> for ROAS, CPA, and CPC
          together.
        </p>
      </section>

      <RelatedTools
        links={[
          {
            before: "See the full formula walkthrough in ",
            linkText: "How to Calculate Break-even ROAS",
            href: "/how-to-calculate-break-even-roas",
            after: ".",
          },
          {
            before: "Compare ROAS to ROI, CPA, and CPC in ",
            linkText: "ROAS vs ROI vs CPA",
            href: "/roas-vs-roi-vs-cpa",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
