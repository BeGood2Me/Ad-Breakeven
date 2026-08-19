import { SITE_URL } from "@/lib/site";

export const WIDGET_SCRIPT_PATH = "/widgets/widget.js";

export type WidgetDefinition = {
  id: string;
  title: string;
  description: string;
  calculatorPath: string;
  iframePath: string;
  iframeHeight: number;
};

export const WIDGET_CATALOG: WidgetDefinition[] = [
  {
    id: "break-even",
    title: "Break-even ads calculator",
    description: "Break-even ROAS, max CPA, max CPC, and sales volume from margin.",
    calculatorPath: "/",
    iframePath: "/embed/break-even",
    iframeHeight: 640,
  },
  {
    id: "break-even-roas",
    title: "Break-even ROAS calculator",
    description: "Minimum profitable ROAS from AOV and gross margin.",
    calculatorPath: "/break-even-roas-calculator",
    iframePath: "/embed/break-even-roas",
    iframeHeight: 520,
  },
  {
    id: "target-roas",
    title: "Target ROAS calculator",
    description: "Margin-based ROAS floor for Google Ads and Meta tROAS bidding.",
    calculatorPath: "/target-roas-calculator",
    iframePath: "/embed/target-roas",
    iframeHeight: 520,
  },
  {
    id: "max-cpa",
    title: "Max CPA calculator",
    description: "Highest cost per acquisition from contribution margin.",
    calculatorPath: "/max-cpa-calculator",
    iframePath: "/embed/max-cpa",
    iframeHeight: 520,
  },
  {
    id: "max-cpc",
    title: "Max CPC calculator",
    description: "Break-even CPC from max CPA and conversion rate.",
    calculatorPath: "/max-cpc-calculator",
    iframePath: "/embed/max-cpc",
    iframeHeight: 560,
  },
  {
    id: "ad-profit",
    title: "Ad profit calculator",
    description: "Net ad profit, ROAS, and break-even comparison after spend.",
    calculatorPath: "/ad-profit-calculator",
    iframePath: "/embed/ad-profit",
    iframeHeight: 620,
  },
];

export function widgetScriptTag(siteUrl: string = SITE_URL) {
  return `<script src="${siteUrl}${WIDGET_SCRIPT_PATH}" async></script>`;
}

export function widgetContainerTag(id: string) {
  return `<div data-adbreakeven-widget="${id}"></div>`;
}

export function getWidgetById(id: string) {
  return WIDGET_CATALOG.find((widget) => widget.id === id);
}
