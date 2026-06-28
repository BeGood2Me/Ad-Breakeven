import Link from "next/link";
import { TOOL_LINKS } from "@/lib/site";

export function ToolsSection() {
  return (
    <section className="content-section" aria-labelledby="tools-heading">
      <h2 id="tools-heading">Calculators &amp; Tools</h2>
      <p>
        Use these free tools to find break-even thresholds for your ad
        campaigns. Each calculator focuses on a different metric but uses the
        same underlying margin and conversion logic.
      </p>
      <div className="tools-grid">
        {TOOL_LINKS.map(({ href, title, description }) => (
          <Link key={href} href={href} className="tool-card">
            <h3>{title}</h3>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
