"use client";

import { useMemo, useState } from "react";
import {
  calculateMaxCpcFromInputs,
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
import { NextStepsSection } from "@/components/NextStepsSection";
import BusinessModelToggle from "./BusinessModelToggle";
import CalculatorToolbar, { CalculatorResults } from "./CalculatorToolbar";
import NumberField from "./NumberField";

const emptyResults = { maxCpa: null, maxCpc: null };

const EMPTY = {
  model: "ecommerce" as BusinessModel,
  value: "",
  margin: "",
  closeRate: "",
  fixedCost: "",
  conversionRate: "",
};

export default function MaxCpcCalculator() {
  const [model, setModel] = useState<BusinessModel>(EMPTY.model);
  const [value, setValue] = useState(EMPTY.value);
  const [margin, setMargin] = useState(EMPTY.margin);
  const [closeRate, setCloseRate] = useState(EMPTY.closeRate);
  const [fixedCost, setFixedCost] = useState(EMPTY.fixedCost);
  const [conversionRate, setConversionRate] = useState(EMPTY.conversionRate);

  const labels = getValueFieldLabels(model);
  const values = useMemo(
    () => ({ model, value, margin, closeRate, fixedCost, conversionRate }),
    [model, value, margin, closeRate, fixedCost, conversionRate]
  );

  const { hydrated } = useCalculatorPersistence(
    "max-cpc",
    values,
    (merged) => {
      setModel(parseBusinessModel(merged));
      setValue(merged.value ?? "");
      setMargin(merged.margin ?? "");
      setCloseRate(merged.closeRate ?? "");
      setFixedCost(merged.fixedCost ?? "");
      setConversionRate(merged.conversionRate ?? "");
    },
    EMPTY
  );

  const inputsReady = fieldsAreValid([
    { value, type: "currency" },
    { value: margin, type: "percent" },
    { value: conversionRate, type: "percent" },
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

  const results = useMemo(() => {
    if (!inputsReady) return emptyResults;
    return calculateMaxCpcFromInputs(
      effectiveAov,
      parseInput(margin),
      parseOptionalInput(fixedCost),
      parseInput(conversionRate)
    );
  }, [inputsReady, effectiveAov, margin, fixedCost, conversionRate]);

  const zeroConversion =
    inputsReady && parseInput(conversionRate) === 0;

  const copyText =
    results.maxCpc !== null
      ? `${labels.maxAcquisition}: ${formatCurrency(results.maxCpa)}\nMax CPC: ${formatCurrency(results.maxCpc)}`
      : null;

  function reset() {
    setModel(EMPTY.model);
    setValue(EMPTY.value);
    setMargin(EMPTY.margin);
    setCloseRate(EMPTY.closeRate);
    setFixedCost(EMPTY.fixedCost);
    setConversionRate(EMPTY.conversionRate);
    updateShareUrl({});
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
        copyText={copyText}
        shareParams={values}
        shareEnabled={inputsReady}
      />
      <div className="calculator-grid">
        <NumberField
          id="cpc-value"
          label={labels.value}
          hint={labels.valueHint}
          value={value}
          onChange={setValue}
        />
        {model === "leadgen" && (
          <NumberField
            id="cpc-close-rate"
            label={labels.closeRate}
            hint={labels.closeRateHint}
            value={closeRate}
            onChange={setCloseRate}
            validationType="percent"
            max={100}
          />
        )}
        <NumberField
          id="cpc-margin"
          label="Gross margin (%)"
          value={margin}
          onChange={setMargin}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="cpc-cr"
          label={labels.conversion}
          hint={labels.conversionHint}
          value={conversionRate}
          onChange={setConversionRate}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="cpc-fixed"
          label={labels.fixedCost}
          hint={labels.fixedCostHint}
          value={fixedCost}
          onChange={setFixedCost}
          optional
          fullWidth
        />
      </div>
      <CalculatorResults
        title="Maximum affordable CPC"
        loading={!hydrated}
        ready={inputsReady}
      >
        {results.maxCpa === null && (
          <p className="result-warning" role="alert">
            No positive contribution per conversion. Fix margin or fixed costs
            first.
          </p>
        )}
        {zeroConversion && (
          <p className="result-warning" role="alert">
            Conversion rate is 0%, so max CPC cannot be calculated.
          </p>
        )}
        <dl className="results-grid">
          <div className="result-item">
            <dt>{labels.maxAcquisition}</dt>
            <dd>{formatCurrency(results.maxCpa)}</dd>
          </div>
          <div className="result-item">
            <dt>Max CPC (break-even)</dt>
            <dd>{formatCurrency(results.maxCpc)}</dd>
          </div>
        </dl>
        <NextStepsSection
          variant="max-cpc"
          model={model}
          maxCpc={results.maxCpc}
          maxCpa={results.maxCpa}
          conversionRate={parseInput(conversionRate)}
        />
      </CalculatorResults>
    </div>
  );
}
