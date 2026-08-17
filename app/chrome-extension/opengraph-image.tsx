import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt("Ad Breakeven Chrome extension");
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Ad Breakeven Chrome extension",
    "Break-even ROAS, max CPA, and max CPC in a popup — no account"
  );
}
