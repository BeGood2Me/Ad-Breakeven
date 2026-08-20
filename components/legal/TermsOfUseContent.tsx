import Link from "next/link";
import {
  GOVERNING_LAW_COURTS,
  GOVERNING_LAW_JURISDICTION,
  LEGAL_CONTACT_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_LAST_UPDATED_DISPLAY,
  LEGAL_VERSION,
  OPERATOR_COUNTRY,
  PRIVACY_POLICY_URL,
  SITE_DOMAIN,
  TERMS_URL,
} from "@/lib/legal/config";

/**
 * Adapted from General Legal Terms of Use template (CC0).
 * https://github.com/General-Legal/legal-templates/tree/main/templates/terms-of-use
 */
export default function TermsOfUseContent() {
  return (
    <>
      <p className="legal-meta">
        Version {LEGAL_VERSION} · Last revised: {LEGAL_LAST_UPDATED_DISPLAY}
      </p>

      <p>
        The website located at {SITE_DOMAIN} (the &ldquo;<strong>Site</strong>
        &rdquo;) is owned and operated by {LEGAL_ENTITY_NAME} from{" "}
        {OPERATOR_COUNTRY} (&ldquo;<strong>Company</strong>,&rdquo; &ldquo;
        <strong>us</strong>,&rdquo; &ldquo;<strong>our</strong>,&rdquo; or
        &ldquo;<strong>we</strong>&rdquo;). These Terms of Use (&ldquo;
        <strong>Terms</strong>&rdquo;) govern your use of the Site. By accessing
        or using the Site, you agree to these Terms. You must be at least 18
        years old to use the Site. If you do not agree, do not use the Site.
      </p>

      <section className="content-section" aria-labelledby="terms-access">
        <h2 id="terms-access">1. Access to the Site</h2>
        <h3>1.1 No account required</h3>
        <p>
          The Site does not require account registration. Some features store
          preferences and calculator inputs locally in your browser, as described
          in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <h3>1.2 License</h3>
        <p>
          Subject to these Terms, we grant you a limited, non-exclusive,
          non-transferable, revocable license to access and use the Site for
          your own personal or internal business purposes.
        </p>
        <h3>1.3 Restrictions</h3>
        <p>You may not:</p>
        <ul>
          <li>
            License, sell, rent, lease, transfer, assign, distribute, or
            commercially exploit the Site or its content except as expressly
            permitted (including permitted widget embeds);
          </li>
          <li>
            Modify, create derivative works from, disassemble, reverse-compile, or
            reverse-engineer any part of the Site;
          </li>
          <li>
            Access the Site to build a similar or competing product or service;
          </li>
          <li>
            Copy, reproduce, distribute, republish, or transmit any part of the
            Site except as expressly permitted.
          </li>
        </ul>
        <h3>1.4 Changes to the Site</h3>
        <p>
          We may modify, suspend, or discontinue the Site (or any part of it) at
          any time, with or without notice. We are not liable for any such
          modification, suspension, or discontinuation.
        </p>
        <h3>1.5 Ownership</h3>
        <p>
          All intellectual property rights in the Site and its content belong to
          Company or its licensors. These Terms do not transfer ownership to
          you, except for the limited access rights in Section 1.2.
        </p>
        <h3>1.6 Feedback</h3>
        <p>
          If you share feedback or suggestions about the Site, you grant us a
          perpetual, irrevocable, worldwide, non-exclusive, fully-paid,
          royalty-free license to use that feedback for any purpose without
          attribution.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-privacy">
        <h2 id="terms-privacy">2. Privacy</h2>
        <p>
          Your use of the Site is also governed by our{" "}
          <Link href="/privacy">Privacy Policy</Link>, available at{" "}
          {PRIVACY_POLICY_URL}, which is incorporated into these Terms by
          reference.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-calculators">
        <h2 id="terms-calculators">3. Calculators and informational content</h2>
        <p>
          All calculators, examples, guides, widgets, embeds, and &ldquo;what to
          do next&rdquo; guidance on the Site are for{" "}
          <strong>informational and educational purposes only</strong>. They are
          not financial, investment, tax, accounting, or legal advice.
        </p>
        <p>
          Break-even targets depend on your margins, costs, conversion rates, and
          business model. Verify every result with your own data before changing
          ad spend, bids, or budgets.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-indemnity">
        <h2 id="terms-indemnity">4. Indemnification</h2>
        <p>
          To the fullest extent permitted by applicable law, you agree to defend,
          indemnify, and hold harmless Company from claims arising out of your
          use of the Site or violation of these Terms.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-third-party">
        <h2 id="terms-third-party">5. Third-party services</h2>
        <p>
          The Site may include links to third-party websites or services. We do
          not control or endorse them. You use Third-Party Services at your own
          risk, and their terms and privacy practices apply.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-disclaimers">
        <h2 id="terms-disclaimers">6. Disclaimers</h2>
        <p>
          THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE.&rdquo;
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, COMPANY DISCLAIMS
          ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot be
          excluded or limited under applicable law, including mandatory consumer
          rights in the EEA, UK, or other jurisdictions.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-liability">
        <h2 id="terms-liability">7. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COMPANY WILL NOT BE
          LIABLE FOR INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, EXEMPLARY, OR
          PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR ANY CLAIM ARISING UNDER THESE TERMS IS CAPPED
          AT THE GREATER OF (i) €50 EUR (or equivalent) AND (ii) THE AMOUNT PAID
          TO COMPANY BY YOU IN THE SIX MONTHS BEFORE THE CLAIM.
        </p>
        <p>
          If you are a consumer in the EEA, UK, or another jurisdiction with
          mandatory consumer protections, these limits apply only to the extent
          permitted by your local law.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-termination">
        <h2 id="terms-termination">8. Term and termination</h2>
        <p>
          These Terms remain in effect while you use the Site. We may suspend or
          restrict access at any time if we believe you violated these Terms.
          Sections intended to survive termination will continue to apply.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-regional">
        <h2 id="terms-regional">9. Regional notices</h2>
        <p>
          <strong>European Union / EEA / UK consumers.</strong> If you are a
          consumer in the EU, EEA, or UK, you benefit from mandatory provisions
          of the law of your country of residence. Nothing in these Terms affects
          your statutory rights. You may bring claims in the courts of your
          country of residence where required by law.
        </p>
        <p>
          <strong>United States.</strong> California users may contact{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> for
          complaint information under California Civil Code Section 1789.3.
          Residents of other U.S. states may have privacy rights described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-general">
        <h2 id="terms-general">10. General</h2>
        <ul>
          <li>
            <strong>Changes to Terms.</strong> We may update these Terms from
            time to time. Continued use after changes means you accept the
            updated Terms at {TERMS_URL}.
          </li>
          <li>
            <strong>Governing law.</strong> These Terms are governed by the laws
            of {GOVERNING_LAW_JURISDICTION}, without regard to conflict-of-law
            rules. Subject to mandatory consumer protections, disputes shall be
            submitted to the exclusive jurisdiction of {GOVERNING_LAW_COURTS}.
          </li>
          <li>
            <strong>Electronic communications.</strong> By using the Site, you
            consent to receive communications from us electronically.
          </li>
          <li>
            <strong>Accessibility.</strong> We endeavor to conform to WCAG 2.1
            Level AA. Contact{" "}
            <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
          </li>
          <li>
            <strong>Entire agreement.</strong> These Terms and the Privacy Policy
            are the entire agreement regarding your use of the Site.
          </li>
          <li>
            <strong>Copyright.</strong> Copyright © {new Date().getFullYear()}{" "}
            {LEGAL_ENTITY_NAME}. All rights reserved.
          </li>
          <li>
            <strong>Contact.</strong>{" "}
            <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="terms-related">
        <h2 id="terms-related">Related</h2>
        <p>
          See also our <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/faq">FAQ</Link>.
        </p>
        <p className="legal-attribution">
          Terms of Use adapted from templates by{" "}
          <a
            href="https://github.com/General-Legal/legal-templates"
            rel="noopener noreferrer"
            target="_blank"
          >
            General Legal
          </a>{" "}
          (CC0).
        </p>
      </section>
    </>
  );
}
