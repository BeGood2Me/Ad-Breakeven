import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TermsOfUseContent from "@/components/legal/TermsOfUseContent";
import { buildPageMetadata } from "@/lib/page-metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";

const PAGE = {
  title: "Terms of Use",
  description:
    "Terms of use for Ad Breakeven calculators and guides. Informational tools only — not financial, tax, or legal advice.",
  path: "/terms",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function TermsPage() {
  return (
    <article className="page-content legal-document">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: PAGE.path },
        ])}
      />
      <h1>Terms of Use</h1>
      <p className="intro">
        {SITE_NAME} provides free break-even calculators and guides for paid
        media planning. These Terms are governed by Irish law. By using this
        site, you agree to the terms below.
      </p>
      <TermsOfUseContent />
    </article>
  );
}
