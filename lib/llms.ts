import { FAQ_ITEMS } from "@/lib/faq";
import {
  ALL_PAGES,
  FAQ_PAGE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TOOL_LINKS,
} from "@/lib/site";

function abs(path: string) {
  return `${SITE_URL}${path}`;
}

function linkLine(title: string, path: string, description: string) {
  return `- [${title}](${abs(path)}): ${description}`;
}

export function buildLlmsTxt(): string {
  const guidePages = ALL_PAGES.filter(
    (page) =>
      page.href !== "/" &&
      !TOOL_LINKS.some((tool) => tool.href === page.href) &&
      page.href !== "/terms" &&
      page.href !== "/privacy"
  );

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} (${SITE_URL}) is a free paid-media profitability toolkit. Calculators support ecommerce (AOV + gross margin) and lead gen (customer/deal value + close rate). Results include shareable URLs and tailored next steps. Informational only — not financial, tax, or legal advice.`,
    "",
    "## Calculators",
    "",
    linkLine(
      "Break-even Ads Calculator",
      "/",
      "Hub tool: break-even ROAS, max CPA, max CPC, and sales volume from margin and conversion rate"
    ),
    ...TOOL_LINKS.map(({ title, href, description }) =>
      linkLine(title, href, description)
    ),
    "",
    "## Guides",
    "",
    ...guidePages.map(({ title, href }) => {
      const description =
        href === "/how-to-calculate-break-even-roas"
          ? "Break-even ROAS formula, step-by-step example, ecommerce and lead gen"
          : href === "/roas-vs-roi-vs-cpa"
            ? "Compare ROAS, ROI, CPA, and CPC — when to use each for ad profitability"
            : href === "/faq"
              ? "Answers on break-even ROAS, max CPA, CPC, ad profit, and lead gen"
              : title;
      return linkLine(title, href, description);
    }),
    "",
    "## Optional",
    "",
    linkLine(
      "llms-full.txt",
      "/llms-full.txt",
      "Full FAQ, formulas, and page summaries for AI agents in one file"
    ),
    linkLine("Sitemap", "/sitemap.xml", "All indexable URLs for this site"),
    linkLine(
      "Privacy Policy",
      "/privacy",
      "What data the site collects — no analytics or tracking cookies today"
    ),
    linkLine(
      "Terms of Use",
      "/terms",
      "Disclaimer — calculators are informational tools only"
    ),
  ];

  return `${lines.join("\n")}\n`;
}

export function buildLlmsFullTxt(): string {
  const sections: string[] = [
    `# ${SITE_NAME} — full content for AI agents`,
    "",
    `Generated for: ${SITE_URL}`,
    "",
    `Use ${abs("/llms.txt")} as the curated index. This file contains formulas, FAQ, and page summaries.`,
    "",
    "---",
    "",
    "## About",
    "",
    SITE_DESCRIPTION,
    "",
    "Supports ecommerce and lead gen. Lead gen uses customer value × close rate as expected revenue per lead; max acquisition target is cost per lead (divide by close rate for CRM closed-deal cap).",
    "",
    "## Core formulas",
    "",
    "### Contribution",
    "",
    "Ecommerce: contribution = (AOV × gross margin %) − fixed cost per order",
    "",
    "Lead gen: expected revenue per lead = customer value × close rate",
    "",
    "Lead gen: contribution per lead = (expected revenue per lead × gross margin %) − fixed cost per lead",
    "",
    "### Break-even ROAS",
    "",
    "break-even ROAS = value ÷ contribution (value = AOV for ecommerce, expected revenue per lead for lead gen)",
    "",
    "Conversion rate does not change break-even ROAS — only margin and value per conversion matter.",
    "",
    "### Max acquisition cost",
    "",
    "Ecommerce: max CPA = contribution per sale",
    "",
    "Lead gen: max cost per lead = contribution per lead",
    "",
    "Lead gen CRM: max cost per closed deal = max cost per lead ÷ close rate",
    "",
    "### Max CPC",
    "",
    "max CPC = max acquisition cost × conversion rate (as a decimal)",
    "",
    "### Ad profit",
    "",
    "revenue = sales × AOV",
    "",
    "product costs = sales × (AOV − contribution per order)",
    "",
    "profit = revenue − product costs − ad spend",
    "",
    "actual ROAS = revenue ÷ ad spend — compare to break-even ROAS to see if campaigns are profitable.",
    "",
    "## Calculators",
    "",
    linkLine(
      "Break-even Ads Calculator",
      "/",
      "All-in-one: ROAS, CPA, CPC, break-even sales, shareable results"
    ),
    ...TOOL_LINKS.map(({ title, href, description }) =>
      linkLine(title, href, description)
    ),
    "",
    "## Guides",
    "",
    linkLine(
      "How to Calculate Break-even ROAS",
      "/how-to-calculate-break-even-roas",
      "Formula walkthrough with ecommerce and lead gen examples"
    ),
    linkLine(
      "ROAS vs ROI vs CPA vs CPC",
      "/roas-vs-roi-vs-cpa",
      "Metric definitions, differences, and break-even connections"
    ),
    "",
    `## ${FAQ_PAGE_TITLE}`,
    "",
    ...FAQ_ITEMS.flatMap(({ question, plainAnswer }) => [
      `### ${question}`,
      "",
      plainAnswer,
      "",
    ]),
    "## Legal",
    "",
    "Calculators and guides on Ad Break-even are for informational and educational purposes only. They are not financial, tax, or legal advice. Verify all results with your own data before changing ad spend or budgets.",
    "",
    linkLine("Privacy Policy", "/privacy", "Data collection and local storage"),
    linkLine("Terms of Use", "/terms", "Full terms and disclaimer"),
    "",
  ];

  return `${sections.join("\n")}\n`;
}
