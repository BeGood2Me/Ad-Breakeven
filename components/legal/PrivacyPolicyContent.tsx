import Link from "next/link";
import {
  BUSINESS_DESCRIPTION,
  LEGAL_CONTACT_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_LAST_UPDATED_DISPLAY,
  SITE_DOMAIN,
} from "@/lib/legal/config";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Adapted from General Legal Privacy Policy (U.S.) template (CC0).
 * https://github.com/General-Legal/legal-templates/tree/main/templates/privacy-policy-us
 */
export default function PrivacyPolicyContent() {
  return (
    <>
      <p className="legal-meta">
        Last updated: {LEGAL_LAST_UPDATED_DISPLAY}
      </p>

      <p>
        {LEGAL_ENTITY_NAME} (&ldquo;<strong>we</strong>,&rdquo; &ldquo;
        <strong>us</strong>,&rdquo; or &ldquo;<strong>our</strong>&rdquo;)
        provides {BUSINESS_DESCRIPTION}. This Privacy Policy describes how we
        process personal information collected through {SITE_URL} and related
        pages that link to this policy (collectively, the &ldquo;
        <strong>Service</strong>&rdquo;).
      </p>

      <p>
        <strong>California Notice at Collection / State Privacy Rights:</strong>{" "}
        See the State privacy rights notice section below for information about
        rights that may be available under applicable U.S. state privacy laws.
      </p>

      <section className="content-section" aria-labelledby="pi-collect">
        <h2 id="pi-collect">Personal information we collect</h2>

        <h3>Information you provide to us</h3>
        <p>
          We do <strong>not</strong> require account registration, payment
          information, or contact forms to use the Service. We do not ask you to
          submit your name, email address, or billing details through the
          calculators.
        </p>
        <p>
          If you use <strong>Share link</strong> or <strong>Copy results</strong>,
          calculator values may appear in the page URL. That URL is only shared
          if you choose to copy or send it — we do not receive those values on
          our servers unless they are included in standard web server logs when
          you load a shared URL.
        </p>

        <h3>Automatic data collection</h3>
        <p>
          We, our service providers, and our analytics partners may automatically
          log information about you, your computer or mobile device, and your
          interaction with the Service, such as:
        </p>
        <ul>
          <li>
            <strong>Device data</strong>, such as browser type, operating
            system, screen resolution, device type, IP address, language
            settings, and general location information derived from IP address
            (such as city, state, or geographic area).
          </li>
          <li>
            <strong>Online activity data</strong>, such as pages viewed, time
            spent on pages, navigation paths, referring URL, access times, and
            whether you opened emails or clicked links within them (if
            applicable).
          </li>
        </ul>
        <p>
          Some automatic data collection is facilitated by cookies and similar
          technologies, as described in the Cookie Notice section below.
        </p>

        <h3>Local storage in your browser</h3>
        <p>
          The Service uses browser <strong>localStorage</strong> to remember your
          light or dark theme preference, restore calculator inputs, and store
          your analytics cookie consent choice. This data stays on your device
          unless you clear site data in your browser.
        </p>
      </section>

      <section className="content-section" aria-labelledby="cookie-notice">
        <h2 id="cookie-notice">Cookie notice</h2>
        <p>
          This section explains how we use cookies and similar technologies on{" "}
          {SITE_DOMAIN}. Content in this section is adapted from the General
          Legal Cookie Notice template.
        </p>

        <h3>What are cookies?</h3>
        <p>
          Cookies are small data files placed on your device when you visit a
          website. They help us understand how the Service is used and improve
          your browsing experience. We use session cookies (which expire when you
          close your browser) and persistent cookies (which remain until deleted).
        </p>

        <h3>Types of cookies we use</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Who serves them</th>
                <th scope="col">How to control</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential / functionality</td>
                <td>
                  Strictly necessary or functional storage for basic site
                  operation, theme preference, calculator state, and cookie
                  consent.
                </td>
                <td>{SITE_NAME}</td>
                <td>
                  Stored in localStorage; clear site data in your browser
                  settings.
                </td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>
                  Help us measure page views, traffic sources, and basic usage.
                </td>
                <td>
                  Vercel Analytics; Google Analytics 4 (Google LLC) if you
                  accept cookies
                </td>
                <td>
                  Decline analytics cookies in our cookie banner; block cookies in
                  browser settings; see Google&apos;s opt-out tools.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do <strong>not</strong> use advertising, social media, or
          interest-based advertising cookies on the Service.
        </p>

        <h3>Your choices</h3>
        <ul>
          <li>
            <strong>Cookie banner.</strong> On your first visit you may{" "}
            <strong>Accept</strong> or <strong>Decline</strong> analytics
            cookies. Your choice is stored in localStorage. Declining prevents
            Google Analytics from loading. Clear site data to see the banner
            again.
          </li>
          <li>
            <strong>Browser controls.</strong> Most browsers let you block or
            delete cookies. Disabling cookies may affect site functionality.
          </li>
          <li>
            <strong>Do Not Track.</strong> We do not currently respond to Do
            Not Track signals.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="pi-use">
        <h2 id="pi-use">How we use your personal information</h2>
        <p>We may use personal information to:</p>
        <ul>
          <li>Provide, operate, secure, and maintain the Service;</li>
          <li>
            Understand usage and improve the Service (analytics and diagnostics);
          </li>
          <li>
            Comply with law, respond to lawful requests, and protect our rights;
          </li>
          <li>Enforce our <Link href="/terms">Terms of Use</Link>.</li>
        </ul>
        <p>
          We do <strong>not</strong> use your information for direct marketing
          emails, interest-based advertising, or sale of personal information.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-share">
        <h2 id="pi-share">How we share your personal information</h2>
        <p>We may share personal information with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that help us host and operate the
            Service, including Vercel, Inc. (hosting and Vercel Analytics) and
            Google LLC (Google Analytics 4, if you accept analytics cookies).
          </li>
          <li>
            <strong>Professional advisors</strong> (such as lawyers or auditors)
            when needed for our business.
          </li>
          <li>
            <strong>Authorities and others</strong> when we believe disclosure is
            required or appropriate to comply with law or protect rights and
            safety.
          </li>
          <li>
            <strong>Business transferees</strong> in connection with a merger,
            acquisition, financing, or sale of assets.
          </li>
        </ul>
        <p>We do not sell your personal information for money.</p>
      </section>

      <section className="content-section" aria-labelledby="pi-choices">
        <h2 id="pi-choices">Your choices</h2>
        <ul>
          <li>
            Manage analytics cookies through our cookie banner or by clearing
            site data.
          </li>
          <li>
            Clear localStorage to remove theme and calculator preferences stored
            on your device.
          </li>
          <li>
            See State privacy rights notice below for additional rights that may
            apply based on where you live.
          </li>
        </ul>
      </section>

      <section className="content-section" aria-labelledby="pi-security">
        <h2 id="pi-security">Security</h2>
        <p>
          We employ technical and organizational safeguards designed to protect
          personal information. However, no internet transmission or storage
          system is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-children">
        <h2 id="pi-children">Children</h2>
        <p>
          The Service is not intended for anyone under 18 years of age. We do not
          knowingly collect personal information from children. If you believe we
          have collected information from a child, contact us at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-changes">
        <h2 id="pi-changes">Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last
          updated&rdquo; date at the top reflects the latest version. Material
          changes may be posted on the Service. Continued use after an update
          means you acknowledge the revised policy.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-contact">
        <h2 id="pi-contact">How to contact us</h2>
        <p>
          Questions about this Privacy Policy or requests to exercise privacy
          rights may be sent to{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section className="content-section" aria-labelledby="state-rights">
        <h2 id="state-rights">State privacy rights notice</h2>
        <p>
          Depending on where you live, U.S. state privacy laws may grant you
          rights regarding your personal information, such as rights to know,
          access, correct, delete, or opt out of certain processing. Because we
          do not sell personal information or use it for targeted advertising,
          many opt-out rights may not apply to our current practices.
        </p>
        <p>
          <strong>California residents.</strong> You may have rights under the
          California Consumer Privacy Act (CCPA), as amended by the CPRA,
          including the right to know what personal information we collect, the
          right to delete personal information, and the right to correct
          inaccurate personal information. We do not sell or share personal
          information for cross-context behavioral advertising. To exercise
          rights, email{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
          We may need to verify your request before responding.
        </p>
        <p>
          <strong>Colorado, Connecticut, Virginia, and other states.</strong>{" "}
          Residents of states with comprehensive privacy laws may have similar
          rights. Contact us at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>{" "}
          for requests. We will respond as required by applicable law.
        </p>
        <p>
          <strong>Nevada residents.</strong> We do not sell covered information
          as defined under Nevada law. You may still contact us at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> with
          questions.
        </p>
        <p>
          We will not discriminate against you for exercising privacy rights
          permitted by law.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-related">
        <h2 id="pi-related">Related</h2>
        <p>
          See also our <Link href="/terms">Terms of Use</Link> and{" "}
          <Link href="/faq">FAQ</Link>.
        </p>
        <p className="legal-attribution">
          Privacy Policy and Cookie Notice adapted from templates by{" "}
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
