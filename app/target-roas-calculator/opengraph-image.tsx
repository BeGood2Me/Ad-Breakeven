import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = "Target ROAS Calculator";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "Target ROAS Calculator",
    "From margin to tROAS — break-even floor plus profit buffer"
  );
}
