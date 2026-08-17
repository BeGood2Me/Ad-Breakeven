import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt("Max CPA Calculator");
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Max CPA Calculator",
    "Highest cost per acquisition before ads lose money"
  );
}
