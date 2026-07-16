import Link from "next/link";
import { BLOG_BY_SLUG, PILLAR_BY_SLUG } from "@/generated/content-manifest";

interface BlogCrossLinksProps {
  currentSlug: string;
  relatedSlugs: string[];
  pillarSlug: string;
}

export function BlogCrossLinks({
  currentSlug,
  relatedSlugs,
  pillarSlug,
}: BlogCrossLinksProps) {
  const pillar = PILLAR_BY_SLUG[pillarSlug as keyof typeof PILLAR_BY_SLUG];
  const related = relatedSlugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => BLOG_BY_SLUG[slug as keyof typeof BLOG_BY_SLUG])
    .filter(Boolean);

  if (!pillar && related.length === 0) return null;

  return (
    <section className="related-links" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading">Related reading</h2>
      <ul>
        {pillar && (
          <li>
            Part of the{" "}
            <Link href={pillar.path}>{pillar.headline}</Link> topic cluster.
          </li>
        )}
        {related.map((post) => (
          <li key={post.slug}>
            <Link href={post.path}>{post.headline}</Link> — {post.intro}
          </li>
        ))}
      </ul>
    </section>
  );
}

interface PillarBlogListProps {
  blogSlugs: string[];
}

export function PillarBlogList({ blogSlugs }: PillarBlogListProps) {
  const posts = blogSlugs
    .map((slug) => BLOG_BY_SLUG[slug as keyof typeof BLOG_BY_SLUG])
    .filter(Boolean);

  if (posts.length === 0) return null;

  return (
    <section className="content-section" aria-labelledby="cluster-posts-heading">
      <h2 id="cluster-posts-heading">Articles in this topic</h2>
      <ul className="blog-cluster-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={post.path}>{post.headline}</Link>
            <p className="blog-cluster-excerpt">{post.intro}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
