import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { getPillarPage } from "@/lib/content/load-content";

export const alt = "Ad Breakeven Topic Hub";
export const size = ogImageSize;
export const contentType = ogImageContentType;

interface OpenGraphImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const pillar = getPillarPage(slug);
  return createOpenGraphImage(pillar.headline, pillar.intro);
}
