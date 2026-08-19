import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import WidgetSetupSection from "@/components/WidgetSetupSection";
import WidgetCodeSection from "@/components/WidgetCodeSection";
import { buildPageMetadata } from "@/lib/page-metadata";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE_NAME, WIDGETS_PAGE_PATH } from "@/lib/site";
import { WIDGET_CATALOG } from "@/lib/widgets/catalog";

const PAGE = {
  title: "Free Widgets | Ad Breakeven Calculators for Your Site",
  description:
    "Free embeddable break-even ROAS, CPA, CPC, and ad profit calculators. JavaScript widgets and iframe embeds for blogs and agency sites.",
  path: WIDGETS_PAGE_PATH,
};

const PAGE_FAQ = [
  {
    question: "Are the widgets free?",
    answer:
      "Yes. Paste the widget or iframe code on your blog, agency site, or tool. No signup required.",
  },
  {
    question: "Does the widget create a backlink?",
    answer:
      "Yes. The JavaScript widget renders a visible link to adbreakeven.com on your page. The iframe embed includes attribution inside the frame.",
  },
  {
    question: "Which embed should I use?",
    answer:
      "Use the JavaScript widget for a lightweight calculator on your page. Use the iframe when you want the full calculator UI from adbreakeven.com.",
  },
  {
    question: "Which calculators are available?",
    answer:
      "Break-even ads hub, break-even ROAS, target ROAS, max CPA, max CPC, and ad profit — the same tools as the main site calculators.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function WidgetsPage() {
  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Free Widgets", path: PAGE.path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: "Free Ad Breakeven widgets",
          description: PAGE.description,
          path: PAGE.path,
        })}
      />
      <JsonLd data={faqSchema([...PAGE_FAQ])} />

      <h1>Free widgets</h1>
      <p className="intro">
        Embed {SITE_NAME} calculators on your site with one paste. Each widget
        uses the same formulas as the{" "}
        <Link href="/break-even-roas-calculator">calculators</Link> on this site.
        Load the script once, then add a container for each calculator you need.
      </p>

      <WidgetSetupSection />

      {WIDGET_CATALOG.map((widget) => (
        <WidgetCodeSection key={widget.id} widget={widget} />
      ))}

      <section className="content-section" aria-labelledby="terms">
        <h2 id="terms">Terms</h2>
        <p>
          Widgets are free for public sites. Do not remove the attribution line
          from the JavaScript widget. See <Link href="/terms">Terms of Use</Link>{" "}
          and <Link href="/privacy">Privacy Policy</Link>. Calculator output is
          informational only — not financial, tax, or legal advice.
        </p>
      </section>

      <section className="content-section" aria-labelledby="faq">
        <h2 id="faq">FAQ</h2>
        <ul className="faq-list">
          {PAGE_FAQ.map((item) => (
            <li key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
