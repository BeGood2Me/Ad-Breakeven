import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = "How to Calculate Break-even ROAS";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "How to Calculate Break-even ROAS",
    "Formula, step-by-step example & free calculator — ecommerce & lead gen"
  );
}
