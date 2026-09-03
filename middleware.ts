import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hasMeaningfulCalculatorParams } from "@/lib/calculator-params";

const CALCULATOR_PATHS = new Set([
  "/",
  "/break-even-roas-calculator",
  "/max-cpa-calculator",
  "/max-cpc-calculator",
  "/ad-profit-calculator",
]);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith("/embed/")) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return response;
  }

  if (
    CALCULATOR_PATHS.has(pathname) &&
    hasMeaningfulCalculatorParams(searchParams)
  ) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/break-even-roas-calculator",
    "/max-cpa-calculator",
    "/max-cpc-calculator",
    "/ad-profit-calculator",
    "/embed/:path*",
  ],
};
