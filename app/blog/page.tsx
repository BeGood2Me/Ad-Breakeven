import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getBlogIndex, getPillarIndex } from "@/lib/content/load-content";
import { PILLAR_BY_SLUG } from "@/generated/content-manifest";
import { SITE_NAME } from "@/lib/site";

const PAGE = {
  title: "Ad Breakeven Blog | ROAS, CPA, CPC & Ad Profit Guides",
  description:
    "SEO guides on break-even ROAS, max CPA, max CPC, and ad profitability for ecommerce and lead gen — with free calculators and margin-based examples.",
  path: "/blog",
};

export const metadata: Metadata = buildPageMetadata(PAGE);

export default function BlogIndexPage() {
  const posts = getBlogIndex();
  const pillars = getPillarIndex();

  return (
    <article className="page-content">
      <h1>Ad Breakeven Blog</h1>
      <p className="intro">
        Practical paid-media profitability guides — break-even ROAS, acquisition
        caps, bidding, and ad profit — organized by topic cluster. Published by
        {SITE_NAME}. Every article links to free calculators you can use immediately.
      </p>

      <section className="content-section" aria-labelledby="topics-heading">
        <h2 id="topics-heading">Browse by topic</h2>
        <ul className="blog-topic-grid">
          {pillars.map((pillar) => (
            <li key={pillar.slug}>
              <Link href={pillar.path}>{pillar.headline}</Link>
              <p>{pillar.intro}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section" aria-labelledby="posts-heading">
        <h2 id="posts-heading">All articles</h2>
        <ul className="blog-index-list">
          {posts.map((post) => {
            const pillar =
              PILLAR_BY_SLUG[post.pillar as keyof typeof PILLAR_BY_SLUG];
            return (
              <li key={post.slug}>
                <Link href={post.path}>{post.headline}</Link>
                {pillar && (
                  <span className="blog-index-topic">
                    {" "}
                    ·{" "}
                    <Link href={pillar.path}>{pillar.headline}</Link>
                  </span>
                )}
                <p className="blog-index-excerpt">{post.intro}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
