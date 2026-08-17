import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";
import { getBlogPost } from "@/lib/content/load-content";

export const alt = ogImageAlt("Ad Breakeven blog post");
export const size = ogImageSize;
export const contentType = ogImageContentType;

interface OpenGraphImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return createOpenGraphImage(post.headline, post.intro);
}
