import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Legal entity name used in Privacy Policy and Terms of Use */
export const LEGAL_ENTITY_NAME = SITE_NAME;

/** Public contact for privacy, terms, and legal notices */
export const LEGAL_CONTACT_EMAIL = "privacy@adbreakeven.com";

/** Last revised date shown on legal pages (ISO date) */
export const LEGAL_LAST_UPDATED = "2026-08-20";

/** Formatted for display in legal documents */
export const LEGAL_LAST_UPDATED_DISPLAY = "August 20, 2026";

export const LEGAL_VERSION = "1.0";

export const GOVERNING_LAW_STATE = "Delaware";

export const GOVERNING_LAW_COUNTY = "New Castle";

export const ARBITRATION_DISPUTE_EMAIL = LEGAL_CONTACT_EMAIL;

export const SITE_DOMAIN = new URL(SITE_URL).hostname;

export const PRIVACY_POLICY_URL = `${SITE_URL}/privacy`;

export const TERMS_URL = `${SITE_URL}/terms`;

export const BUSINESS_DESCRIPTION =
  "free break-even advertising calculators, guides, and embeddable widgets for ecommerce and lead generation marketers";
