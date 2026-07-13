import type { BusinessModel } from "@/lib/business-model";

export const ECOMMERCE_EXAMPLE = {
  model: "ecommerce" as BusinessModel,
  value: "90",
  margin: "50",
  adSpend: "1000",
  conversionRate: "2",
  closeRate: "",
  sales: "25",
  fixedCost: "6",
};

export const LEADGEN_EXAMPLE = {
  model: "leadgen" as BusinessModel,
  value: "5000",
  margin: "60",
  adSpend: "2000",
  conversionRate: "3",
  closeRate: "15",
  sales: "40",
  fixedCost: "0",
};

export function exampleForModel(model: BusinessModel) {
  return model === "leadgen" ? LEADGEN_EXAMPLE : ECOMMERCE_EXAMPLE;
}
