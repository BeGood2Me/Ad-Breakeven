export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** SEO-friendly filename slug for Open Graph images in /images/og/ */
export function ogImageFileSlug(pagePath: string): string {
  const segment =
    pagePath === "/" ? "home" : pagePath.replace(/^\//, "").replace(/\//g, "-");
  return `ad-breakeven-${segment}`;
}

/** Public URL path crawlers and meta tags should reference */
export function ogImagePublicPath(pagePath: string): string {
  return `/images/og/${ogImageFileSlug(pagePath)}.png`;
}

/** Internal Next.js route that generates the PNG */
export function ogImageSourcePath(pagePath: string): string {
  return pagePath === "/" ? "/opengraph-image" : `${pagePath}/opengraph-image`;
}

export function ogImageAlt(title: string): string {
  return `${title} — Ad Breakeven`;
}

export function ogImageMetadata(pagePath: string, title: string) {
  return {
    url: ogImagePublicPath(pagePath),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: ogImageAlt(title),
    type: "image/png" as const,
  };
}
