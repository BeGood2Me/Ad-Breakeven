import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Legal entity name used in Privacy Policy and Terms of Use */
export const LEGAL_ENTITY_NAME = SITE_NAME;

/** Country where the operator is established */
export const OPERATOR_COUNTRY = "Ireland";

/** Public contact for privacy, terms, and legal notices */
export const LEGAL_CONTACT_EMAIL = "privacy@adbreakeven.com";

/** Last revised date shown on legal pages (ISO date) */
export const LEGAL_LAST_UPDATED = "2026-08-20";

/** Formatted for display in legal documents */
export const LEGAL_LAST_UPDATED_DISPLAY = "August 20, 2026";

export const LEGAL_VERSION = "1.1";

/** Governing law and courts for Terms of Use */
export const GOVERNING_LAW_JURISDICTION = "Ireland";

export const GOVERNING_LAW_COURTS = "the courts of Ireland";

export const SITE_DOMAIN = new URL(SITE_URL).hostname;

export const PRIVACY_POLICY_URL = `${SITE_URL}/privacy`;

export const TERMS_URL = `${SITE_URL}/terms`;

export const BUSINESS_DESCRIPTION =
  "free break-even advertising calculators, guides, and embeddable widgets for ecommerce and lead generation marketers";

/** Irish Data Protection Commission — supervisory authority for Ireland-based controllers */
export const DATA_PROTECTION_AUTHORITY_NAME =
  "Data Protection Commission (DPC)";

export const DATA_PROTECTION_AUTHORITY_URL = "https://www.dataprotection.ie";

export const EEA_SUPERVISORY_AUTHORITIES_URL =
  "https://edpb.europa.eu/about-edpb/about-edpb/members_en";
