import type { ContentFaqItem } from "@/lib/content/types";

export function ContentFaqSection({ faq }: { faq: ContentFaqItem[] }) {
  if (faq.length === 0) return null;

  return (
    <section className="content-section" aria-labelledby="content-faq-heading">
      <h2 id="content-faq-heading">Frequently asked questions</h2>
      <dl className="content-faq">
        {faq.map(({ question, answer }) => (
          <div key={question} className="content-faq-item">
            <dt>{question}</dt>
            <dd>{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
