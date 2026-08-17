import { BLOG_INDEX, PILLAR_INDEX } from "../generated/content-manifest";
import { ALL_PAGES } from "./site";
import { ogImagePublicPath, ogImageSourcePath } from "./og-image-paths";

/** Map SEO-friendly /images/og/*.png URLs to Next opengraph-image routes */
export function buildOgImageRewrites(): { source: string; destination: string }[] {
  const paths = new Set<string>(["/blog"]);

  for (const { href } of ALL_PAGES) {
    paths.add(href);
  }
  for (const { path } of BLOG_INDEX) {
    paths.add(path);
  }
  for (const { path } of PILLAR_INDEX) {
    paths.add(path);
  }

  return [...paths].map((path) => ({
    source: ogImagePublicPath(path),
    destination: ogImageSourcePath(path),
  }));
}

export function buildImageAssetRewrites(): { source: string; destination: string }[] {
  return [
    {
      source: "/icon.svg",
      destination: "/images/ad-breakeven-logo.svg",
    },
  ];
}
