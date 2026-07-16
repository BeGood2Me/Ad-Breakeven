import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { BlogCrossLinks } from "@/components/BlogCrossLinks";
import { ContentFaqSection } from "@/components/ContentAuthorFaq";
import { RelatedTools } from "@/components/RelatedTools";
import { RenderBlocks } from "@/lib/content/render-blocks";
import {
  getAllBlogSlugs,
  getBlogPost,
} from "@/lib/content/load-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";
import { PILLAR_BY_SLUG } from "@/generated/content-manifest";
import { SITE_NAME } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return buildPageMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: post.seo.canonical,
    keywords: post.seo.keywords,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    ogType: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const pillar = PILLAR_BY_SLUG[post.pillar as keyof typeof PILLAR_BY_SLUG];
  const path = post.seo.canonical;

  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          ...(pillar
            ? [{ name: pillar.headline, path: pillar.path }]
            : []),
          { name: post.headline, path },
        ])}
      />
      <JsonLd
        data={blogPostingSchema({
          headline: post.headline,
          description: post.seo.description,
          path,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          keywords: post.seo.keywords,
          authorName: SITE_NAME,
        })}
      />
      {post.faq.length > 0 && <JsonLd data={faqSchema(post.faq)} />}

      <header className="blog-post-header">
        {pillar && (
          <p className="blog-post-topic">
            <Link href={pillar.path}>{pillar.headline}</Link>
          </p>
        )}
        <h1>{post.headline}</h1>
        <p className="intro">{post.intro}</p>
        <p className="blog-post-meta">
          Published {post.publishedAt} by {SITE_NAME}
          {post.updatedAt !== post.publishedAt &&
            ` · Updated ${post.updatedAt}`}
        </p>
      </header>

      {post.sections.map((section) => (
        <section
          key={section.id}
          className="content-section"
          aria-labelledby={section.id}
        >
          <h2 id={section.id}>{section.heading}</h2>
          <RenderBlocks blocks={section.blocks} />
        </section>
      ))}

      <ContentFaqSection faq={post.faq} />

      {post.relatedTools.length > 0 && (
        <RelatedTools links={post.relatedTools} />
      )}

      <BlogCrossLinks
        currentSlug={post.slug}
        relatedSlugs={post.relatedPostSlugs}
        pillarSlug={post.pillar}
      />
    </article>
  );
}
