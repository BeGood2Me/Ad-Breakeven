import Link from "next/link";
import {
  ARBITRATION_DISPUTE_EMAIL,
  GOVERNING_LAW_COUNTY,
  GOVERNING_LAW_STATE,
  LEGAL_CONTACT_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_LAST_UPDATED_DISPLAY,
  LEGAL_VERSION,
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
        &rdquo;) is owned and operated by {LEGAL_ENTITY_NAME} (&ldquo;
        <strong>Company</strong>,&rdquo; &ldquo;<strong>us</strong>,&rdquo; &ldquo;
        <strong>our</strong>,&rdquo; or &ldquo;<strong>we</strong>&rdquo;).
        These Terms of Use (&ldquo;<strong>Terms</strong>&rdquo;) govern your
        use of the Site. By accessing or using the Site, you agree to these
        Terms. You must be at least 18 years old to use the Site. If you do not
        agree, do not use the Site.
      </p>

      <p>
        <strong>Important — please read Section 11 carefully.</strong> It
        contains an agreement to resolve disputes through binding individual
        arbitration instead of in court, and includes a waiver of class action
        and jury trial rights. You have 30 days to opt out of the arbitration
        agreement, as described in Section 11.
      </p>

      <section className="content-section" aria-labelledby="terms-access">
        <h2 id="terms-access">1. Access to the Site</h2>
        <h3>1.1 No account required</h3>
        <p>
          The Site does not require account registration. Some features store
          preferences and calculator inputs locally in your browser, as
          described in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
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
          reference. The Privacy Policy describes how we collect, use, and share
          personal information, including through cookies and analytics tools.
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
          business model. Platform-reported metrics may differ from your true
          unit economics. Verify every result with your own data before changing
          ad spend, bids, or budgets.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-indemnity">
        <h2 id="terms-indemnity">4. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Company and its
          officers, employees, and agents from any claims and reasonable costs or
          attorneys&apos; fees arising out of (i) your use of the Site, (ii) your
          violation of these Terms, or (iii) your violation of any applicable law
          or regulation.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-third-party">
        <h2 id="terms-third-party">5. Third-party services</h2>
        <p>
          The Site may include links to or integrations with third-party
          websites or services (collectively, &ldquo;<strong>Third-Party
          Services</strong>&rdquo;). We do not control or endorse Third-Party
          Services. You use them at your own risk, and their terms and privacy
          practices apply.
        </p>
        <p>
          To the fullest extent permitted by law, you release Company from
          claims arising out of Third-Party Services. If you are a California
          resident, you waive California Civil Code Section 1542 to the extent
          permitted by law.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-disclaimers">
        <h2 id="terms-disclaimers">6. Disclaimers</h2>
        <p>
          THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE.&rdquo;
          TO THE FULLEST EXTENT PERMITTED BY LAW, COMPANY AND ITS SUPPLIERS
          DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE
          UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF HARMFUL CODE.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-liability">
        <h2 id="terms-liability">7. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW: (A) COMPANY AND ITS SUPPLIERS
          WILL NOT BE LIABLE FOR ANY LOST PROFITS, LOST DATA, COSTS OF SUBSTITUTE
          PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL,
          EXEMPLARY, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO THESE TERMS
          OR YOUR USE OF (OR INABILITY TO USE) THE SITE; AND (B) OUR TOTAL
          LIABILITY TO YOU FOR ANY CLAIM ARISING UNDER THESE TERMS IS CAPPED AT
          THE GREATER OF (i) $50 USD AND (ii) THE AMOUNT PAID TO COMPANY BY YOU
          UNDER THESE TERMS IN THE SIX MONTHS PRIOR TO THE INCIDENT GIVING RISE
          TO THE CLAIM.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-termination">
        <h2 id="terms-termination">8. Term and termination</h2>
        <p>
          These Terms remain in effect while you use the Site. We may suspend or
          terminate your access at any time for any reason, including if we
          believe you violated these Terms. Upon termination, Sections 1.3
          through 1.6 and Sections 2 through 10 survive.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-state">
        <h2 id="terms-state">9. State-specific legal notices</h2>
        <p>
          <strong>California.</strong> California users may report complaints to
          the Complaint Assistance Unit of the Division of Consumer Services of
          the California Department of Consumer Affairs. Under California Civil
          Code Section 1789.3, California users are entitled to contact the
          provider of the Site at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> for
          complaint information. California residents may have additional rights
          under the CCPA/CPRA — see our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          <strong>Colorado, Connecticut, and Virginia.</strong> Residents may
          have rights under applicable state privacy laws. See our Privacy Policy
          for details.
        </p>
        <p>
          <strong>Nevada.</strong> Nevada residents may direct us not to sell
          certain information under Nevada Revised Statutes Chapter 603A by
          contacting{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="terms-general">
        <h2 id="terms-general">10. General</h2>
        <ul>
          <li>
            <strong>Changes to Terms.</strong> We may update these Terms from
            time to time. Continued use after changes means you accept the
            updated Terms published at {TERMS_URL}.
          </li>
          <li>
            <strong>Governing law.</strong> These Terms are governed by the laws
            of the State of {GOVERNING_LAW_STATE}, without regard to
            conflict-of-law principles. For claims not subject to arbitration,
            you and Company consent to exclusive jurisdiction in the state and
            federal courts located in {GOVERNING_LAW_COUNTY} County,{" "}
            {GOVERNING_LAW_STATE}.
          </li>
          <li>
            <strong>Electronic communications.</strong> By using the Site, you
            consent to receive communications from us electronically.
          </li>
          <li>
            <strong>Accessibility.</strong> We endeavor to conform to WCAG 2.1
            Level AA. Accessibility concerns may be sent to{" "}
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

      <section className="content-section" aria-labelledby="terms-arbitration">
        <h2 id="terms-arbitration">11. Dispute resolution</h2>
        <p>
          Please read this section carefully. It affects your legal rights,
          including your right to sue in court and your right to a jury trial.
        </p>
        <h3>11.1 Applicability</h3>
        <p>
          Except as described below, you and Company agree to resolve disputes
          arising out of or relating to the Site or these Terms through binding
          individual arbitration — not in court. Exceptions include (i) claims
          that qualify for small claims court on an individual basis, and (ii)
          requests for equitable relief related to intellectual property.
        </p>
        <h3>11.2 Informal resolution</h3>
        <p>
          Before starting arbitration, the party raising a dispute must send
          written notice to{" "}
          <a href={`mailto:${ARBITRATION_DISPUTE_EMAIL}`}>
            {ARBITRATION_DISPUTE_EMAIL}
          </a>
          . The parties will try to resolve the dispute informally within 60
          days.
        </p>
        <h3>11.3 Arbitration rules</h3>
        <p>
          Arbitrations will be administered by JAMS (
          <a href="https://www.jamsadr.com" rel="noopener noreferrer" target="_blank">
            jamsadr.com
          </a>
          ) under its applicable rules. Unless the parties agree otherwise,
          arbitration will be conducted in the county where you live.
        </p>
        <h3>11.4 Waiver of jury trial and class actions</h3>
        <p>
          BY AGREEING TO ARBITRATION, YOU AND COMPANY WAIVE THE RIGHT TO A TRIAL
          BY JUDGE OR JURY. ALL DISPUTES MUST BE BROUGHT ON AN INDIVIDUAL BASIS.
          NEITHER YOU NOR COMPANY MAY BRING CLAIMS AS A PLAINTIFF OR CLASS
          MEMBER IN ANY CLASS, REPRESENTATIVE, OR COLLECTIVE PROCEEDING.
        </p>
        <h3>11.5 Opt-out</h3>
        <p>
          You may opt out of this arbitration agreement within 30 days of first
          accepting these Terms by sending written notice to{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>{" "}
          with your name, address, and a clear statement that you wish to opt out.
        </p>
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
