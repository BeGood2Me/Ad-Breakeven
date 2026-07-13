import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = "How to Set Target CPA";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "How to Set Target CPA",
    "Max CPA for ecommerce & lead gen — worked examples"
  );
}
