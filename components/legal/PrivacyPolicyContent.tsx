import Link from "next/link";
import {
  BUSINESS_DESCRIPTION,
  DATA_PROTECTION_AUTHORITY_NAME,
  DATA_PROTECTION_AUTHORITY_URL,
  EEA_SUPERVISORY_AUTHORITIES_URL,
  LEGAL_CONTACT_EMAIL,
  LEGAL_ENTITY_NAME,
  LEGAL_LAST_UPDATED_DISPLAY,
  OPERATOR_COUNTRY,
  SITE_DOMAIN,
} from "@/lib/legal/config";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Adapted from General Legal Privacy Policy (GDPR Enhanced) template (CC0).
 * https://github.com/General-Legal/legal-templates/tree/main/templates/privacy-policy-gdpr
 */
export default function PrivacyPolicyContent() {
  return (
    <>
      <p className="legal-meta">
        Last updated: {LEGAL_LAST_UPDATED_DISPLAY}
      </p>

      <p>
        {LEGAL_ENTITY_NAME} (&ldquo;<strong>we</strong>,&rdquo; &ldquo;
        <strong>us</strong>,&rdquo; or &ldquo;<strong>our</strong>&rdquo;) is
        operated from {OPERATOR_COUNTRY} and provides {BUSINESS_DESCRIPTION}.
        This Privacy Policy describes how we process personal information
        collected through {SITE_URL} and related pages that link to this policy
        (collectively, the &ldquo;<strong>Service</strong>&rdquo;).
      </p>

      <p>
        References to &ldquo;personal information&rdquo; in this policy include
        &ldquo;personal data&rdquo; as defined in the GDPR and UK GDPR where
        those laws apply.
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
          We and our service providers may automatically log information about
          you, your computer or mobile device, and your interaction with the
          Service, such as:
        </p>
        <ul>
          <li>
            <strong>Device data</strong>, such as browser type, operating
            system, screen resolution, device type, IP address, language
            settings, and general location information derived from IP address.
          </li>
          <li>
            <strong>Online activity data</strong>, such as pages viewed, time
            spent on pages, navigation paths, referring URL, and access times.
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
          {SITE_DOMAIN}.
        </p>

        <h3>What are cookies?</h3>
        <p>
          Cookies are small data files placed on your device when you visit a
          website. They help us understand how the Service is used and improve
          your browsing experience.
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
            Google Analytics from loading.
          </li>
          <li>
            <strong>Browser controls.</strong> Most browsers let you block or
            delete cookies. Disabling cookies may affect site functionality.
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

      <section className="content-section" aria-labelledby="legal-bases">
        <h2 id="legal-bases">Legal bases for processing (EEA and UK)</h2>
        <p>
          If you are in the European Economic Area (EEA) or the United Kingdom,
          we process personal information only where we have a valid legal basis
          under the GDPR or UK GDPR:
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Purpose</th>
                <th scope="col">Data involved</th>
                <th scope="col">Legal basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Service delivery and security</td>
                <td>Device data, online activity data, server logs</td>
                <td>
                  Legitimate interests (operating and securing the Service) and,
                  where applicable, compliance with law
                </td>
              </tr>
              <tr>
                <td>Analytics (if you accept cookies)</td>
                <td>Device data, online activity data, cookies</td>
                <td>Consent</td>
              </tr>
              <tr>
                <td>Theme and calculator preferences (localStorage)</td>
                <td>Preferences stored on your device</td>
                <td>
                  Legitimate interests (remembering your settings) or consent
                  where required
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
            <strong>Professional advisors</strong> when needed for our business.
          </li>
          <li>
            <strong>Authorities</strong> when required or permitted by law.
          </li>
          <li>
            <strong>Business transferees</strong> in connection with a merger,
            acquisition, or sale of assets.
          </li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section className="content-section" aria-labelledby="pi-transfers">
        <h2 id="pi-transfers">International data transfers</h2>
        <p>
          We are based in {OPERATOR_COUNTRY}. Some service providers (including
          Vercel and Google) may process personal information in the United States
          or other countries outside the EEA/UK. Where required, we rely on
          appropriate safeguards such as the European Commission&apos;s Standard
          Contractual Clauses or equivalent mechanisms. Contact us for more
          information about transfer safeguards.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-retention">
        <h2 id="pi-retention">Retention</h2>
        <p>
          We retain personal information only as long as needed for the purposes
          described in this policy, including to comply with legal obligations
          and resolve disputes. Analytics data retention is governed by our
          service providers&apos; settings. Data stored in your browser
          (localStorage) remains until you clear it.
        </p>
      </section>

      <section className="content-section" aria-labelledby="eea-rights">
        <h2 id="eea-rights">Your rights (EEA and UK)</h2>
        <p>
          If you are in the EEA or UK, you may have the right to access, correct,
          delete, restrict, or object to certain processing of your personal
          information, and to data portability where applicable. Where we rely on
          consent, you may withdraw it at any time (for example, by declining
          analytics cookies).
        </p>
        <p>
          To exercise these rights, email{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
          We may need to verify your request before responding.
        </p>
        <p>
          You may lodge a complaint with your local supervisory authority. In
          Ireland, the supervisory authority is the{" "}
          <a
            href={DATA_PROTECTION_AUTHORITY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            {DATA_PROTECTION_AUTHORITY_NAME}
          </a>
          . EEA residents can find their authority via the{" "}
          <a
            href={EEA_SUPERVISORY_AUTHORITIES_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            European Data Protection Board
          </a>
          . UK residents may contact the Information Commissioner&apos;s Office
          (ICO).
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-controller">
        <h2 id="pi-controller">Controller</h2>
        <p>
          {LEGAL_ENTITY_NAME}, operated from {OPERATOR_COUNTRY}, is the data
          controller for personal information processed under this Privacy Policy
          for users in the EEA and UK. Because we are established in Ireland, we
          do not appoint a separate EU representative.
        </p>
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
        </ul>
      </section>

      <section className="content-section" aria-labelledby="pi-security">
        <h2 id="pi-security">Security</h2>
        <p>
          We employ technical and organizational safeguards designed to protect
          personal information. However, no internet transmission or storage
          system is completely secure.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-children">
        <h2 id="pi-children">Children</h2>
        <p>
          The Service is not intended for anyone under 18 years of age. We do not
          knowingly collect personal information from children. Contact us at{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> if
          you believe we have collected information from a child.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-changes">
        <h2 id="pi-changes">Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last
          updated&rdquo; date reflects the latest version. Material changes may
          be posted on the Service.
        </p>
      </section>

      <section className="content-section" aria-labelledby="pi-contact">
        <h2 id="pi-contact">How to contact us</h2>
        <p>
          Questions or privacy requests:{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
        </p>
      </section>

      <section className="content-section" aria-labelledby="state-rights">
        <h2 id="state-rights">Additional notice for U.S. residents</h2>
        <p>
          If you live in the United States, state privacy laws may grant
          additional rights (such as access, correction, or deletion). We do not
          sell personal information or use it for targeted advertising.
        </p>
        <p>
          <strong>California residents</strong> may have rights under the CCPA/CPRA.
          Contact{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> to
          exercise them.
        </p>
        <p>
          Residents of Colorado, Connecticut, Virginia, Nevada, and other states
          with privacy laws may contact us at the same address for applicable
          requests.
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
