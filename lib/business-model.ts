export type BusinessModel = "ecommerce" | "leadgen";

export function effectiveConversionValue(
  model: BusinessModel,
  value: number,
  closeRatePercent: number
): number {
  if (model === "leadgen") {
    return value * (closeRatePercent / 100);
  }
  return value;
}

export function getValueFieldLabels(model: BusinessModel) {
  if (model === "leadgen") {
    return {
      value: "Customer value ($)",
      valueHint: "Revenue per closed customer, before ad costs",
      closeRate: "Close rate (%)",
      closeRateHint: "Percent of leads that become paying customers",
      fixedCost: "Fixed cost per lead ($)",
      fixedCostHint: "Optional: fulfillment, onboarding, etc.",
      conversion: "Lead conversion rate (%)",
      conversionHint: "Percent of clicks that become leads",
      sales: "Leads",
      salesHint: "Number of leads generated from ads",
      contribution: "Contribution per lead",
      breakEvenSales: "Break-even leads needed",
      maxAcquisition: "Max cost per lead (break-even)",
      effectiveValue:
        "Expected revenue per lead (customer value × close rate)",
    };
  }

  return {
    value: "Average order value (AOV)",
    valueHint: "Revenue per sale, before ad costs",
    closeRate: "Close rate (%)",
    closeRateHint: "",
    fixedCost: "Fixed cost per order ($)",
    fixedCostHint: "Optional: shipping, payment fees, etc.",
    conversion: "Conversion rate (%)",
    conversionHint: "Clicks that become sales (for max CPC)",
    sales: "Sales (conversions)",
    salesHint: "Number of sales from ads",
    contribution: "Contribution per order",
    breakEvenSales: "Break-even sales needed",
    maxAcquisition: "Max CPA (break-even)",
    effectiveValue: "Average order value (AOV)",
  };
}

export function getRequiredFields(
  model: BusinessModel,
  fields: string[]
): string[] {
  return model === "leadgen" ? [...fields, "closeRate"] : fields;
}
