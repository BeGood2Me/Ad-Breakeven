import type { BusinessModel } from "./business-model";

export type CalculatorId =
  | "break-even-ads"
  | "break-even-roas"
  | "max-cpa"
  | "max-cpc"
  | "ad-profit";

export const CALCULATOR_FIELDS: Record<CalculatorId, readonly string[]> = {
  "break-even-ads": [
    "model",
    "value",
    "margin",
    "adSpend",
    "conversionRate",
    "closeRate",
    "fixedCost",
  ],
  "break-even-roas": ["model", "value", "margin", "closeRate", "fixedCost"],
  "max-cpa": ["model", "value", "margin", "closeRate", "fixedCost"],
  "max-cpc": [
    "model",
    "value",
    "margin",
    "closeRate",
    "fixedCost",
    "conversionRate",
  ],
  "ad-profit": [
    "model",
    "value",
    "margin",
    "adSpend",
    "sales",
    "closeRate",
    "fixedCost",
  ],
};

const STORAGE_PREFIX = "adbreakeven-calc-";

export const CALCULATOR_PARAM_KEYS = [
  "model",
  "value",
  "margin",
  "closeRate",
  "fixedCost",
  "adSpend",
  "conversionRate",
  "sales",
] as const;

export function extractCalculatorParams(
  search: string | Record<string, string>
): Record<string, string> {
  const all =
    typeof search === "string"
      ? parseParamsFromSearch(search)
      : search;
  const result: Record<string, string> = {};
  for (const key of CALCULATOR_PARAM_KEYS) {
    if (all[key] !== undefined) result[key] = all[key];
  }
  return result;
}

export function serializeParams(params: Record<string, string>): string {
  const hasContent = CALCULATOR_PARAM_KEYS.some((key) => {
    if (key === "model") return params.model === "leadgen";
    return (params[key] ?? "").trim() !== "";
  });
  if (!hasContent) return "";

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value.trim() !== "") search.set(key, value);
  });
  return search.toString();
}

export function parseParamsFromSearch(
  search: string
): Record<string, string> {
  const result: Record<string, string> = {};
  const params = new URLSearchParams(search);
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export function getShareUrl(params: Record<string, string>): string {
  if (typeof window === "undefined") return "";
  const query = serializeParams(params);
  const path = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
  return `${window.location.origin}${path}`;
}

function buildUrlWithParams(params: Record<string, string>): string {
  const search = new URLSearchParams(window.location.search);

  for (const key of CALCULATOR_PARAM_KEYS) {
    search.delete(key);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value.trim() !== "") search.set(key, value);
  });

  const query = search.toString();
  return query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
}

export function updateShareUrl(params: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", buildUrlWithParams(params));
}

export async function copyShareUrl(
  params: Record<string, string>
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  updateShareUrl(params);
  try {
    await navigator.clipboard.writeText(getShareUrl(params));
    return true;
  } catch {
    return false;
  }
}

export function loadParamsFromUrl(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return extractCalculatorParams(window.location.search);
}

export function saveCalculatorState(
  id: CalculatorId,
  params: Record<string, string>
) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(params));
  } catch {
    /* ignore */
  }
}

export function loadCalculatorState(
  id: CalculatorId
): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as Record<string, string>) : null;
  } catch {
    return null;
  }
}

export function mergeCalculatorState(
  defaults: Record<string, string>,
  id: CalculatorId
): Record<string, string> {
  if (typeof window === "undefined") return defaults;

  const fromUrl = loadParamsFromUrl();
  const fromStorage = loadCalculatorState(id) ?? {};
  const loaded =
    Object.keys(fromUrl).length > 0
      ? { ...fromStorage, ...fromUrl }
      : Object.keys(fromStorage).length > 0
        ? fromStorage
        : null;
  if (!loaded) return defaults;

  const model = loaded.model === "leadgen" ? "leadgen" : "ecommerce";
  const merged: Record<string, string> = { ...defaults, model };
  for (const key of CALCULATOR_FIELDS[id]) {
    if (key === "model") continue;
    if (loaded[key] !== undefined) merged[key] = loaded[key];
  }
  if (model !== "leadgen") merged.closeRate = "";
  return merged;
}

export function parseBusinessModel(
  merged: Record<string, string>
): BusinessModel {
  return merged.model === "leadgen" ? "leadgen" : "ecommerce";
}

export function buildShareParams(
  model: BusinessModel,
  fields: Record<string, string>
): Record<string, string> {
  return extractCalculatorParams({ model, ...fields });
}
