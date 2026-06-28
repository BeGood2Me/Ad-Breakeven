export const SITE_URL = "https://adbreakeven.com";
export const SITE_NAME = "Ad Break-even";
export const FAQ_PAGE_TITLE = "Ad Break-even FAQ";
export const SITE_DESCRIPTION =
  "Find break-even ROAS, max CPA, max CPC, and ad profit for ecommerce and lead gen. Free calculators with shareable results and next steps.";

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Break-even Calculator", shortLabel: "Break-even" },
  { href: "/break-even-roas-calculator", label: "ROAS Calculator", shortLabel: "ROAS" },
  { href: "/max-cpa-calculator", label: "Max CPA", shortLabel: "Max CPA" },
  { href: "/max-cpc-calculator", label: "Max CPC", shortLabel: "Max CPC" },
] as const;

export const MORE_NAV_LINKS = [
  { href: "/ad-profit-calculator", label: "Ad Profit Calculator", shortLabel: "Ad Profit" },
  { href: "/how-to-calculate-break-even-roas", label: "ROAS Guide", shortLabel: "ROAS Guide" },
  { href: "/roas-vs-roi-vs-cpa", label: "ROAS vs ROI", shortLabel: "Compare" },
  { href: "/faq", label: "FAQ", shortLabel: "FAQ" },
] as const;

export const NAV_LINKS = [...PRIMARY_NAV_LINKS, ...MORE_NAV_LINKS] as const;

export const ALL_PAGES = [
  { href: "/", title: "Break-even Ads Calculator", changefreq: "weekly" as const, priority: 1.0 },
  { href: "/break-even-roas-calculator", title: "Break-even ROAS Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/max-cpa-calculator", title: "Max CPA Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/max-cpc-calculator", title: "Max CPC Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/ad-profit-calculator", title: "Ad Profit Calculator", changefreq: "monthly" as const, priority: 0.9 },
  { href: "/how-to-calculate-break-even-roas", title: "How to Calculate Break-even ROAS", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/roas-vs-roi-vs-cpa", title: "ROAS vs ROI vs CPA", changefreq: "monthly" as const, priority: 0.85 },
  { href: "/faq", title: FAQ_PAGE_TITLE, changefreq: "monthly" as const, priority: 0.7 },
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
