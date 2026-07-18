import Link from "next/link";
import { TOOL_LINKS } from "@/lib/site";

const HOME_TOOL_LABELS: Record<string, string> = {
  "/break-even-roas-calculator": "ROAS",
  "/max-cpa-calculator": "CPA",
  "/max-cpc-calculator": "CPC",
  "/ad-profit-calculator": "Profit",
};

export function ToolsSection() {
  return (
    <section className="content-section home-tools" aria-labelledby="tools-heading">
      <h2 id="tools-heading">More calculators</h2>
      <div className="tools-grid tools-grid--compact">
        {TOOL_LINKS.map(({ href, title }) => (
          <Link key={href} href={href} className="tool-card tool-card--compact">
            <span className="tool-card-metric">
              {HOME_TOOL_LABELS[href] ?? title}
            </span>
            <span className="tool-card-title">{title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
