import { FAQ_PAGE_TITLE } from "@/lib/site";
import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";
import { ogImageAlt } from "@/lib/og-image-paths";

export const alt = ogImageAlt(FAQ_PAGE_TITLE);
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    FAQ_PAGE_TITLE,
    "Break-even ROAS, max CPA, CPC, ad profit & lead gen — answered"
  );
}
