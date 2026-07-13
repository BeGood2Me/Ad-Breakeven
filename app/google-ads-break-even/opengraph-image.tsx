import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = "Google Ads Break-even ROAS";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Google Ads Break-even ROAS",
    "Set tROAS from margin — Search, Shopping & PMax"
  );
}
