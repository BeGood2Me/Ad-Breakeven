import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { buildPageMetadata } from "@/lib/page-metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE = {
  title: "Privacy Policy",
  description:
    "How Ad Breakeven collects and uses data: analytics, cookies, local storage, and your U.S. state privacy rights.",
  path: "/privacy",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function PrivacyPage() {
  return (
    <article className="page-content legal-document">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: PAGE.path },
        ])}
      />
      <h1>Privacy Policy</h1>
      <p className="intro">
        {SITE_NAME} ({SITE_URL}) is a free calculator site. This Privacy Policy
        describes how we handle information when you use the Service.
      </p>
      <PrivacyPolicyContent />
    </article>
  );
}
