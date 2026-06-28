import { FAQ_PAGE_TITLE } from "@/lib/site";
import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = FAQ_PAGE_TITLE;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    FAQ_PAGE_TITLE,
    "Break-even ROAS, max CPA, CPC, ad profit & lead gen — answered"
  );
}
