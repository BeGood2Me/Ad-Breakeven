"use client";

import Link from "next/link";
import {
  buildNextStepsLines,
  NEXT_STEPS_HEADINGS,
  type NextStepsProps,
} from "@/lib/next-steps";

export type { NextStepsProps };

function renderStepText(text: string) {
  const linkPatterns: { pattern: RegExp; href: string; label: string }[] = [
    {
      pattern: /Ad Profit Calculator/,
      href: "/ad-profit-calculator",
      label: "Ad Profit Calculator",
    },
    {
      pattern: /Break-even Ads Calculator/,
      href: "/",
      label: "Break-even Ads Calculator",
    },
    {
      pattern: /Max CPC Calculator/,
      href: "/max-cpc-calculator",
      label: "Max CPC Calculator",
    },
    {
      pattern: /Break-even ROAS Calculator/,
      href: "/break-even-roas-calculator",
      label: "Break-even ROAS Calculator",
    },
  ];

  for (const { pattern, href, label } of linkPatterns) {
    if (pattern.test(text)) {
      const [before, after] = text.split(label);
      const boldPrefix = before.match(/^([^—]+ —)/);
      if (boldPrefix) {
        return (
          <>
            <strong>{boldPrefix[1].replace(/ —$/, "")}</strong> —{" "}
            {before.slice(boldPrefix[1].length)}
            <Link href={href}>{label}</Link>
            {after}
          </>
        );
      }
      return (
        <>
          {before}
          <Link href={href}>{label}</Link>
          {after}
        </>
      );
    }
  }

  const dashIndex = text.indexOf(" — ");
  if (dashIndex > 0 && dashIndex < 40) {
    return (
      <>
        <strong>{text.slice(0, dashIndex)}</strong>
        {text.slice(dashIndex)}
      </>
    );
  }

  return text;
}

export function NextStepsSection(props: NextStepsProps) {
  const steps = buildNextStepsLines(props);
  const headingId = `next-steps-${props.variant}`;

  return (
    <div className="next-steps" aria-labelledby={headingId}>
      <h3 id={headingId}>{NEXT_STEPS_HEADINGS[props.variant]}</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{renderStepText(step)}</li>
        ))}
      </ol>
    </div>
  );
}
