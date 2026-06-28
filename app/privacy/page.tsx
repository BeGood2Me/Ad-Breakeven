import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const PAGE = {
  title: "Privacy Policy",
  description:
    "How Ad Breakeven handles data: no accounts, no analytics, no tracking cookies. Calculator inputs stay in your browser unless you share a link.",
  path: "/privacy",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function PrivacyPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: PAGE.path },
        ])}
      />
      <h1>Privacy Policy</h1>
      <p className="intro">
        {SITE_NAME} ({SITE_URL}) is a free calculator site. We keep data
        collection to a minimum. This policy describes what happens when you use
        the site today.
      </p>

      <section className="content-section" aria-labelledby="privacy-summary">
        <h2 id="privacy-summary">Summary</h2>
        <ul>
          <li>No account or signup required</li>
          <li>No analytics or advertising trackers</li>
          <li>No marketing cookies</li>
          <li>Calculator inputs are stored locally in your browser</li>
          <li>We do not sell your personal information</li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="privacy-collect">
        <h2 id="privacy-collect">Information we collect</h2>
        <p>
          We do <strong>not</strong> ask you to create an account or submit
          forms. We do not collect your name, email, or payment details through
          this site.
        </p>
        <p>
          If you use <strong>Share link</strong> or <strong>Copy results</strong>,
          calculator values may appear in the page URL. That URL is only shared if
          you choose to copy or send it — we do not receive those numbers on our
          servers.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-local">
        <h2 id="privacy-local">Local storage in your browser</h2>
        <p>
          The site uses your browser&apos;s <strong>localStorage</strong> to:
        </p>
        <ul>
          <li>Remember your light or dark theme preference</li>
          <li>Restore calculator inputs when you return to a page</li>
        </ul>
        <p>
          This data stays on your device. You can clear it anytime through your
          browser settings. We do not use localStorage to track you across other
          websites.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-cookies">
        <h2 id="privacy-cookies">Cookies</h2>
        <p>
          We do not set analytics, advertising, or profiling cookies. The site
          may rely on strictly necessary technical storage (such as localStorage
          above) for basic functionality.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-hosting">
        <h2 id="privacy-hosting">Hosting and server logs</h2>
        <p>
          The site is hosted on a cloud platform that may automatically log
          standard request data — for example IP address, browser type, pages
          requested, and timestamps — for security and reliability. We use those
          logs only to operate and protect the site, not for marketing.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-third">
        <h2 id="privacy-third">Third parties</h2>
        <p>
          We do not embed third-party ad networks or social trackers on calculator
          pages. If we add analytics or other services in the future, we will
          update this policy before or when they go live.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-children">
        <h2 id="privacy-children">Children</h2>
        <p>
          The site is intended for business and marketing use. We do not
          knowingly collect personal information from children.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-changes">
        <h2 id="privacy-changes">Changes to this policy</h2>
        <p>
          We may update this page when the site changes — for example, if we add
          analytics or a contact form. The current version is always published at{" "}
          <Link href="/privacy">{SITE_URL}/privacy</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="privacy-related">
        <h2 id="privacy-related">Related</h2>
        <p>
          See also our <Link href="/terms">Terms of Use</Link> and{" "}
          <Link href="/faq">FAQ</Link>.
        </p>
      </section>
    </article>
  );
}
