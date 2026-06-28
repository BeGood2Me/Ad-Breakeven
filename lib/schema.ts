import { SITE_NAME, SITE_URL } from "./site";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Free break-even calculators for paid media: ROAS, CPA, CPC, and ad profit.",
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function softwareApplicationSchema(options: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Break-even ROAS",
    description:
      "Calculate the minimum ROAS your ads need to break even after margin, costs, and fees — for ecommerce and lead gen campaigns.",
    url: `${SITE_URL}/how-to-calculate-break-even-roas`,
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    tool: {
      "@type": "HowToTool",
      name: "Break-even ROAS Calculator",
      url: `${SITE_URL}/break-even-roas-calculator`,
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find contribution per order",
        text: "Contribution = (value × gross margin %) − fixed cost. Ecommerce: value is AOV per sale. Lead gen: use customer value × close rate as expected revenue per lead.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Calculate break-even ROAS",
        text: "Break-even ROAS = AOV ÷ contribution per order. Example: $90 AOV with $34.50 contribution = 2.61× break-even ROAS.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Compare to campaign ROAS",
        text: "If platform ROAS is below your break-even figure, the campaign loses money after product costs — even when revenue looks strong.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Set targets in your ad platform",
        text: "Use break-even ROAS as your minimum efficiency floor. Ecommerce: max CPA = contribution per sale. Lead gen: max cost per lead = contribution per lead; CRM closed-deal cap = cap ÷ close rate.",
      },
    ],
  };
}

export function articleSchema(options: {
  headline: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.headline,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
