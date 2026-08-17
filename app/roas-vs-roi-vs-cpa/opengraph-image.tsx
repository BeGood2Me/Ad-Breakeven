import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt("ROAS vs ROI vs CPA vs CPC");
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "ROAS vs ROI vs CPA vs CPC",
    "Which paid media metric to use — and how each ties to break-even profit"
  );
}
