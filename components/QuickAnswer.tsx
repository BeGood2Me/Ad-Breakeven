import type { ReactNode } from "react";

interface QuickAnswerProps {
  children: ReactNode;
  title?: string;
}

export function QuickAnswer({ children, title = "Quick answer" }: QuickAnswerProps) {
  return (
    <section
      className="content-section quick-answer"
      aria-labelledby="quick-answer"
    >
      <h2 id="quick-answer">{title}</h2>
      <div className="quick-answer__body">{children}</div>
    </section>
  );
}
