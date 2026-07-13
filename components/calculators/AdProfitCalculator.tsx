"use client";

import { useMemo, useState } from "react";
import {
  calculateAdProfit,
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
  formatPercentOf,
  formatRoas,
  fieldsAreValid,
  parseInput,
  parseOptionalInput,
} from "@/lib/format";
import { useCalculatorPersistence } from "@/hooks/useCalculatorPersistence";
import { exampleForModel } from "@/lib/calculator-examples";
import { contributionPerOrder } from "@/lib/calculations";
import ProfitCurveChart from "@/components/ProfitCurveChart";
import { NextStepsSection } from "@/components/NextStepsSection";
import BusinessModelToggle from "./BusinessModelToggle";
import CalculatorToolbar, { CalculatorResults } from "./CalculatorToolbar";
import NumberField from "./NumberField";

const emptyResults = {
  revenue: 0,
  contribution: null,
  profit: null,
  roas: null,
  profitMarginOnRevenue: null,
  isProfitable: null,
  breakEvenRoas: null,
};

const EMPTY = {
  model: "ecommerce" as BusinessModel,
  value: "",
  margin: "",
  adSpend: "",
  sales: "",
  closeRate: "",
  fixedCost: "",
};

export default function AdProfitCalculator() {
  const [model, setModel] = useState<BusinessModel>(EMPTY.model);
  const [value, setValue] = useState(EMPTY.value);
  const [margin, setMargin] = useState(EMPTY.margin);
  const [adSpend, setAdSpend] = useState(EMPTY.adSpend);
  const [sales, setSales] = useState(EMPTY.sales);
  const [closeRate, setCloseRate] = useState(EMPTY.closeRate);
  const [fixedCost, setFixedCost] = useState(EMPTY.fixedCost);

  const labels = getValueFieldLabels(model);
  const values = useMemo(
    () => ({ model, value, margin, adSpend, sales, closeRate, fixedCost }),
    [model, value, margin, adSpend, sales, closeRate, fixedCost]
  );

  const { hydrated } = useCalculatorPersistence(
    "ad-profit",
    values,
    (merged) => {
      setModel(parseBusinessModel(merged));
      setValue(merged.value ?? "");
      setMargin(merged.margin ?? "");
      setAdSpend(merged.adSpend ?? "");
      setSales(merged.sales ?? "");
      setCloseRate(merged.closeRate ?? "");
      setFixedCost(merged.fixedCost ?? "");
    },
    EMPTY
  );

  const inputsReady = fieldsAreValid([
    { value, type: "currency" },
    { value: margin, type: "percent" },
    { value: adSpend, type: "currency" },
    { value: sales, type: "count" },
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
    return calculateAdProfit({
      aov: effectiveAov,
      marginPercent: parseInput(margin),
      adSpend: parseInput(adSpend),
      sales: parseInput(sales),
      fixedCostPerOrder: parseOptionalInput(fixedCost),
    });
  }, [inputsReady, effectiveAov, margin, adSpend, sales, fixedCost]);

  const profitClass =
    results.profit === null
      ? ""
      : results.profit >= 0
        ? "positive"
        : "negative";

  const aboveBreakEven =
    results.roas !== null &&
    results.breakEvenRoas !== null &&
    results.roas >= results.breakEvenRoas;

  const copyText =
    results.profit !== null
      ? [
          `Profit: ${formatCurrency(results.profit)}`,
          ...(results.roas !== null ? [`ROAS: ${formatRoas(results.roas)}`] : []),
          `Break-even ROAS: ${formatRoas(results.breakEvenRoas)}`,
        ].join("\n")
      : null;

  function reset() {
    setModel(EMPTY.model);
    setValue(EMPTY.value);
    setMargin(EMPTY.margin);
    setAdSpend(EMPTY.adSpend);
    setSales(EMPTY.sales);
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
    setSales(ex.sales);
    setCloseRate(ex.closeRate);
    setFixedCost(ex.fixedCost);
    updateShareUrl({
      model: ex.model,
      value: ex.value,
      margin: ex.margin,
      adSpend: ex.adSpend,
      sales: ex.sales,
      closeRate: ex.closeRate,
      fixedCost: ex.fixedCost,
    });
  }

  const contributionPerUnit =
    inputsReady && results.contribution !== null
      ? contributionPerOrder(
          effectiveAov,
          parseInput(margin),
          parseOptionalInput(fixedCost)
        )
      : null;

  const breakEvenSpend =
    contributionPerUnit !== null && parseInput(sales) > 0
      ? contributionPerUnit * parseInput(sales)
      : null;

  const profitBadge =
    results.profit === null
      ? null
      : results.profit > 0
        ? "Profitable"
        : results.profit === 0
          ? "Break-even"
          : "Below break-even";

  const profitBadgeClass =
    results.profit === null
      ? ""
      : results.profit > 0
        ? "profit-badge-positive"
        : results.profit === 0
          ? "profit-badge-neutral"
          : "profit-badge-negative";

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
          id="profit-value"
          label={labels.value}
          hint={labels.valueHint}
          value={value}
          onChange={setValue}
        />
        {model === "leadgen" && (
          <NumberField
            id="profit-close-rate"
            label={labels.closeRate}
            hint={labels.closeRateHint}
            value={closeRate}
            onChange={setCloseRate}
            validationType="percent"
            max={100}
          />
        )}
        <NumberField
          id="profit-margin"
          label="Gross margin (%)"
          value={margin}
          onChange={setMargin}
          validationType="percent"
          max={100}
        />
        <NumberField
          id="profit-spend"
          label="Ad spend ($)"
          value={adSpend}
          onChange={setAdSpend}
        />
        <NumberField
          id="profit-sales"
          label={labels.sales}
          hint={labels.salesHint}
          value={sales}
          onChange={setSales}
          validationType="count"
          step="1"
        />
        <NumberField
          id="profit-fixed"
          label={labels.fixedCost}
          hint={labels.fixedCostHint}
          value={fixedCost}
          onChange={setFixedCost}
          optional
          fullWidth
        />
      </div>
      <CalculatorResults
        title="Ad profitability"
        loading={!hydrated}
        ready={inputsReady}
      >
        {profitBadge && (
          <p className={`profit-badge ${profitBadgeClass}`} role="status">
            {profitBadge}
            {results.breakEvenRoas !== null &&
              results.roas !== null &&
              ` — ROAS ${formatRoas(results.roas)} vs break-even ${formatRoas(results.breakEvenRoas)}`}
          </p>
        )}
        {results.contribution === null && (
          <p className="result-warning" role="alert">
            Contribution is zero or negative. Profit cannot be calculated with
            these margin and cost inputs.
          </p>
        )}
        {inputsReady &&
          results.roas !== null &&
          results.breakEvenRoas !== null &&
          !aboveBreakEven &&
          results.contribution !== null && (
            <p className="result-warning" role="alert">
              Actual ROAS is below your break-even threshold. The campaign is
              losing money after{" "}
              {model === "leadgen" ? "margin and fulfillment costs" : "product costs"}.
            </p>
          )}
        <dl className="results-grid">
          <div className="result-item">
            <dt>Revenue from ads</dt>
            <dd>{formatCurrency(results.revenue)}</dd>
          </div>
          <div className="result-item">
            <dt>Total contribution</dt>
            <dd>{formatCurrency(results.contribution)}</dd>
          </div>
          <div className="result-item">
            <dt>Net profit (after ad spend)</dt>
            <dd className={profitClass}>{formatCurrency(results.profit)}</dd>
          </div>
          <div className="result-item">
            <dt>Profit margin on revenue</dt>
            <dd className={profitClass}>
              {formatPercentOf(results.profitMarginOnRevenue)}
            </dd>
          </div>
          <div className="result-item">
            <dt>Actual ROAS</dt>
            <dd>{formatRoas(results.roas)}</dd>
          </div>
          <div className="result-item">
            <dt>Break-even ROAS</dt>
            <dd>{formatRoas(results.breakEvenRoas)}</dd>
          </div>
        </dl>
        {contributionPerUnit !== null && parseInput(adSpend) > 0 && (
          <ProfitCurveChart
            adSpend={parseInput(adSpend)}
            sales={parseInput(sales)}
            contributionPerUnit={contributionPerUnit}
            breakEvenSpend={breakEvenSpend}
          />
        )}
        <NextStepsSection
          variant="ad-profit"
          model={model}
          profit={results.profit}
          roas={results.roas}
          breakEvenRoas={results.breakEvenRoas}
        />
      </CalculatorResults>
    </div>
  );
}
