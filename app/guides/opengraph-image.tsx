import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt("Ad Breakeven guides");
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Ad Breakeven Guides",
    "ROAS, CPA, CPC, and paid media profitability — with free calculators"
  );
}
