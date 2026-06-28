export type FieldValidationType =
  | "currency"
  | "percent"
  | "count"
  | "optionalCurrency";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return currencyFormatter.format(value);
}

export function formatNumber(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return numberFormatter.format(value);
}

export function formatPercent(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return percentFormatter.format(value / 100);
}

export function formatPercentOf(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${formatNumber(value)}%`;
}

export function formatRoas(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${formatNumber(value)}×`;
}

export function parseInput(value: string): number {
  const trimmed = value.trim();
  if (trimmed === "") return 0;
  const parsed = parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseOptionalInput(value: string): number {
  if (value.trim() === "") return 0;
  return parseInput(value);
}

export function hasRequiredInputs(...values: string[]): boolean {
  return values.every((value) => value.trim() !== "");
}

export type ValidatedField = {
  value: string;
  type: FieldValidationType;
  required?: boolean;
};

export function fieldsAreValid(fields: ValidatedField[]): boolean {
  return fields.every(({ value, type, required = true }) => {
    if (required && value.trim() === "") return false;
    if (!required && value.trim() === "") return true;
    return validateField(value, type) === null;
  });
}

export function validateField(
  value: string,
  type: FieldValidationType
): string | null {
  if (value.trim() === "") {
    return type === "optionalCurrency" ? null : null;
  }

  const parsed = parseFloat(value.trim());
  if (!Number.isFinite(parsed)) return "Enter a valid number";
  if (parsed < 0) return "Must be zero or greater";
  if (type === "percent" && parsed > 100) return "Must be 100% or less";
  if (type === "count" && !Number.isInteger(parsed)) {
    return "Enter a whole number";
  }
  return null;
}

export function getFieldError(
  value: string,
  type: FieldValidationType,
  required: boolean
): string | null {
  if (value.trim() === "") {
    return required ? null : null;
  }
  return validateField(value, type);
}

export function safeDivide(
  numerator: number,
  denominator: number
): number | null {
  if (denominator === 0 || !Number.isFinite(denominator)) return null;
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}
