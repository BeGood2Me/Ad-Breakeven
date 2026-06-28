import type { MetadataRoute } from "next";
import { ALL_PAGES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGES.map(({ href, changefreq, priority }) => ({
    url: `${SITE_URL}${href}`,
    changeFrequency: changefreq,
    priority,
  }));
}
