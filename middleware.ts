import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  CALCULATOR_PARAM_KEYS,
  hasMeaningfulCalculatorParams,
} from "@/lib/calculator-params";

const CALCULATOR_PATHS = new Set([
  "/",
  "/break-even-roas-calculator",
  "/max-cpa-calculator",
  "/max-cpc-calculator",
  "/ad-profit-calculator",
]);

function hasOnlyCalculatorParams(searchParams: URLSearchParams): boolean {
  for (const key of searchParams.keys()) {
    if (!CALCULATOR_PARAM_KEYS.includes(key as (typeof CALCULATOR_PARAM_KEYS)[number])) {
      return false;
    }
  }
  return searchParams.size > 0;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/embed/")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return response;
  }

  if (CALCULATOR_PATHS.has(pathname)) {
    if (
      hasOnlyCalculatorParams(searchParams) &&
      !hasMeaningfulCalculatorParams(searchParams)
    ) {
      return NextResponse.redirect(new URL(pathname, request.url), 301);
    }

    const response = NextResponse.next();
    if (hasMeaningfulCalculatorParams(searchParams)) {
      response.headers.set("X-Robots-Tag", "noindex, follow");
    }
    return response;
  }

  return NextResponse.next();
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
