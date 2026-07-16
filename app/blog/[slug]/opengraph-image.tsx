import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { getBlogPost } from "@/lib/content/load-content";

export const alt = "Ad Breakeven Blog";
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
