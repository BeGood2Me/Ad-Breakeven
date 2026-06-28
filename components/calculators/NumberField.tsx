"use client";

import type { FieldValidationType } from "@/lib/format";
import { getFieldError } from "@/lib/format";

interface NumberFieldProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  validationType?: FieldValidationType;
  required?: boolean;
  optional?: boolean;
  min?: number;
  max?: number;
  step?: string;
  fullWidth?: boolean;
}

export default function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  validationType = "currency",
  required = true,
  optional = false,
  min = 0,
  max,
  step = "0.01",
  fullWidth = false,
}: NumberFieldProps) {
  const error = getFieldError(
    value,
    optional ? "optionalCurrency" : validationType,
    required
  );
  const showError = value.trim() !== "" && error !== null;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = showError ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={`form-group${fullWidth ? " form-group-full" : ""}${showError ? " form-group-invalid" : ""}`}
    >
      <label htmlFor={id}>
        {label}
        {optional && <span className="optional-tag"> (optional)</span>}
      </label>
      {hint && (
        <span className="hint" id={hintId}>
          {hint}
        </span>
      )}
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy}
        aria-invalid={showError || undefined}
        aria-required={required}
      />
      {showError && (
        <span className="field-error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
