import Link from "next/link";
import FooterYear from "@/components/FooterYear";
import { GUIDE_LINKS, SITE_NAME, TOOL_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
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
            No ads, no signup. Supports ecommerce and lead gen.
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
