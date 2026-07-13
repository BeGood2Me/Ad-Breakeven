import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { SITE_NAME } from "@/lib/site";

export const alt = `About ${SITE_NAME}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    `About ${SITE_NAME}`,
    "Free break-even calculators for ecommerce & lead gen paid ads"
  );
}
