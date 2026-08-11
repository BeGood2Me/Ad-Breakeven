import type { Metadata } from "next";
import Link from "next/link";
import BreakEvenRoasCalculator from "@/components/calculators/BreakEvenRoasCalculator";
import JsonLd from "@/components/JsonLd";
import { RelatedTools } from "@/components/RelatedTools";
import { buildPageMetadata, CalculatorJsonLd } from "@/lib/page-metadata";
import { faqSchema } from "@/lib/schema";

const PAGE = {
  title: "Target ROAS Calculator (Free) | From Margin to tROAS",
  description:
    "Free target ROAS calculator from your gross margin and AOV. Turn break-even ROAS into a Google Ads / Meta Target ROAS (tROAS) with a profit buffer. No signup.",
  path: "/target-roas-calculator",
};

const PAGE_FAQ = [
  {
    question: "What is a target ROAS calculator?",
    answer:
      "A target ROAS calculator turns your margin and AOV into the minimum ROAS you need to break even, then helps you set Target ROAS (tROAS) above that floor for profit.",
  },
  {
    question: "How do I calculate target ROAS from margin?",
    answer:
      "First find break-even ROAS = AOV ÷ contribution per order. Contribution = (AOV × margin %) − fixed costs. Set Target ROAS 10–25% above break-even so campaigns stay profitable under variance.",
  },
  {
    question: "Is target ROAS the same as break-even ROAS?",
    answer:
      "No. Break-even ROAS is the floor where profit after product costs is zero. Target ROAS is the bid goal you enter in the ad platform — usually above break-even so you keep margin.",
  },
  {
    question: "What target ROAS should I use in Google Ads?",
    answer:
      "Start from your margin-based break-even, then add a buffer (often 10–25%). Example: 2.0× break-even → try 2.2×–2.5× tROAS. Revisit after learning periods and margin changes.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function TargetRoasCalculatorPage() {
  return (
    <article className="page-content">
      <CalculatorJsonLd
        title="Target ROAS Calculator"
        description={PAGE.description}
        path={PAGE.path}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Target ROAS Calculator</h1>
      <p className="intro">
        Calculate Target ROAS (tROAS) from your margin — not a generic 3× or 4×
        guess. Enter AOV and gross margin to get your break-even floor, then set
        Target ROAS above it for profit. Free, no signup.
      </p>

      <BreakEvenRoasCalculator />

      <section className="content-section" aria-labelledby="from-margin">
        <h2 id="from-margin">Target ROAS from margin</h2>
        <p>
          Platform Target ROAS bidding optimizes to a revenue multiple. Your
          profitable target must start from contribution margin:
        </p>
        <ol>
          <li>
            <strong>Break-even ROAS</strong> — use the calculator above (same
            math as the{" "}
            <Link href="/break-even-roas-calculator">
              Break Even ROAS Calculator
            </Link>
            ).
          </li>
          <li>
            <strong>Target ROAS</strong> — set tROAS above break-even so
            average performance leaves room for fees, returns, and bid variance.
          </li>
          <li>
            <strong>Buffer rule of thumb</strong> — multiply break-even by 1.10
            to 1.25 (10–25% above floor). Higher buffers mean fewer impressions
            but safer profit.
          </li>
        </ol>
        <p className="formula-block">
          Target ROAS ≈ break-even ROAS × (1 + profit buffer)
        </p>
        <div className="example-box">
          <p>
            Example: 50% margin, no fixed costs → break-even ={" "}
            <strong>2.0×</strong>. With a 20% buffer, Target ROAS ≈{" "}
            <strong>2.4×</strong>. At 25% margin, break-even is 4.0× — a 3×
            target would still lose money.
          </p>
        </div>
      </section>

      <section className="content-section" aria-labelledby="where-to-set">
        <h2 id="where-to-set">Where to use Target ROAS</h2>
        <ul>
          <li>
            <strong>Google Ads</strong> — Maximize conversion value with a
            target ROAS on Search, Shopping, or Performance Max. See{" "}
            <Link href="/google-ads-break-even">
              Google Ads break-even ROAS
            </Link>{" "}
            for campaign settings.
          </li>
          <li>
            <strong>Meta Ads</strong> — Value optimization / ROAS goals against
            the same margin floor.
          </li>
          <li>
            <strong>CPA bidding instead?</strong> Convert the same contribution
            into dollars with the{" "}
            <Link href="/max-cpa-calculator">Max CPA Calculator</Link>, or
            compare units in{" "}
            <Link href="/roas-vs-roi-vs-cpa">ROAS vs ROI vs CPA</Link>.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">People also ask about target ROAS</h2>
        <ul className="faq-list">
          {PAGE_FAQ.map((item) => (
            <li key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      <RelatedTools
        links={[
          {
            before: "Need only the floor? Use the ",
            linkText: "Break Even ROAS Calculator",
            href: "/break-even-roas-calculator",
            after: ".",
          },
          {
            before: "See margin tables in ",
            linkText: "Break-even ROAS by Margin",
            href: "/break-even-roas-by-margin",
            after: ".",
          },
          {
            before: "Set Google Ads tROAS step-by-step: ",
            linkText: "Google Ads Break-even ROAS",
            href: "/google-ads-break-even",
            after: ".",
          },
          {
            before: "Turn contribution into a CPA cap with the ",
            linkText: "Max CPA Calculator",
            href: "/max-cpa-calculator",
            after: ".",
          },
        ]}
      />
    </article>
  );
}
