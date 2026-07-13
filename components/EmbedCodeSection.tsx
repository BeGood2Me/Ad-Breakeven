"use client";

import { useState } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface EmbedCodeSectionProps {
  embedPath: string;
  title: string;
}

export default function EmbedCodeSection({
  embedPath,
  title,
}: EmbedCodeSectionProps) {
  const [copied, setCopied] = useState(false);
  const embedUrl = `${SITE_URL}${embedPath}`;
  const code = `<iframe src="${embedUrl}" width="100%" height="520" style="border:0;max-width:480px;" title="${title} — ${SITE_NAME}" loading="lazy"></iframe>`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="content-section embed-section" aria-labelledby="embed-heading">
      <h2 id="embed-heading">Embed this calculator</h2>
      <p>
        Add this free calculator to your blog or site. Attribution link is included
        in the embed automatically.
      </p>
      <pre className="embed-code-block">
        <code>{code}</code>
      </pre>
      <button type="button" className="calc-btn calc-btn-primary" onClick={() => void handleCopy()}>
        {copied ? "Copied!" : "Copy embed code"}
      </button>
    </section>
  );
}
