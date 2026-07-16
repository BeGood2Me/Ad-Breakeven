import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { PillarBlogList } from "@/components/BlogCrossLinks";
import { ContentFaqSection } from "@/components/ContentAuthorFaq";
import { RelatedTools } from "@/components/RelatedTools";
import { RenderBlocks } from "@/lib/content/render-blocks";
import {
  getAllPillarSlugs,
  getPillarPage,
} from "@/lib/content/load-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPillarSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarPage(slug);
  return buildPageMetadata({
    title: pillar.seo.title,
    description: pillar.seo.description,
    path: pillar.seo.canonical,
    keywords: pillar.seo.keywords,
    publishedTime: pillar.publishedAt,
    modifiedTime: pillar.updatedAt,
    ogType: "article",
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const pillar = getPillarPage(slug);
  const path = pillar.seo.canonical;

  return (
    <article className="page-content">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: pillar.headline, path },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: pillar.headline,
          description: pillar.seo.description,
          path,
          datePublished: pillar.publishedAt,
          dateModified: pillar.updatedAt,
        })}
      />
      {pillar.faq.length > 0 && <JsonLd data={faqSchema(pillar.faq)} />}

      <h1>{pillar.headline}</h1>
      <p className="intro">{pillar.intro}</p>

      {pillar.sections.map((section) => (
        <section
          key={section.id}
          className="content-section"
          aria-labelledby={section.id}
        >
          <h2 id={section.id}>{section.heading}</h2>
          <RenderBlocks blocks={section.blocks} />
        </section>
      ))}

      <PillarBlogList blogSlugs={pillar.blogSlugs} />

      <ContentFaqSection faq={pillar.faq} />

      {pillar.relatedTools.length > 0 && (
        <RelatedTools links={pillar.relatedTools} />
      )}
    </article>
  );
}
