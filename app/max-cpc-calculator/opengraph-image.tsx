import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt("Max CPC Calculator");
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Max CPC Calculator",
    "Break-even CPC from margin, CPA, and conversion rate"
  );
}
