export const SITE_URL = "https://adbreakeven.com";
export const SITE_NAME = "Ad Breakeven";
export const FAQ_PAGE_TITLE = "Ad Breakeven FAQ";
export const SITE_DESCRIPTION =
  "Find break-even ROAS, max CPA, max CPC, and ad profit for ecommerce and lead gen. Free calculators with shareable results and next steps.";

export const CALCULATOR_NAV_LINKS = [
  { href: "/", label: "Break-even Calculator", shortLabel: "Break-even" },
  { href: "/break-even-roas-calculator", label: "ROAS Calculator", shortLabel: "ROAS" },
  { href: "/max-cpa-calculator", label: "Max CPA Calculator", shortLabel: "Max CPA" },
  { href: "/max-cpc-calculator", label: "Max CPC Calculator", shortLabel: "Max CPC" },
  { href: "/ad-profit-calculator", label: "Ad Profit Calculator", shortLabel: "Ad Profit" },
] as const;

export const GUIDE_NAV_LINKS = [
  {
    href: "/how-to-calculate-break-even-roas",
    label: "How to Calculate Break-even ROAS",
    shortLabel: "ROAS Guide",
  },
  {
    href: "/what-is-a-good-roas",
    label: "What Is a Good ROAS?",
    shortLabel: "Good ROAS",
  },
  {
    href: "/max-cpa-guide",
    label: "How to Set Target CPA",
    shortLabel: "CPA Guide",
  },
  {
    href: "/google-ads-break-even",
    label: "Google Ads Break-even ROAS",
    shortLabel: "Google Ads",
  },
  {
    href: "/roas-vs-roi-vs-cpa",
    label: "ROAS vs ROI vs CPA",
    shortLabel: "Compare",
  },
] as const;

export const NAV_LINKS = [...CALCULATOR_NAV_LINKS, ...GUIDE_NAV_LINKS] as const;

export const ALL_PAGES = [
  { href: "/", title: "Break-even Ads Calculator", changefreq: "weekly" as const, priority: 1.0 },
  { href: "/break-even-roas-calculator", title: "Break-even ROAS Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/max-cpa-calculator", title: "Max CPA Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/max-cpc-calculator", title: "Max CPC Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/ad-profit-calculator", title: "Ad Profit Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/how-to-calculate-break-even-roas", title: "How to Calculate Break-even ROAS", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/what-is-a-good-roas", title: "What Is a Good ROAS?", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/max-cpa-guide", title: "How to Set Target CPA", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/google-ads-break-even", title: "Google Ads Break-even ROAS", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/roas-vs-roi-vs-cpa", title: "ROAS vs ROI vs CPA", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/faq", title: FAQ_PAGE_TITLE, changefreq: "monthly" as const, priority: 0.7 },
  { href: "/about", title: "About Ad Breakeven", changefreq: "yearly" as const, priority: 0.5 },
  { href: "/privacy", title: "Privacy Policy", changefreq: "yearly" as const, priority: 0.3 },
  { href: "/terms", title: "Terms of Use", changefreq: "yearly" as const, priority: 0.3 },
] as const;

export const TOOL_LINKS = [
  {
    href: "/break-even-roas-calculator",
    title: "Break-even ROAS Calculator",
    description:
      "Minimum ROAS after margin and fixed costs — ecommerce or lead gen, with formula and next steps.",
  },
  {
    href: "/max-cpa-calculator",
    title: "Max CPA Calculator",
    description:
      "Highest CPA (ecommerce) or cost per lead (lead gen) from margin, AOV or deal value, and close rate.",
  },
  {
    href: "/max-cpc-calculator",
    title: "Max CPC Calculator",
    description:
      "Break-even CPC from margin, max CPA, and conversion rate — bid planning for Google and Meta ads.",
  },
  {
    href: "/ad-profit-calculator",
    title: "Ad Profit Calculator",
    description:
      "Net ad profit after spend and costs, compared to your break-even ROAS — with tailored next steps.",
  },
] as const;

export const GUIDE_DESCRIPTIONS: Record<string, string> = {
  "/how-to-calculate-break-even-roas":
    "Break-even ROAS formula, step-by-step example, ecommerce and lead gen",
  "/what-is-a-good-roas":
    "Good ROAS benchmarks by margin — why generic 3× or 4× targets mislead",
  "/max-cpa-guide":
    "How to set target CPA for ecommerce and lead gen with worked examples",
  "/google-ads-break-even":
    "Google Ads break-even ROAS and target ROAS (tROAS) from margin",
  "/roas-vs-roi-vs-cpa":
    "Compare ROAS, ROI, CPA, and CPC — when to use each for ad profitability",
  "/faq": "Answers on break-even ROAS, max CPA, CPC, ad profit, and lead gen",
  "/about": "About Ad Breakeven — mission, methodology, and disclaimer",
};

export const GUIDE_LINKS = ALL_PAGES.filter(
  (page) =>
    page.href !== "/" &&
    !TOOL_LINKS.some((tool) => tool.href === page.href)
);

export function pageTitle(title: string) {
  return title;
}

export function openGraphForPage(options: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    title: options.title,
    description: options.description,
    url: options.path,
    type: "website" as const,
  };
}
