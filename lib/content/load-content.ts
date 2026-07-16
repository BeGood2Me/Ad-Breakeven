import fs from "fs";
import path from "path";
import {
  BLOG_BY_SLUG,
  BLOG_INDEX,
  PILLAR_BY_SLUG,
  PILLAR_INDEX,
} from "@/generated/content-manifest";
import type { BlogPostJson, PillarPageJson } from "@/lib/content/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export function getAllBlogSlugs(): string[] {
  return BLOG_INDEX.map((entry) => entry.slug);
}

export function getAllPillarSlugs(): string[] {
  return PILLAR_INDEX.map((entry) => entry.slug);
}

export function getBlogPost(slug: string): BlogPostJson & {
  relatedPostSlugs: string[];
} {
  const manifest = BLOG_BY_SLUG[slug as keyof typeof BLOG_BY_SLUG];
  if (!manifest) {
    throw new Error(`Unknown blog slug: ${slug}`);
  }
  const post = readJsonFile<BlogPostJson>(
    path.join(CONTENT_ROOT, "blog", `${slug}.json`)
  );
  return { ...post, relatedPostSlugs: [...manifest.relatedPostSlugs] };
}

export function getPillarPage(slug: string): PillarPageJson & {
  blogSlugs: string[];
} {
  const manifest = PILLAR_BY_SLUG[slug as keyof typeof PILLAR_BY_SLUG];
  if (!manifest) {
    throw new Error(`Unknown pillar slug: ${slug}`);
  }
  const pillar = readJsonFile<PillarPageJson>(
    path.join(CONTENT_ROOT, "pillars", `${slug}.json`)
  );
  return { ...pillar, blogSlugs: [...manifest.blogSlugs] };
}

export function getBlogIndex() {
  return BLOG_INDEX;
}

export function getPillarIndex() {
  return PILLAR_INDEX;
}

export function getContentSitemapEntries() {
  const blogEntries = BLOG_INDEX.map((entry) => ({
    href: entry.path,
    title: entry.headline,
    changefreq: "monthly" as const,
    priority: 0.8,
    lastModified: entry.updatedAt,
  }));

  const pillarEntries = PILLAR_INDEX.map((entry) => ({
    href: entry.path,
    title: entry.headline,
    changefreq: "monthly" as const,
    priority: 0.85,
    lastModified: entry.updatedAt,
  }));

  return [
    {
      href: "/blog",
      title: "Ad Breakeven Blog",
      changefreq: "weekly" as const,
      priority: 0.75,
    },
    ...pillarEntries,
    ...blogEntries,
  ];
}
