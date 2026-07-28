import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CALCULATOR_PARAM_KEYS } from "@/lib/calculator-params";

const CALCULATOR_PATHS = new Set([
  "/",
  "/break-even-roas-calculator",
  "/max-cpa-calculator",
  "/max-cpc-calculator",
  "/ad-profit-calculator",
]);

function hasCalculatorShareParams(searchParams: URLSearchParams): boolean {
  return CALCULATOR_PARAM_KEYS.some((key) => searchParams.has(key));
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith("/embed")) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return response;
  }

  if (
    CALCULATOR_PATHS.has(pathname) &&
    hasCalculatorShareParams(searchParams)
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
