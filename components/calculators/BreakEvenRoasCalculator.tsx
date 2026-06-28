"use client";

import { useMemo, useState } from "react";
import {
  calculateBreakEvenRoas,
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
  formatRoas,
  fieldsAreValid,
  parseInput,
  parseOptionalInput,
} from "@/lib/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { NextStepsSection } from "@/components/NextStepsSection";
import BusinessModelToggle from "./BusinessModelToggle";
import CalculatorToolbar, { CalculatorResults } from "./CalculatorToolbar";
import NumberField from "./NumberField";

const emptyResults = {
  breakEvenRoas: null,
  contributionPerOrder: null,
};

const EMPTY = {
  model: "ecommerce" as BusinessModel,
  value: "",
  margin: "",
  closeRate: "",
  fixedCost: "",
};

export default function BreakEvenRoasCalculator() {
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
    "break-even-roas",
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

  const results = useMemo(() => {
    if (!inputsReady) return emptyResults;
    return calculateBreakEvenRoas(
      effectiveAov,
      parseInput(margin),
      parseOptionalInput(fixedCost)
    );
  }, [inputsReady, effectiveAov, margin, fixedCost]);

  const copyText =
    results.breakEvenRoas !== null
      ? `Break-even ROAS: ${formatRoas(results.breakEvenRoas)}\nContribution: ${formatCurrency(results.contributionPerOrder)}`
      : null;

  function reset() {
    setModel(EMPTY.model);
    setValue(EMPTY.value);
    setMargin(EMPTY.margin);
    setCloseRate(EMPTY.closeRate);
    setFixedCost(EMPTY.fixedCost);
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
          id="roas-value"
          label={labels.value}
          hint={labels.valueHint}
          value={value}
          onChange={setValue}
        />
        {model === "leadgen" && (
          <NumberField
            id="roas-close-rate"
            label={labels.closeRate}
            hint={labels.closeRateHint}
            value={closeRate}
            onChange={setCloseRate}
            validationType="percent"
            max={100}
          />
        )}
        <NumberField
          id="roas-margin"
          label="Gross margin (%)"
          hint="Profit as a percentage of value"
          value={margin}
          onChange={setMargin}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="roas-fixed"
          label={labels.fixedCost}
          hint={labels.fixedCostHint}
          value={fixedCost}
          onChange={setFixedCost}
          optional
          fullWidth
        />
      </div>
      <CalculatorResults
        title="Break-even ROAS"
        loading={!hydrated}
        ready={inputsReady}
      >
        {results.contributionPerOrder === null && (
          <p className="result-warning" role="alert">
            Your margin and fixed costs leave no profit per conversion. Adjust
            inputs to calculate a valid break-even ROAS.
          </p>
        )}
        <dl className="results-grid">
          <div className="result-item">
            <dt>Minimum ROAS to break even</dt>
            <dd>{formatRoas(results.breakEvenRoas)}</dd>
          </div>
          <div className="result-item">
            <dt>{labels.contribution}</dt>
            <dd>{formatCurrency(results.contributionPerOrder)}</dd>
          </div>
        </dl>
        <NextStepsSection
          variant="break-even-roas"
          model={model}
          breakEvenRoas={results.breakEvenRoas}
          contribution={results.contributionPerOrder}
        />
      </CalculatorResults>
    </div>
  );
}
