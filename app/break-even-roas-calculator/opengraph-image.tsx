import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt("Break-even ROAS Calculator");
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Break-even ROAS Calculator",
    "Minimum profitable ROAS after margin — ecommerce & lead gen"
  );
}
