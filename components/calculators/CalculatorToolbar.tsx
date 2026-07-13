"use client";

import { useEffect, useRef, useState } from "react";
import { copyShareUrl } from "@/lib/calculator-params";

interface CalculatorToolbarProps {
  onReset: () => void;
  onTryExample?: () => void;
  copyText: string | null;
  shareParams: Record<string, string>;
  shareEnabled: boolean;
}

export default function CalculatorToolbar({
  onReset,
  onTryExample,
  copyText,
  shareParams,
  shareEnabled,
}: CalculatorToolbarProps) {
  const [shareLabel, setShareLabel] = useState("Share link");
  const [copyLabel, setCopyLabel] = useState("Copy results");
  const copyTimeoutRef = useRef<number | undefined>(undefined);
  const shareTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      if (shareTimeoutRef.current) window.clearTimeout(shareTimeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopyLabel("Copied!");
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(
        () => setCopyLabel("Copy results"),
        2000
      );
    } catch {
      /* ignore */
    }
  }

  async function handleShare() {
    if (!shareEnabled) return;
    const copied = await copyShareUrl(shareParams);
    if (!copied) return;
    setShareLabel("Link copied!");
    if (shareTimeoutRef.current) window.clearTimeout(shareTimeoutRef.current);
    shareTimeoutRef.current = window.setTimeout(
      () => setShareLabel("Share link"),
      2000
    );
  }

  return (
    <div className="calculator-actions">
      {onTryExample && (
        <button type="button" className="calc-btn" onClick={() => onTryExample()}>
          Try example
        </button>
      )}
      <button type="button" className="calc-btn" onClick={() => onReset()}>
        Reset
      </button>
      <button
        type="button"
        className="calc-btn"
        onClick={() => void handleShare()}
        disabled={!shareEnabled}
      >
        {shareLabel}
      </button>
      <button
        type="button"
        className="calc-btn calc-btn-primary"
        onClick={() => void handleCopy()}
        disabled={!copyText}
      >
        {copyLabel}
      </button>
    </div>
  );
}

interface CalculatorResultsProps {
  title: string;
  ready: boolean;
  loading?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function CalculatorResults({
  title,
  ready,
  loading = false,
  emptyMessage = "Enter your numbers above to see results.",
  children,
}: CalculatorResultsProps) {
  if (loading) {
    return (
      <div className="results results-empty" aria-busy="true">
        <h2>{title}</h2>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="results results-empty">
        <h2>{title}</h2>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="results">
      <h2>{title}</h2>
      <div aria-live="polite" aria-atomic="true">
        {children}
      </div>
    </div>
  );
}
