"use client";

import { useMemo, useState } from "react";
import {
  calculateMaxCpa,
  resolveEffectiveAov,
  type BusinessModel,
} from "@/lib/calculations";
import { getValueFieldLabels } from "@/lib/business-model";
import {
  parseBusinessModel,
  updateShareUrl,
} from "@/lib/calculator-params";
import {
  formatCurrency,
  fieldsAreValid,
  parseInput,
  parseOptionalInput,
} from "@/lib/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { exampleForModel } from "@/lib/calculator-examples";
import { NextStepsSection } from "@/components/NextStepsSection";
import BusinessModelToggle from "./BusinessModelToggle";
import CalculatorToolbar, { CalculatorResults } from "./CalculatorToolbar";
import NumberField from "./NumberField";

const EMPTY = {
  model: "ecommerce" as BusinessModel,
  value: "",
  margin: "",
  closeRate: "",
  fixedCost: "",
};

export default function MaxCpaCalculator() {
  const [model, setModel] = useState<BusinessModel>(EMPTY.model);
  const [value, setValue] = useState(EMPTY.value);
  const [margin, setMargin] = useState(EMPTY.margin);
  const [closeRate, setCloseRate] = useState(EMPTY.closeRate);
  const [fixedCost, setFixedCost] = useState(EMPTY.fixedCost);

  const labels = getValueFieldLabels(model);
  const values = useMemo(
    () => ({ model, value, margin, closeRate, fixedCost }),
    [model, value, margin, closeRate, fixedCost]
  );

  const { hydrated } = useCalculatorPersistence(
    "max-cpa",
    values,
    (merged) => {
      setModel(parseBusinessModel(merged));
      setValue(merged.value ?? "");
      setMargin(merged.margin ?? "");
      setCloseRate(merged.closeRate ?? "");
      setFixedCost(merged.fixedCost ?? "");
    },
    EMPTY
  );

  const inputsReady = fieldsAreValid([
    { value, type: "currency" },
    { value: margin, type: "percent" },
    { value: fixedCost, type: "optionalCurrency", required: false },
    ...(model === "leadgen"
      ? [{ value: closeRate, type: "percent" as const }]
      : []),
  ]);

  const effectiveAov = resolveEffectiveAov(
    model,
    parseInput(value),
    parseInput(closeRate)
  );

  const maxCpa = useMemo(() => {
    if (!inputsReady) return null;
    return calculateMaxCpa(
      effectiveAov,
      parseInput(margin),
      parseOptionalInput(fixedCost)
    );
  }, [inputsReady, effectiveAov, margin, fixedCost]);

  const copyText =
    maxCpa !== null
      ? `${labels.maxAcquisition}: ${formatCurrency(maxCpa)}`
      : null;

  function reset() {
    setModel(EMPTY.model);
    setValue(EMPTY.value);
    setMargin(EMPTY.margin);
    setCloseRate(EMPTY.closeRate);
    setFixedCost(EMPTY.fixedCost);
    updateShareUrl({});
  }

  function tryExample() {
    const ex = exampleForModel(model);
    setModel(ex.model);
    setValue(ex.value);
    setMargin(ex.margin);
    setCloseRate(ex.closeRate);
    setFixedCost(ex.fixedCost);
    updateShareUrl({
      model: ex.model,
      value: ex.value,
      margin: ex.margin,
      closeRate: ex.closeRate,
      fixedCost: ex.fixedCost,
    });
  }

  return (
    <div className="calculator">
      <BusinessModelToggle
        model={model}
        onChange={(m) => {
          setModel(m);
          if (m === "ecommerce") setCloseRate("");
        }}
      />
      <CalculatorToolbar
        onReset={reset}
        onTryExample={tryExample}
        copyText={copyText}
        shareParams={values}
        shareEnabled={inputsReady}
      />
      <div className="calculator-grid">
        <NumberField
          id="cpa-value"
          label={labels.value}
          hint={labels.valueHint}
          value={value}
          onChange={setValue}
        />
        {model === "leadgen" && (
          <NumberField
            id="cpa-close-rate"
            label={labels.closeRate}
            hint={labels.closeRateHint}
            value={closeRate}
            onChange={setCloseRate}
            validationType="percent"
            max={100}
          />
        )}
        <NumberField
          id="cpa-margin"
          label="Gross margin (%)"
          value={margin}
          onChange={setMargin}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="cpa-fixed"
          label={labels.fixedCost}
          hint={labels.fixedCostHint}
          value={fixedCost}
          onChange={setFixedCost}
          optional
          fullWidth
        />
      </div>
      <CalculatorResults
        title="Maximum affordable CPA"
        loading={!hydrated}
        ready={inputsReady}
      >
        {maxCpa === null && (
          <p className="result-warning" role="alert">
            Contribution is zero or negative. Increase margin or reduce fixed
            costs to find a viable acquisition cap.
          </p>
        )}
        <dl className="results-grid">
          <div className="result-item">
            <dt>{labels.maxAcquisition}</dt>
            <dd>{formatCurrency(maxCpa)}</dd>
          </div>
        </dl>
        <NextStepsSection
          variant="max-cpa"
          model={model}
          maxCpa={maxCpa}
          closeRate={parseInput(closeRate)}
        />
      </CalculatorResults>
    </div>
  );
}
