"use client";

import type { BusinessModel } from "@/lib/business-model";

interface BusinessModelToggleProps {
  model: BusinessModel;
  onChange: (model: BusinessModel) => void;
}

export default function BusinessModelToggle({
  model,
  onChange,
}: BusinessModelToggleProps) {
  return (
    <fieldset className="business-model-toggle">
      <legend>Business model</legend>
      <div className="business-model-options">
        <label>
          <input
            type="radio"
            name="business-model"
            value="ecommerce"
            checked={model === "ecommerce"}
            onChange={() => onChange("ecommerce")}
          />
          Ecommerce
        </label>
        <label>
          <input
            type="radio"
            name="business-model"
            value="leadgen"
            checked={model === "leadgen"}
            onChange={() => onChange("leadgen")}
          />
          Lead gen
        </label>
      </div>
    </fieldset>
  );
}
