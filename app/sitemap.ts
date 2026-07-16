import type { MetadataRoute } from "next";
import { getContentSitemapEntries } from "@/lib/content/load-content";
import { ALL_PAGES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ALL_PAGES.map(({ href, changefreq, priority }) => ({
    url: `${SITE_URL}${href}`,
    changeFrequency: changefreq,
    priority,
  }));

  const contentPages = getContentSitemapEntries().map((entry) => ({
    url: `${SITE_URL}${entry.href}`,
    changeFrequency: entry.changefreq,
    priority: entry.priority,
    ...("lastModified" in entry && entry.lastModified
      ? { lastModified: new Date(entry.lastModified) }
      : {}),
  }));

  return [...staticPages, ...contentPages];
}
