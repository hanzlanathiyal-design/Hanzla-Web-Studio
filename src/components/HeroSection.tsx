import React from "react";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp, ChevronRight, Award } from "lucide-react";
import { IndustryType } from "../types";
import { Container, Button, Badge } from "./ui";

interface HeroSectionProps {
  onSelectIndustry: (industry: IndustryType) => void;
  onOpenInquiry: () => void;
  onOpenCalculator: () => void;
  onOpenAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectIndustry,
  onOpenInquiry,
  onOpenCalculator,
  onOpenAudit,
}) => {
  const industries: { label: string; value: IndustryType }[] = [
    { label: "B2B SaaS & Tech", value: "B2B SaaS & Tech" },
    { label: "E-Commerce & Retail", value: "E-Commerce & Retail" },
    { label: "Professional Services", value: "Professional Services" },
    { label: "Healthcare & Clinics", value: "Healthcare & Medical" },
    { label: "Real Estate & Estates", value: "Real Estate & Estates" },
  ];

  return (
    <section id="home" className="relative pt-10 sm:pt-16 md:pt-24 lg:pt-28 pb-14 sm:pb-20 md:pb-24 overflow-hidden bg-[#F7F7F5]">
      <Container size="xl" className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top trust badge */}
          <div className="inline-flex items-center mb-5 sm:mb-7">
            <Badge variant="navy" size="sm" dot>
              Hanzla Web Studio • Engineering Credibility & Conversion
            </Badge>
          </div>

          {/* Main Brand Positioning Headline */}
          <h1 className="font-display text-3xl min-[360px]:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-[#0B1726] tracking-tight leading-[1.08] sm:leading-[1.02] mb-5 sm:mb-6">
            We Build Websites That{" "}
            <span className="text-[#D4A72C]">
              Make Businesses Look Better Online.
            </span>
          </h1>

          {/* Supporting Brand Message */}
          <p className="text-base sm:text-lg md:text-xl text-[#111827]/80 font-normal leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-10 px-2 sm:px-0">
            Modern, fast and responsive websites designed to help businesses build credibility, showcase their services and turn visitors into customers.
          </p>

          {/* Clear CTA Hierarchy */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mb-10 sm:mb-12 w-full max-w-md sm:max-w-none mx-auto">
            <Button
              id="hero-inquiry-cta"
              size="lg"
              variant="primary"
              onClick={onOpenInquiry}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D4A72C]" />}
              className="w-full sm:w-auto shadow-sm"
            >
              Start a Project
            </Button>

            <Button
              id="hero-calculator-cta"
              size="lg"
              variant="secondary"
              onClick={onOpenCalculator}
              rightIcon={<ChevronRight className="w-4 h-4 text-[#D4A72C]" />}
              className="w-full sm:w-auto"
            >
              Calculate Project Cost
            </Button>

            <Button
              id="hero-audit-cta"
              size="lg"
              variant="outline"
              onClick={onOpenAudit}
              leftIcon={<Sparkles className="w-4 h-4 text-[#D4A72C]" />}
              className="w-full sm:w-auto"
            >
              Free 60-Sec Audit
            </Button>
          </div>

          {/* Multi-Industry Quick Selection */}
          <div className="pt-6 sm:pt-7 border-t border-[#E5E7EB]">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#111827]/60 mb-3.5">
              Engineered Architectures Across High-Value Sectors:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {industries.map((ind) => (
                <button
                  key={ind.value}
                  type="button"
                  onClick={() => {
                    onSelectIndustry(ind.value);
                    const el = document.getElementById("work");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold px-3.5 py-2 rounded-full bg-white hover:bg-[#F7F7F5] text-[#111827] hover:text-[#0B1726] border border-[#E5E7EB] hover:border-[#0B1726]/40 transition-all shadow-2xs min-h-[44px] inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726]"
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Studio Engineering Standards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(11,23,38,0.04)] hover:border-[#D4A72C]/40 transition-all text-left">
            <div className="flex items-center gap-1.5 text-[#0B1726] mb-1">
              <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1726] tracking-tight">Bespoke</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#111827]/70 mt-1">Modern Design</p>
            <p className="text-xs text-[#111827]/60 mt-1 hidden sm:block">Tailored visual identity without generic templates</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(11,23,38,0.04)] hover:border-[#D4A72C]/40 transition-all text-left">
            <div className="flex items-center gap-1.5 text-[#0B1726] mb-1">
              <Zap className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1726] tracking-tight">Fast</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#111827]/70 mt-1">Performance</p>
            <p className="text-xs text-[#111827]/60 mt-1 hidden sm:block">Sub-second loading optimized for Core Web Vitals</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(11,23,38,0.04)] hover:border-[#D4A72C]/40 transition-all text-left">
            <div className="flex items-center gap-1.5 text-[#0B1726] mb-1">
              <TrendingUp className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1726] tracking-tight">Optimized</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#111827]/70 mt-1">SEO Structure</p>
            <p className="text-xs text-[#111827]/60 mt-1 hidden sm:block">Semantic markup and metadata for Google search</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(11,23,38,0.04)] hover:border-[#D4A72C]/40 transition-all text-left">
            <div className="flex items-center gap-1.5 text-[#0B1726] mb-1">
              <Shield className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1726] tracking-tight">100%</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#111827]/70 mt-1">Code Ownership</p>
            <p className="text-xs text-[#111827]/60 mt-1 hidden sm:block">Unconditional source repository and asset handover</p>
          </div>
        </div>

        {/* Lead Engineer Guarantee Banner */}
        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto p-4 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs shadow-[0_1px_3px_rgba(11,23,38,0.04)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0B1726] rounded-lg flex items-center justify-center text-[#F7F7F5] font-bold text-xs shrink-0">
              HN
            </div>
            <div>
              <p className="font-bold text-[#0B1726]">Directed by Lead Engineer Hanzla Nathiyal</p>
              <p className="text-[#111827]/65 text-[11px] sm:text-xs">Direct senior collaboration on every design, architecture, and deployment decision.</p>
            </div>
          </div>
          <Badge variant="gold" size="sm" dot className="shrink-0 self-start sm:self-auto">
            Guaranteed 4-Hour Response
          </Badge>
        </div>
      </Container>
    </section>
  );
};
