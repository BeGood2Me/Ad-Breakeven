"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/site";
import { widgetScriptTag } from "@/lib/widgets/catalog";

export default function WidgetSetupSection() {
  const [copied, setCopied] = useState(false);
  const scriptCode = widgetScriptTag(SITE_URL);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(scriptCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="content-section widget-section" aria-labelledby="widget-setup">
      <h2 id="widget-setup">Setup</h2>
      <p>
        Add this script once per page — before the closing <code>&lt;/body&gt;</code>{" "}
        tag is fine:
      </p>
      <pre className="embed-code-block">
        <code>{scriptCode}</code>
      </pre>
      <button
        type="button"
        className="calc-btn calc-btn-primary"
        onClick={() => void handleCopy()}
      >
        {copied ? "Copied!" : "Copy setup script"}
      </button>
      <p>
        Using more than one calculator? Add a container for each (below) — do not
        add the script again.
      </p>
    </section>
  );
}
