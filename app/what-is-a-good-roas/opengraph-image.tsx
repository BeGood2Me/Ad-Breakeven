import {
  createOpenGraphImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/opengraph-image";

export const alt = "What Is a Good ROAS?";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpenGraphImage() {
  return createOpenGraphImage(
    "What Is a Good ROAS?",
    "Break-even benchmarks by margin — not generic 3× or 4× targets"
  );
}
