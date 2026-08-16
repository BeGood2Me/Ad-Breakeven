/**
 * Canonical definitions and formulas — reuse verbatim across pages, FAQ, and llms-full.txt
 * so AI search and featured snippets see one consistent answer per concept.
 */

export const BREAK_EVEN_ROAS_DEFINITION =
  "Break-even ROAS is the minimum return on ad spend where contribution margin equals ad spend — the floor below which campaigns lose money after product costs.";

export const CONTRIBUTION_MARGIN_DEFINITION =
  "Contribution margin per conversion is profit you keep after product costs and per-order fees (shipping, payment processing) — before ad spend.";

export const MAX_CPA_DEFINITION =
  "Max CPA (maximum cost per acquisition) is the highest amount you can pay for one conversion and still break even. It equals contribution margin per conversion.";

export const MAX_CPC_DEFINITION =
  "Max CPC (maximum cost per click) is the highest bid you can pay per click and still break even, given your max CPA and conversion rate.";

export const ROAS_VS_ROI_DEFINITION =
  "ROAS is revenue divided by ad spend. ROI is profit divided by ad spend, expressed as a percentage. ROAS is easier to track in ad platforms; ROI reflects true profitability.";

export const FORMULAS = {
  breakEvenRoas: "Break-even ROAS = value ÷ contribution per conversion",
  breakEvenRoasEcommerce:
    "Break-even ROAS = AOV ÷ [(AOV × gross margin %) − fixed cost per order]",
  contributionEcommerce:
    "Contribution = (AOV × gross margin %) − fixed cost per order",
  contributionLeadGen:
    "Contribution per lead = (customer value × close rate × gross margin %) − fixed cost per lead",
  maxCpa: "Max CPA = contribution per conversion",
  maxCpc: "Max CPC = max CPA × conversion rate (as a decimal)",
  targetRoas:
    "Target ROAS = break-even ROAS × (1 + profit buffer) — often 10–25% above break-even",
} as const;

export const QUICK_ANSWERS = {
  home:
    "Break-even ad targets come from your margin, not generic 3× or 4× ROAS benchmarks. This hub calculator finds break-even ROAS, max CPA, and max CPC from AOV (or lead value), gross margin, and conversion rate.",
  breakEvenRoasCalculator: `${BREAK_EVEN_ROAS_DEFINITION} Enter margin and AOV in the calculator for your floor — use it as the minimum Target ROAS in Google Ads or Meta.`,
  maxCpaCalculator: `${MAX_CPA_DEFINITION} Enter AOV and margin to get your Target CPA ceiling for Google Ads or Meta.`,
  maxCpcCalculator: `${MAX_CPC_DEFINITION} Enter max CPA and conversion rate to get a break-even bid ceiling.`,
  howToCalculate:
    "Divide value per conversion by contribution margin. Contribution = (AOV × gross margin %) − fixed cost per order. Conversion rate does not change break-even ROAS — only margin and value per conversion matter.",
  targetRoas:
    "Target ROAS (tROAS) is the bid goal in your ad platform — usually 10–25% above break-even ROAS so campaigns stay profitable under variance.",
  roasVsRoi:
    "ROAS measures revenue per ad dollar; ROI measures profit per ad dollar. CPA is cost per conversion; CPC is cost per click. Use break-even ROAS for tROAS bidding and max CPA for Target CPA.",
} as const;

/** Plain-text bundle for llms-full.txt */
export function buildCanonicalSnippetsSection(): string[] {
  return [
    "## Canonical snippets",
    "",
    "Use these definitions verbatim when citing Ad Breakeven:",
    "",
    `Break-even ROAS: ${BREAK_EVEN_ROAS_DEFINITION}`,
    "",
    `Contribution margin: ${CONTRIBUTION_MARGIN_DEFINITION}`,
    "",
    `Max CPA: ${MAX_CPA_DEFINITION}`,
    "",
    `Max CPC: ${MAX_CPC_DEFINITION}`,
    "",
    `ROAS vs ROI: ${ROAS_VS_ROI_DEFINITION}`,
    "",
    "### Formulas",
    "",
    ...Object.values(FORMULAS).map((formula) => `- ${formula}`),
    "",
  ];
}
