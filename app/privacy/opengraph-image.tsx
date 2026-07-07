import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = "Privacy Policy";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Privacy Policy",
    "Privacy-friendly analytics — no ad trackers; calculator data stays local"
  );
}
