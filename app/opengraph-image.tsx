import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = SITE_NAME;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage("Break-even Ads Calculator", SITE_DESCRIPTION);
}
