import { buildWidgetScript } from "@/lib/embed/widget-script";

export const GET = async function GET() {
  return new Response(buildWidgetScript(), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
