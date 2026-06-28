import Link from "next/link";

interface RelatedLink {
  before?: string;
  linkText: string;
  href: string;
  after?: string;
}

interface RelatedToolsProps {
  links: RelatedLink[];
}

export function RelatedTools({ links }: RelatedToolsProps) {
  return (
    <section className="related-links" aria-labelledby="related-heading">
      <h2 id="related-heading">Related Tools</h2>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            {link.before}
            <Link href={link.href}>{link.linkText}</Link>
            {link.after}
          </li>
        ))}
      </ul>
    </section>
  );
}
