import React, { useState, useMemo } from "react";
import { CalculatorState, CalculatedEstimate } from "../types";
import { Calculator, Check, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { calculatorService, AVAILABLE_FEATURES } from "../services";
import { Container, Card, Button, Badge, Select } from "./ui";

interface PricingCalculatorProps {
  onLockInEstimate: (estimate: CalculatedEstimate, state: CalculatorState) => void;
  embedMode?: boolean;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onLockInEstimate,
  embedMode = false,
}) => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    industry: "E-Commerce & Retail",
    projectType: "business_corporate",
    scale: "growth",
    features: ["cms", "crm_webhooks"],
    designLevel: "high_end",
    rushDelivery: false,
  });

  const availableFeatures = AVAILABLE_FEATURES;

  const toggleFeature = (id: string) => {
    setCalculatorState((prev) => {
      const exists = prev.features.includes(id);
      return {
        ...prev,
        features: exists ? prev.features.filter((f) => f !== id) : [...prev.features, id],
      };
    });
  };

  const calculated: CalculatedEstimate = useMemo(() => {
    return calculatorService.calculateEstimate(calculatorState);
  }, [calculatorState]);

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start max-w-6xl mx-auto">
      {/* Left Column: Interactive Scope Configurator */}
          <Card variant="elevated" className="lg:col-span-7 p-4 sm:p-7 md:p-8 space-y-5 sm:space-y-6 border-[#E5E7EB] bg-white">
            {/* 1. Industry Selection */}
            <div>
              <Select
                label="1. Select Your Target Industry"
                value={calculatorState.industry}
                onChange={(e) => setCalculatorState({ ...calculatorState, industry: e.target.value })}
                options={[
                  { value: "B2B SaaS & Tech", label: "B2B SaaS & Tech" },
                  { value: "E-Commerce & Retail", label: "E-Commerce & Retail" },
                  { value: "Professional Services", label: "Professional Services (Legal, Financial, Consulting)" },
                  { value: "Healthcare & Medical", label: "Healthcare & Medical" },
                  { value: "Real Estate & Estates", label: "Real Estate & Estates" },
                  { value: "Hospitality & Dining", label: "Hospitality & Dining" },
                  { value: "Other Multi-Industry", label: "Other Multi-Industry Enterprise" },
                ]}
              />
            </div>

            {/* 2. Project Type */}
            <fieldset>
              <legend className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">
                2. Project Architecture Type
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5" role="radiogroup" aria-label="Project Architecture Type">
                {[
                  {
                    id: "conversion_landing",
                    title: "High-Velocity Launch Page",
                    desc: "Single high-conversion landing page",
                  },
                  {
                    id: "business_corporate",
                    title: "Authority Business Site",
                    desc: "8-12 bespoke tailored pages",
                  },
                  {
                    id: "ecommerce_store",
                    title: "Headless E-Commerce Store",
                    desc: "Next.js + Shopify / Stripe API",
                  },
                  {
                    id: "custom_webapp",
                    title: "Custom Full-Stack Web App",
                    desc: "Client portal, auth, workflows",
                  },
                ].map((item) => {
                  const isSelected = calculatorState.projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() =>
                        setCalculatorState({
                          ...calculatorState,
                          projectType: item.id as any,
                        })
                      }
                      className={`p-3 sm:p-3.5 rounded-xl text-left border transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-1 min-h-[44px] ${
                        isSelected
                          ? "bg-[#0B1726] border-[#0B1726] text-[#F7F7F5] shadow-xs"
                          : "bg-[#F7F7F5] hover:bg-white border-[#E5E7EB] text-[#111827] hover:border-[#0B1726]/30"
                      }`}
                    >
                      <div className={`font-semibold text-xs flex items-center justify-between ${
                        isSelected ? "text-[#F7F7F5]" : "text-[#0B1726]"
                      }`}>
                        <span>{item.title}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" aria-hidden="true" />
                        )}
                      </div>
                      <div className={`text-[11px] mt-1 ${
                        isSelected ? "text-[#E5E7EB]/90" : "text-zinc-600"
                      }`}>{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 3. Business Scale */}
            <fieldset>
              <legend className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">
                3. Business Scale & Traffic Volume
              </legend>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2" role="radiogroup" aria-label="Business Scale and Traffic Volume">
                {[
                  { id: "startup", label: "Emerging / Startup" },
                  { id: "growth", label: "Growing Mid-Market" },
                  { id: "enterprise", label: "Established Enterprise" },
                ].map((scale) => {
                  const isSelected = calculatorState.scale === scale.id;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() =>
                        setCalculatorState({
                          ...calculatorState,
                          scale: scale.id as any,
                        })
                      }
                      className={`py-2.5 px-3 rounded-xl text-center text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-1 min-h-[44px] flex items-center justify-center ${
                        isSelected
                          ? "bg-[#0B1726] text-[#F7F7F5] border border-[#0B1726] font-bold shadow-xs"
                          : "bg-[#F7F7F5] hover:bg-white border-[#E5E7EB] text-zinc-700 hover:text-[#0B1726] font-medium"
                      }`}
                    >
                      {scale.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 4. Advanced Modular Features */}
            <fieldset>
              <legend className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">
                4. Select Optional Modular Features
              </legend>
              <div className="space-y-1.5 sm:space-y-2">
                {availableFeatures.map((feat) => {
                  const isChecked = calculatorState.features.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleFeature(feat.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-1 min-h-[44px] text-left ${
                        isChecked
                          ? "bg-[#0B1726]/5 border-[#0B1726]/40 text-[#0B1726]"
                          : "bg-[#F7F7F5] hover:bg-white border-[#E5E7EB] text-zinc-800 hover:border-[#0B1726]/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-[#0B1726] border-[#0B1726] text-[#D4A72C]"
                              : "border-[#D1D5DB] bg-white"
                          }`}
                          aria-hidden="true"
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{feat.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#0B1726] shrink-0">
                        +${feat.cost}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 5. Design Level & Rush Delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-[#E5E7EB]">
              <div>
                <Select
                  label="Design Fidelity"
                  value={calculatorState.designLevel}
                  onChange={(e) =>
                    setCalculatorState({
                      ...calculatorState,
                      designLevel: e.target.value as any,
                    })
                  }
                  options={[
                    { value: "high_end", label: "High-End Studio Design (Included)" },
                    { value: "bespoke_motion", label: "Bespoke Luxury Tier & 3D Motion (+$1,400)" },
                  ]}
                />
              </div>

              <div>
                <label id="rush-delivery-label" className="block text-xs font-bold text-zinc-900 mb-1.5">
                  Timeline Urgency
                </label>
                <button
                  type="button"
                  role="switch"
                  aria-checked={calculatorState.rushDelivery}
                  aria-labelledby="rush-delivery-label"
                  onClick={() =>
                    setCalculatorState({
                      ...calculatorState,
                      rushDelivery: !calculatorState.rushDelivery,
                    })
                  }
                  className={`w-full h-11 sm:h-10 px-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-1 ${
                    calculatorState.rushDelivery
                      ? "bg-[#D4A72C]/20 border-[#D4A72C] text-[#0B1726] font-semibold"
                      : "bg-white border-[#E5E7EB] text-zinc-700 hover:border-[#0B1726]/30"
                  }`}
                >
                  <span className="text-xs font-medium">Accelerated Rush Delivery</span>
                  <span className="text-xs font-mono font-bold">
                    {calculatorState.rushDelivery ? "+$1,200" : "Standard"}
                  </span>
                </button>
              </div>
            </div>
          </Card>

          {/* Right Column: Live Output & 1-Click Proposal Lock-In */}
          <Card variant="elevated" className="lg:col-span-5 p-5 sm:p-7 md:p-8 relative lg:sticky lg:top-24 border-[#E5E7EB] bg-white">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E7EB]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0B1726]">
                Transparent Estimate
              </span>
              <Badge variant="gold" size="sm">
                Fixed-Price Guarantee
              </Badge>
            </div>

            {/* Price Output */}
            <div className="py-5 sm:py-6" aria-live="polite" aria-atomic="true">
              <span className="text-xs text-zinc-600 font-medium">Estimated Studio Investment</span>
              <div className="font-display text-2xl min-[360px]:text-3xl sm:text-4xl font-black text-[#0B1726] mt-1 tracking-tight">
                ${calculated.estimatedCostMin.toLocaleString()} – ${calculated.estimatedCostMax.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#0B1726] font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" aria-hidden="true" />
                <span>
                  Projected Timeline: {calculated.estimatedTimelineMin} to {calculated.estimatedTimelineMax} Weeks
                </span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2.5 pb-5 border-b border-[#E5E7EB]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-700 block">
                What's Included in This Scope:
              </span>
              <div className="space-y-1.5">
                {calculated.deliverablesList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#111827]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Stack */}
            <div className="py-3.5 border-b border-[#E5E7EB]">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-700 block mb-2">
                Target Architecture:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {calculated.recommendedStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-[#E5E7EB] text-[#0B1726]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust and Conversion CTA */}
            <div className="pt-5 space-y-3">
              <Button
                id="calculator-lock-in-cta"
                size="lg"
                variant="primary"
                fullWidth
                onClick={() => onLockInEstimate(calculated, calculatorState)}
                rightIcon={<ArrowRight className="w-4 h-4 text-[#D4A72C]" />}
              >
                Lock In Scope & Request Proposal
              </Button>

              <p className="text-[11px] text-center text-zinc-600 leading-normal">
                100% confidential. No spam. You'll receive a detailed milestone breakdown within 4 business hours.
              </p>
            </div>
          </Card>
        </div>
  );

  if (embedMode) {
    return content;
  }

  return (
    <section id="calculator" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Transparent Pricing Engine
            </Badge>
          </div>
          <h2 className="font-display text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Calculate your project scope and{" "}
            <span className="text-[#D4A72C]">
              honest investment.
            </span>
          </h2>
          <p className="text-[#111827]/75 text-xs sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            No hidden hourly bloat or vague estimates. Configure your requirements below to see an instant transparent
            investment estimate and delivery timeline.
          </p>
        </div>
        {content}
      </Container>
    </section>
  );
};
