import React, { useState } from "react";
import { DEDICATED_SERVICES, SERVICE_PACKAGES } from "../data/agencyData";
import { ServicePackage, CalculatedEstimate, CalculatorState, DedicatedService } from "../types";
import {
  Palette,
  Code2,
  Smartphone,
  Target,
  ShoppingBag,
  Building2,
  RefreshCw,
  Zap,
  ShieldCheck,
  Check,
  ArrowRight,
  Clock,
  Layers,
  Calculator,
  Grid3X3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Container, Button, Badge, Card } from "./ui";
import { PricingCalculator } from "./PricingCalculator";

interface ServicesSectionProps {
  onSelectPackage: (pkg: ServicePackage) => void;
  onLockInEstimate?: (estimate: CalculatedEstimate, state: CalculatorState) => void;
  onSelectDedicatedService?: (service: DedicatedService) => void;
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Code2,
  Smartphone,
  Target,
  ShoppingBag,
  Building2,
  RefreshCw,
  Zap,
  ShieldCheck,
};

type ViewMode = "services" | "packages" | "calculator";
type ServiceCategoryFilter = "All" | "Design" | "Development" | "Optimization & Support";

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectPackage,
  onLockInEstimate,
  onSelectDedicatedService,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("services");
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategoryFilter>("All");

  const handleCtaClick = (service: DedicatedService) => {
    if (onSelectDedicatedService) {
      onSelectDedicatedService(service);
    } else {
      onSelectPackage({
        id: service.id,
        title: service.title,
        tagline: service.description,
        startingPrice: "Custom Quote",
        timeline: service.typicalTimeline,
        deliverables: service.relevantFeatures,
        idealFor: service.title,
        techHighlights: ["React", "TypeScript", "Tailwind CSS"],
      });
    }
  };

  const filteredServices = DEDICATED_SERVICES.filter((srv) => {
    if (categoryFilter === "All") return true;
    return srv.category === categoryFilter;
  });

  return (
    <section id="services" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Dedicated Web Services
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Web Engineering Services{" "}
            <span className="text-[#D4A72C]">
              Built for Growth
            </span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed">
            From initial wireframing and modern responsive engineering to high-converting landing pages and proactive maintenance.
            No overpromising, zero template bloat, and 100% unconditional code ownership.
          </p>

          {/* Primary View Switcher: Services Grid vs Fixed Packages vs Scope Calculator */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs mt-8 flex-wrap justify-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode("services")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === "services"
                  ? "bg-[#0B1726] text-[#D4A72C] shadow-sm"
                  : "text-[#111827]/70 hover:text-[#0B1726]"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span>All 9 Services</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("packages")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === "packages"
                  ? "bg-[#0B1726] text-[#D4A72C] shadow-sm"
                  : "text-[#111827]/70 hover:text-[#0B1726]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Bundled Packages</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("calculator")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === "calculator"
                  ? "bg-[#0B1726] text-[#D4A72C] shadow-sm"
                  : "text-[#111827]/70 hover:text-[#0B1726]"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Scope Calculator</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: DEDICATED SERVICES GRID */}
        {viewMode === "services" && (
          <div>
            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-8 sm:mb-10">
              {(["All", "Design", "Development", "Optimization & Support"] as ServiceCategoryFilter[]).map((cat) => {
                const count =
                  cat === "All"
                    ? DEDICATED_SERVICES.length
                    : DEDICATED_SERVICES.filter((s) => s.category === cat).length;
                const isSelected = categoryFilter === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3.5 sm:px-4 py-2 min-h-[44px] inline-flex items-center justify-center rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? "bg-[#0B1726] text-[#D4A72C] border-[#0B1726] shadow-xs"
                        : "bg-white text-[#111827]/70 border-[#E5E7EB] hover:border-[#0B1726]/40 hover:text-[#0B1726]"
                    }`}
                  >
                    {cat} <span className="opacity-70 text-[11px]">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* 9 Services Grid (3 Columns on desktop, 2 on tablet, 1 on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {filteredServices.map((service) => {
                const IconComponent = SERVICE_ICONS[service.iconName] || Code2;

                return (
                  <Card
                    key={service.id}
                    variant="default"
                    padding="lg"
                    className="bg-white border-[#E5E7EB] hover:border-[#0B1726]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between rounded-3xl group"
                  >
                    <div>
                      {/* Top Header: Icon, Category & Timeline */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#0B1726] text-[#D4A72C] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB] font-bold">
                            {service.category}
                          </span>
                          <span className="text-[11px] text-[#111827]/60 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-[#D4A72C]" />
                            {service.typicalTimeline}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B1726] tracking-tight mb-2 group-hover:text-[#0B1726]">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#111827]/75 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Relevant Features List */}
                      <div className="space-y-2.5 pt-4 border-t border-[#E5E7EB] mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block">
                          Relevant Features:
                        </span>
                        {service.relevantFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-[#111827]/85">
                            <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-600" />
                            </div>
                            <span className="leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-5 border-t border-[#E5E7EB]">
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => handleCtaClick(service)}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#0B1726] group-hover:translate-x-0.5 transition-transform" />}
                        className="text-xs font-bold justify-between bg-[#F7F7F5] hover:bg-[#0B1726] hover:text-[#D4A72C] transition-all border border-[#E5E7EB]"
                      >
                        <span>{service.ctaText}</span>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Bottom Service Commitment Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#0B1726]">
                    Our Engineering Guarantee
                  </h4>
                  <p className="text-xs sm:text-sm text-[#111827]/70 mt-0.5">
                    Every service is executed directly by lead engineer Hanzla Nathiyal. No outsourced junior developers, no template code, and full handover upon completion.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("calculator")}
                className="px-5 py-2.5 rounded-xl bg-[#0B1726] text-[#D4A72C] hover:bg-[#1E293B] text-xs font-bold whitespace-nowrap shrink-0 transition-colors shadow-xs"
              >
                Estimate Scope & Timeline
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: BUNDLED PACKAGES */}
        {viewMode === "packages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {SERVICE_PACKAGES.map((pkg) => (
              <Card
                key={pkg.id}
                variant={pkg.featured ? "elevated" : "default"}
                padding="lg"
                className={`flex flex-col justify-between relative transition-all duration-300 rounded-3xl ${
                  pkg.featured
                    ? "border-2 border-[#0B1726] shadow-xl scale-100 lg:-translate-y-2 bg-white"
                    : "border-[#E5E7EB] bg-white hover:border-[#0B1726]/30 shadow-xs"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xs ${
                        pkg.featured
                          ? "bg-[#0B1726] text-[#D4A72C] border border-[#D4A72C]/40"
                          : "bg-white text-[#0B1726] border border-[#E5E7EB]"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#0B1726] mb-2">{pkg.title}</h3>
                  <p className="text-xs sm:text-sm text-[#111827]/70 leading-relaxed mb-6">{pkg.tagline}</p>

                  <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] mb-6">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#111827]/60 font-medium">Starting from</span>
                      <span className="font-display text-2xl sm:text-3xl font-black text-[#0B1726]">
                        {pkg.startingPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#0B1726] font-semibold mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4A72C]" />
                      <span>Typical Delivery: {pkg.timeline}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block mb-1">
                      Best Suited For:
                    </span>
                    <p className="text-xs sm:text-sm text-[#111827]/80 leading-relaxed">{pkg.idealFor}</p>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block mb-2">
                      Key Deliverables:
                    </span>
                    {pkg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111827]/85">
                        <div className="w-4 h-4 rounded-full bg-[#0B1726]/5 border border-[#0B1726]/20 flex items-center justify-center text-[#0B1726] shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3] text-[#D4A72C]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E5E7EB] space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.techHighlights.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant={pkg.featured ? "primary" : "secondary"}
                    size="md"
                    fullWidth
                    onClick={() => onSelectPackage(pkg)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />}
                  >
                    Select {pkg.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* VIEW 3: CUSTOM SCOPE CALCULATOR */}
        {viewMode === "calculator" && (
          <div className="mt-4">
            {onLockInEstimate ? (
              <PricingCalculator onLockInEstimate={onLockInEstimate} embedMode={true} />
            ) : (
              <PricingCalculator onLockInEstimate={() => {}} embedMode={true} />
            )}
          </div>
        )}
      </Container>
    </section>
  );
};
