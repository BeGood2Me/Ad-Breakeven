"use client";

import { useMemo, useState } from "react";
import {
  calculateBreakEvenAds,
  resolveEffectiveAov,
  type BusinessModel,
} from "@/lib/calculations";
import {
  getValueFieldLabels,
} from "@/lib/business-model";
import {
  parseBusinessModel,
  updateShareUrl,
} from "@/lib/calculator-params";
import {
  formatCurrency,
  formatNumber,
  formatRoas,
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

const emptyResults = {
  contributionPerOrder: null,
  breakEvenSales: null,
  maxCpa: null,
  maxCpc: null,
  breakEvenRoas: null,
  breakEvenRevenue: null,
};

const EMPTY = {
  model: "ecommerce" as BusinessModel,
  value: "",
  margin: "",
  adSpend: "",
  conversionRate: "",
  closeRate: "",
  fixedCost: "",
};

export default function BreakEvenAdsCalculator() {
  const [model, setModel] = useState<BusinessModel>(EMPTY.model);
  const [value, setValue] = useState(EMPTY.value);
  const [margin, setMargin] = useState(EMPTY.margin);
  const [adSpend, setAdSpend] = useState(EMPTY.adSpend);
  const [conversionRate, setConversionRate] = useState(EMPTY.conversionRate);
  const [closeRate, setCloseRate] = useState(EMPTY.closeRate);
  const [fixedCost, setFixedCost] = useState(EMPTY.fixedCost);

  const labels = getValueFieldLabels(model);

  const values = useMemo(
    () => ({
      model,
      value,
      margin,
      adSpend,
      conversionRate,
      closeRate,
      fixedCost,
    }),
    [model, value, margin, adSpend, conversionRate, closeRate, fixedCost]
  );

  const { hydrated } = useCalculatorPersistence(
    "break-even-ads",
    values,
    (merged) => {
      setModel(parseBusinessModel(merged));
      setValue(merged.value ?? "");
      setMargin(merged.margin ?? "");
      setAdSpend(merged.adSpend ?? "");
      setConversionRate(merged.conversionRate ?? "");
      setCloseRate(merged.closeRate ?? "");
      setFixedCost(merged.fixedCost ?? "");
    },
    EMPTY
  );

  const inputsReady = fieldsAreValid([
    { value, type: "currency" },
    { value: margin, type: "percent" },
    { value: adSpend, type: "currency" },
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

    return calculateBreakEvenAds({
      aov: effectiveAov,
      marginPercent: parseInput(margin),
      adSpend: parseInput(adSpend),
      conversionRatePercent: parseInput(conversionRate),
      fixedCostPerOrder: parseOptionalInput(fixedCost),
    });
  }, [
    inputsReady,
    effectiveAov,
    margin,
    adSpend,
    conversionRate,
    fixedCost,
  ]);

  const hasValidContribution =
    inputsReady && results.contributionPerOrder !== null;

  const zeroConversion =
    inputsReady && parseInput(conversionRate) === 0;

  const copyText = hasValidContribution
    ? [
        "Break-even Ads Calculator Results",
        `Contribution: ${formatCurrency(results.contributionPerOrder)}`,
        `Break-even sales: ${formatNumber(results.breakEvenSales)}`,
        `Break-even ROAS: ${formatRoas(results.breakEvenRoas)}`,
        `${labels.maxAcquisition}: ${formatCurrency(results.maxCpa)}`,
        `Max CPC: ${formatCurrency(results.maxCpc)}`,
      ].join("\n")
    : null;

  function reset() {
    setModel(EMPTY.model);
    setValue(EMPTY.value);
    setMargin(EMPTY.margin);
    setAdSpend(EMPTY.adSpend);
    setConversionRate(EMPTY.conversionRate);
    setCloseRate(EMPTY.closeRate);
    setFixedCost(EMPTY.fixedCost);
    updateShareUrl({});
  }

  function tryExample() {
    const ex = exampleForModel(model);
    setModel(ex.model);
    setValue(ex.value);
    setMargin(ex.margin);
    setAdSpend(ex.adSpend);
    setConversionRate(ex.conversionRate);
    setCloseRate(ex.closeRate);
    setFixedCost(ex.fixedCost);
    updateShareUrl({
      model: ex.model,
      value: ex.value,
      margin: ex.margin,
      adSpend: ex.adSpend,
      conversionRate: ex.conversionRate,
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
          id="value"
          label={labels.value}
          hint={labels.valueHint}
          value={value}
          onChange={setValue}
        />
        {model === "leadgen" && (
          <NumberField
            id="close-rate"
            label={labels.closeRate}
            hint={labels.closeRateHint}
            value={closeRate}
            onChange={setCloseRate}
            validationType="percent"
            max={100}
          />
        )}
        <NumberField
          id="margin"
          label="Gross margin (%)"
          hint="Profit per sale as a percentage of value"
          value={margin}
          onChange={setMargin}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="ad-spend"
          label="Ad spend ($)"
          hint="Total budget or spend to evaluate"
          value={adSpend}
          onChange={setAdSpend}
        />
        <NumberField
          id="conversion-rate"
          label={labels.conversion}
          hint={labels.conversionHint}
          value={conversionRate}
          onChange={setConversionRate}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="fixed-cost"
          label={labels.fixedCost}
          hint={labels.fixedCostHint}
          value={fixedCost}
          onChange={setFixedCost}
          optional
        />
      </div>

      <CalculatorResults
        title="Your break-even targets"
        loading={!hydrated}
        ready={inputsReady}
      >
        {!hasValidContribution && (
          <p className="result-warning" role="alert">
            Contribution is zero or negative. Check your margin and fixed costs —
            you cannot break even on paid ads with these inputs.
          </p>
        )}
        {zeroConversion && (
          <p className="result-warning" role="alert">
            Conversion rate is 0%, so max CPC cannot be calculated. Enter a
            conversion rate above zero.
          </p>
        )}
        <dl className="results-grid">
          <div className="result-item">
            <dt>{labels.contribution}</dt>
            <dd>{formatCurrency(results.contributionPerOrder)}</dd>
          </div>
          <div className="result-item">
            <dt>{labels.breakEvenSales}</dt>
            <dd>{formatNumber(results.breakEvenSales)}</dd>
          </div>
          <div className="result-item">
            <dt>Break-even ROAS</dt>
            <dd>{formatRoas(results.breakEvenRoas)}</dd>
          </div>
          <div className="result-item">
            <dt>{labels.maxAcquisition}</dt>
            <dd>{formatCurrency(results.maxCpa)}</dd>
          </div>
          <div className="result-item">
            <dt>Max CPC (break-even)</dt>
            <dd>{formatCurrency(results.maxCpc)}</dd>
          </div>
          <div className="result-item">
            <dt>Break-even revenue</dt>
            <dd>{formatCurrency(results.breakEvenRevenue)}</dd>
          </div>
        </dl>
        <NextStepsSection
          variant="hub"
          model={model}
          breakEvenRoas={results.breakEvenRoas}
          maxCpa={results.maxCpa}
          maxCpc={results.maxCpc}
          breakEvenSales={results.breakEvenSales}
          adSpend={parseInput(adSpend)}
          conversionRate={parseInput(conversionRate)}
          closeRate={parseInput(closeRate)}
          hasValidContribution={hasValidContribution}
        />
      </CalculatorResults>
    </div>
  );
}
