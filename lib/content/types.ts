export interface ContentAuthor {
  name: string;
  organization?: string;
  role?: string;
  bio?: string;
  url?: string;
}

export interface ContentSeo {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

export interface ContentFaqItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  before?: string;
  linkText: string;
  href: string;
  after?: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "formula"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "link"; before?: string; linkText: string; href: string; after?: string };

export interface ContentSection {
  id: string;
  heading: string;
  blocks: ContentBlock[];
}

export interface BlogPostJson {
  slug: string;
  type: "blog";
  pillar: string;
  publishedAt: string;
  updatedAt: string;
  seo: ContentSeo;
  author: ContentAuthor;
  headline: string;
  intro: string;
  tags: string[];
  sections: ContentSection[];
  faq: ContentFaqItem[];
  relatedTools: RelatedLink[];
}

export interface PillarPageJson {
  slug: string;
  type: "pillar";
  publishedAt: string;
  updatedAt: string;
  seo: ContentSeo;
  headline: string;
  intro: string;
  sections: ContentSection[];
  faq: ContentFaqItem[];
  relatedTools: RelatedLink[];
}

export interface BlogManifestEntry {
  slug: string;
  path: string;
  pillar: string;
  headline: string;
  intro: string;
  publishedAt: string;
  updatedAt: string;
  seo: ContentSeo;
  tags: string[];
  relatedPostSlugs: string[];
}

export interface PillarManifestEntry {
  slug: string;
  path: string;
  headline: string;
  intro: string;
  publishedAt: string;
  updatedAt: string;
  seo: ContentSeo;
  blogSlugs: string[];
}
