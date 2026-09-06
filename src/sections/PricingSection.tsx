import React from "react";
import { PricingCalculator } from "../components/PricingCalculator";
import { CalculatedEstimate, CalculatorState } from "../types";

interface PricingSectionProps {
  onLockInEstimate: (estimate: CalculatedEstimate, state: CalculatorState) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onLockInEstimate }) => {
  return (
    <section id="calculator" aria-label="Scope and Pricing Calculator" className="relative scroll-mt-20">
      <PricingCalculator onLockInEstimate={onLockInEstimate} />
    </section>
  );
};
