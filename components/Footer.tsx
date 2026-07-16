"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterYear from "@/components/FooterYear";
import { PILLAR_INDEX } from "@/generated/content-manifest";
import { GUIDE_LINKS, SITE_NAME, TOOL_LINKS } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/embed")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <nav className="footer-topics" aria-label="Topic clusters">
        <ul className="footer-topics-list">
          {PILLAR_INDEX.map(({ slug, path, headline }) => (
            <li key={slug}>
              <Link href={path}>{headline}</Link>
            </li>
          ))}
          <li>
            <Link href="/blog">All blog posts</Link>
          </li>
        </ul>
      </nav>
      <div className="footer-inner">
        <div>
          <h2>Calculators</h2>
          <ul className="footer-links">
            <li>
              <Link href="/">Break-even Ads Calculator</Link>
            </li>
            {TOOL_LINKS.map(({ href, title }) => (
              <li key={href}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Guides</h2>
          <ul className="footer-links">
            {GUIDE_LINKS.map(({ href, title }) => (
              <li key={href}>
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>About</h2>
          <p className="footer-meta">
            {SITE_NAME} — free break-even calculators for paid media planning.
            Free, no signup. Supports ecommerce and lead gen.{" "}
            <Link href="/about">Learn more</Link>
          </p>
        </div>
      </div>
      <div className="footer-legal">
        <p>
          © <FooterYear /> {SITE_NAME}. For informational purposes only — not
          financial, tax, or legal advice.{" "}
          <Link href="/privacy">Privacy Policy</Link>
          {" · "}
          <Link href="/terms">Terms of Use</Link>
        </p>
      </div>
    </footer>
  );
}
