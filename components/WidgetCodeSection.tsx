"use client";

import { useState } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  widgetContainerTag,
  type WidgetDefinition,
} from "@/lib/widgets/catalog";

interface WidgetCodeSectionProps {
  widget: WidgetDefinition;
  showIframe?: boolean;
}

export default function WidgetCodeSection({
  widget,
  showIframe = true,
}: WidgetCodeSectionProps) {
  const [copiedWidget, setCopiedWidget] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const embedUrl = `${SITE_URL}${widget.iframePath}`;
  const widgetCode = widgetContainerTag(widget.id);
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="${widget.iframeHeight}" style="border:0;max-width:480px;" title="${widget.title} — ${SITE_NAME}" loading="lazy"></iframe>`;

  async function copy(text: string, which: "widget" | "iframe") {
    try {
      await navigator.clipboard.writeText(text);
      if (which === "widget") {
        setCopiedWidget(true);
        window.setTimeout(() => setCopiedWidget(false), 2000);
      } else {
        setCopiedIframe(true);
        window.setTimeout(() => setCopiedIframe(false), 2000);
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      className="content-section widget-catalog-item"
      aria-labelledby={`widget-${widget.id}`}
    >
      <h2 id={`widget-${widget.id}`}>{widget.title}</h2>
      <p>{widget.description}</p>
      <p>
        <a
          href={widget.iframePath}
          target="_blank"
          rel="noopener noreferrer"
          className="widget-preview-link"
        >
          Preview live embed
        </a>
      </p>

      <h3 className="widget-code-heading">Widget container</h3>
      <p>Place this where the calculator should appear (after the setup script).</p>
      <pre className="embed-code-block">
        <code>{widgetCode}</code>
      </pre>
      <button
        type="button"
        className="calc-btn calc-btn-primary"
        onClick={() => void copy(widgetCode, "widget")}
      >
        {copiedWidget ? "Copied!" : "Copy container code"}
      </button>

      {showIframe ? (
        <>
          <h3 className="widget-code-heading">Iframe embed</h3>
          <p>Full calculator UI in an iframe.</p>
          <pre className="embed-code-block">
            <code>{iframeCode}</code>
          </pre>
          <button
            type="button"
            className="calc-btn calc-btn-primary"
            onClick={() => void copy(iframeCode, "iframe")}
          >
            {copiedIframe ? "Copied!" : "Copy iframe code"}
          </button>
        </>
      ) : null}
    </section>
  );
}
