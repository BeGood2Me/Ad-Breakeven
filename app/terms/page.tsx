import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_NAME } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const PAGE = {
  title: "Terms of Use",
  description:
    "Terms of use and disclaimer for Ad Breakeven calculators. Informational tools only — not financial, tax, or legal advice.",
  path: "/terms",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function TermsPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <h1>Terms of Use</h1>
      <p className="intro">
        {SITE_NAME} provides free break-even calculators and guides for paid
        media planning. By using this site, you agree to the terms below.
      </p>

      <section className="content-section" aria-labelledby="terms-disclaimer">
        <h2 id="terms-disclaimer">Not financial advice</h2>
        <p>
          All calculators, examples, and &ldquo;what to do next&rdquo; guidance
          on this site are for <strong>informational and educational purposes
          only</strong>. They are not financial, investment, tax, accounting, or
          legal advice.
        </p>
        <p>
          Break-even targets depend on your margins, costs, conversion rates, and
          business model. Platform-reported metrics may differ from your true
          unit economics. Verify every number with your own data before changing
          ad spend, bids, or budgets.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-accuracy">
        <h2 id="terms-accuracy">No warranty</h2>
        <p>
          We aim for accurate formulas and clear explanations, but the site is
          provided <strong>&ldquo;as is&rdquo;</strong> without warranties of
          any kind. We do not guarantee that results are complete, current, or
          error-free for your specific situation.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-liability">
        <h2 id="terms-liability">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} and its operators
          are not liable for any loss or damage arising from your use of the
          site or reliance on calculator outputs — including lost ad spend,
          revenue, or profit.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-changes">
        <h2 id="terms-changes">Changes</h2>
        <p>
          We may update calculators, content, or these terms at any time.
          Continued use of the site after changes means you accept the updated
          terms.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-tools">
        <h2 id="terms-tools">Calculators</h2>
        <p>
          See also our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/faq">FAQ</Link>.
        </p>
      </section>
    </article>
  );
}
