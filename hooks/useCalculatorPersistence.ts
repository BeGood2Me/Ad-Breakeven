"use client";

import { useEffect, useRef, useState } from "react";
import type { CalculatorId } from "@/lib/calculator-params";
import {
  mergeCalculatorState,
  saveCalculatorState,
  updateShareUrl,
} from "@/lib/calculator-params";

export function useCalculatorPersistence(
  id: CalculatorId,
  values: Record<string, string>,
  onLoad: (merged: Record<string, string>) => void,
  defaults: Record<string, string>
) {
  const [hydrated, setHydrated] = useState(false);
  const onLoadRef = useRef(onLoad);
  const skipShareUrlSync = useRef(true);
  onLoadRef.current = onLoad;

  useEffect(() => {
    skipShareUrlSync.current = true;
    onLoadRef.current(mergeCalculatorState(defaults, id));
    setHydrated(true);
  }, [id, defaults]);

  useEffect(() => {
    if (!hydrated) return;
    saveCalculatorState(id, values);
    if (skipShareUrlSync.current) {
      skipShareUrlSync.current = false;
      return;
    }
    updateShareUrl(values);
  }, [id, values, hydrated]);

  return { hydrated };
}
