import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  BREAK_EVEN_ROAS_TABLE,
  FIXED_COST_EXAMPLE,
  breakEvenRoasCalculatorHref,
  breakEvenRoasWithFixedCosts,
  formatRoasMultiple,
  isProfitableAtRoas,
} from "@/lib/good-roas-benchmarks";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE = {
  title: "Break-even ROAS by Margin (Table) | Free Reference",
  description:
    "Break-even ROAS for 10%–80% gross margin. Full table, formula, and worked examples. See how shipping and fees raise your floor. Free calculator.",
  path: "/break-even-roas-by-margin",
};

const PAGE_FAQ = [
  {
    question: "What is break-even ROAS?",
    answer:
      "Break-even ROAS is the minimum return on ad spend where profit after product costs equals zero — your campaign stops losing money on margin, but earns nothing yet.",
  },
  {
    question: "What is break-even ROAS at 50% margin?",
    answer:
      "At 50% gross margin with no fixed costs per order, break-even ROAS is 2.0×. Fixed costs like shipping raise that number.",
  },
  {
    question: "Is 3× ROAS good?",
    answer:
      "Only if your break-even ROAS is at or below 3×. At 25% margin, break-even is 4× — so 3× still loses money. At 50% margin, 3× is profitable.",
  },
  {
    question: "Does conversion rate affect break-even ROAS?",
    answer:
      "No. Break-even ROAS depends on margin and value per conversion (AOV or expected revenue per lead), not landing-page conversion rate.",
  },
  {
    question: "Does Google Ads ROAS include COGS?",
    answer:
      "No. Platform ROAS is revenue divided by ad spend. Break-even ROAS must account for gross margin and per-order costs.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function BreakEvenRoasByMarginPage() {
  const fixedCostRows = FIXED_COST_EXAMPLE.fixedCosts.map((fixedCost) => ({
    fixedCost,
    breakEvenRoas: breakEvenRoasWithFixedCosts(
      FIXED_COST_EXAMPLE.aov,
      FIXED_COST_EXAMPLE.margin,
      fixedCost
    ),
  }));

  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Break-even ROAS by margin", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "Break-even ROAS by margin",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Break-even ROAS by margin</h1>
      <p className="intro">
        Break-even ROAS is the minimum return on ad spend where contribution
        margin equals ad spend — not the revenue number your ad platform shows by
        default. Use this table as a quick reference, then{" "}
        <Link href="/break-even-roas-calculator">calculate your exact floor</Link>{" "}
        with AOV and fixed costs.
      </p>

      <section className="content-section" aria-labelledby="quick-answer">
        <h2 id="quick-answer">Quick answer</h2>
        <p className="formula-block">
          Break-even ROAS = 1 ÷ gross margin (when there are no fixed costs per
          order)
        </p>
        <ul>
          <li>50% margin → {formatRoasMultiple(2)} break-even</li>
          <li>40% margin → {formatRoasMultiple(2.5)} break-even</li>
          <li>25% margin → {formatRoasMultiple(4)} break-even</li>
        </ul>
        <p>
          <Link href={breakEvenRoasCalculatorHref(50)}>
            Calculate at 50% margin →
          </Link>
        </p>
      </section>

      <section className="content-section" aria-labelledby="margin-table">
        <h2 id="margin-table">Break-even ROAS table by gross margin</h2>
        <p>
          Assumes no fixed costs per order. Shipping, payment fees, and returns
          raise your real break-even ROAS above these figures — see the fixed-cost
          example below.
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Gross margin</th>
                <th scope="col">Break-even ROAS</th>
                <th scope="col">Profitable at 3×?</th>
                <th scope="col">Calculator</th>
              </tr>
            </thead>
            <tbody>
              {BREAK_EVEN_ROAS_TABLE.map(({ margin, breakEvenRoas }) => (
                <tr key={margin}>
                  <td>{margin}%</td>
                  <td>{formatRoasMultiple(breakEvenRoas)}</td>
                  <td>
                    {isProfitableAtRoas(breakEvenRoas, 3) ? "Yes" : "No"}
                  </td>
                  <td>
                    <Link href={breakEvenRoasCalculatorHref(margin)}>
                      Calculate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section" aria-labelledby="read-table">
        <h2 id="read-table">What this table means</h2>
        <ul>
          <li>
            <strong>Break-even</strong> means zero profit after product costs —
            not after ad spend efficiency alone.
          </li>
          <li>
            <strong>Higher margin</strong> lowers break-even ROAS. At 60% margin,
            break-even is about 1.67×; at 25%, it is 4×.
          </li>
          <li>
            <strong>Platform ROAS</strong> uses revenue. This table uses{" "}
            <strong>contribution margin</strong> — profit per sale before ads.
          </li>
          <li>
            <strong>Good ROAS</strong> is anything above your row — not a generic
            3× or 4× target. See{" "}
            <Link href="/what-is-a-good-roas">What Is a Good ROAS?</Link> for
            benchmarks with context.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="formula">
        <h2 id="formula">Break-even ROAS formula</h2>
        <p className="formula-block">
          Break-even ROAS = AOV ÷ [(AOV × gross margin %) − fixed cost per order]
        </p>
        <p>
          With no fixed costs, this simplifies to 1 ÷ margin. Example: $90 AOV,
          50% margin, $6 fixed → contribution $39 → break-even ROAS{" "}
          {formatRoasMultiple(
            breakEvenRoasWithFixedCosts(90, 50, 6) ?? 0
          )}{" "}
          (not 2.0×). Full walkthrough in{" "}
          <Link href="/how-to-calculate-break-even-roas">
            How to Calculate Break-even ROAS
          </Link>
          .
        </p>
      </section>

      <section className="content-section" aria-labelledby="fixed-costs">
        <h2 id="fixed-costs">How fixed costs change break-even ROAS</h2>
        <p>
          Same economics at ${FIXED_COST_EXAMPLE.aov} AOV and{" "}
          {FIXED_COST_EXAMPLE.margin}% margin — only fixed cost per order changes:
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Fixed cost per order</th>
                <th scope="col">Break-even ROAS</th>
              </tr>
            </thead>
            <tbody>
              {fixedCostRows.map(({ fixedCost, breakEvenRoas }) => (
                <tr key={fixedCost}>
                  <td>${fixedCost}</td>
                  <td>
                    {breakEvenRoas !== null
                      ? formatRoasMultiple(breakEvenRoas)
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="content-section" aria-labelledby="leadgen">
        <h2 id="leadgen">Lead gen: same formula, different value</h2>
        <p>
          Use expected revenue per lead (customer value × close rate) as AOV.
          Conversion rate on the landing page does not change break-even ROAS —
          only margin and value per conversion matter. Model lead gen in the{" "}
          <Link href="/break-even-roas-calculator">Break-even ROAS Calculator</Link>{" "}
          or <Link href="/">Break-even Ads Calculator</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="google-ads">
        <h2 id="google-ads">Setting Target ROAS from the table</h2>
        <ol>
          <li>Find your gross margin row in the table above.</li>
          <li>
            Add a buffer above break-even (often 20–30%) for profit and variance.
          </li>
          <li>
            Set Google Ads Target ROAS from that floor — see{" "}
            <Link href="/google-ads-break-even">Google Ads break-even ROAS</Link>{" "}
            and{" "}
            <Link href="/blog/google-ads-target-roas-settings">
              how to set tROAS from margin
            </Link>
            .
          </li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">Frequently asked questions</h2>
        <ul className="faq-list">
          {PAGE_FAQ.map((item) => (
            <li key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section" aria-labelledby="cite">
        <h2 id="cite">Reference this table</h2>
        <p>
          Break-even ROAS by margin table — {SITE_NAME} ({SITE_URL}
          {PAGE.path})
        </p>
      </section>

      <RelatedTools
        links={[
          {
            before: "Run your numbers in the ",
            linkText: "Break-even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: ".",
          },
          {
            before: "See ROAS, CPA, and CPC together on the ",
            linkText: "Break-even Ads Calculator",
            href: "/",
            after: ".",
          },
          {
            before: "Compare ROAS to ROI and CPA in ",
            linkText: "ROAS vs ROI vs CPA",
            href: "/roas-vs-roi-vs-cpa",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
