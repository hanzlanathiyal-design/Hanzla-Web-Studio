import React, { useState } from "react";
import {
  Briefcase,
  UtensilsCrossed,
  Home,
  ShoppingBag,
  Palette,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Container } from "./ui/Container";
import { Badge } from "./ui/Badge";
import { IndustryType } from "../types";

export interface BuildTypeCard {
  id: string;
  title: string;
  industryTag: string;
  matchingFilter?: IndustryType;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
  ctaText: string;
}

interface WhatIBuildSectionProps {
  onSelectBuildType: (card: BuildTypeCard) => void;
  onFilterPortfolio?: (industry: IndustryType) => void;
}

export const WhatIBuildSection: React.FC<WhatIBuildSectionProps> = ({
  onSelectBuildType,
  onFilterPortfolio,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const buildCards: BuildTypeCard[] = [
    {
      id: "business-websites",
      title: "Business Websites",
      industryTag: "Corporate & B2B",
      matchingFilter: "B2B SaaS & Tech",
      icon: Briefcase,
      description:
        "High-authority corporate and service platforms structured to communicate credibility, articulate complex offerings, and convert visitors into qualified sales inquiries.",
      highlights: [
        "Inbound lead capture pipelines",
        "Trust & credibility architecture",
        "Services & case study showcases",
      ],
      ctaText: "Get a Business Site Concept",
    },
    {
      id: "restaurant-websites",
      title: "Restaurant Websites",
      industryTag: "Hospitality & Dining",
      matchingFilter: "Hospitality & Dining",
      icon: UtensilsCrossed,
      description:
        "Appetizing, mobile-optimized digital storefronts featuring interactive menus, location & hours finders, reservation system integration, and direct online ordering links.",
      highlights: [
        "Mobile-first interactive menus",
        "Table reservation integration",
        "Google Maps & opening hours",
      ],
      ctaText: "Get a Restaurant Site Concept",
    },
    {
      id: "real-estate-websites",
      title: "Real Estate Websites",
      industryTag: "Property & Estates",
      matchingFilter: "Real Estate & Estates",
      icon: Home,
      description:
        "High-impact property showcase platforms featuring immersive photo galleries, neighborhood guides, virtual walkthrough embeds, and direct viewing inquiry forms.",
      highlights: [
        "Featured listings & galleries",
        "Virtual walkthrough embeds",
        "Private viewing inquiry forms",
      ],
      ctaText: "Get a Real Estate Site Concept",
    },
    {
      id: "ecommerce-websites",
      title: "E-commerce",
      industryTag: "Digital Retail & Brands",
      matchingFilter: "E-Commerce & Retail",
      icon: ShoppingBag,
      description:
        "High-speed digital stores engineered for frictionless product discovery, instant cart interactions, secure checkout gateways (Stripe, Shopify), and high mobile conversion.",
      highlights: [
        "Fast catalog filtering & search",
        "Secure checkout integrations",
        "Mobile cart & conversion UX",
      ],
      ctaText: "Get an E-commerce Concept",
    },
    {
      id: "portfolio-websites",
      title: "Portfolio Websites",
      industryTag: "Creatives & Executives",
      matchingFilter: "Professional Services",
      icon: Palette,
      description:
        "Bespoke digital showcases built for designers, architects, consultants, and founders to display signature work, highlight client milestones, and attract high-tier clients.",
      highlights: [
        "Interactive case study layouts",
        "Curated visual media galleries",
        "Press mentions & bio profiles",
      ],
      ctaText: "Get a Portfolio Concept",
    },
    {
      id: "booking-websites",
      title: "Booking Websites",
      industryTag: "Service Providers",
      matchingFilter: "Healthcare & Medical",
      icon: CalendarCheck,
      description:
        "Automated scheduling engines with real-time calendar availability, client intake questionnaires, deposit or upfront payment processing, and automated reminders.",
      highlights: [
        "Real-time calendar synchronization",
        "Upfront deposit or full payment",
        "Automated appointment reminders",
      ],
      ctaText: "Get a Booking Site Concept",
    },
  ];

  return (
    <section
      id="what-i-build"
      aria-label="What I Build - Multi-Industry Web Solutions"
      className="py-20 sm:py-28 bg-[#F7F7F5] border-t border-[#E5E7EB] relative"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Multi-Industry Web Engineering
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            What I Build
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed">
            Every business model operates under unique customer journeys and conversion goals.
            Hanzla Web Studio delivers bespoke web solutions engineered specifically for your industry.
          </p>
        </div>

        {/* Multi-Industry 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {buildCards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                id={`card-${card.id}`}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative border ${
                  isHovered
                    ? "bg-white border-[#D4A72C] shadow-xl shadow-[#0B1726]/8 -translate-y-1.5"
                    : "bg-white border-[#E5E7EB] shadow-xs"
                }`}
              >
                <div>
                  {/* Top Bar: Icon, Industry Tag & Sequential Index */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "bg-[#0B1726] text-[#D4A72C] scale-105 shadow-xs"
                          : "bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#0B1726]/5 text-[#0B1726] border border-[#0B1726]/10">
                        {card.industryTag}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#111827]/40">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1726] tracking-tight mb-3">
                    {card.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-[#111827]/75 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-[#E5E7EB]/80">
                    {card.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2.5 text-xs text-[#111827]/85"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Block with Hover Interaction */}
                <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectBuildType(card)}
                    className={`w-full py-3 px-4 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] ${
                      isHovered
                        ? "bg-[#0B1726] text-white shadow-md shadow-[#0B1726]/15 hover:bg-[#111827]"
                        : "bg-[#F7F7F5] text-[#0B1726] hover:bg-[#E5E7EB]/70 border border-[#E5E7EB]"
                    }`}
                  >
                    <Sparkles
                      className={`w-3.5 h-3.5 transition-colors ${
                        isHovered ? "text-[#D4A72C]" : "text-[#0B1726]/60"
                      }`}
                    />
                    <span>{card.ctaText}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isHovered ? "translate-x-1 text-[#D4A72C]" : "text-[#0B1726]/60"
                      }`}
                    />
                  </button>

                  {/* Optional quick jump to related case studies */}
                  {onFilterPortfolio && card.matchingFilter && (
                    <button
                      type="button"
                      onClick={() => onFilterPortfolio(card.matchingFilter!)}
                      className="text-[11px] font-semibold text-[#111827]/60 hover:text-[#0B1726] text-center py-1 transition-colors"
                    >
                      View related case studies in Work →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Industry Reassurance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0B1726] text-[#D4A72C] flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#0B1726]">
                Need a tailored platform for another industry?
              </h4>
              <p className="text-xs sm:text-sm text-[#111827]/70 mt-1 max-w-2xl leading-relaxed">
                We also engineer bespoke web applications for healthcare clinics, legal practices,
                educational academies, fintech ventures, and SaaS startups. Every project starts with custom architecture.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onSelectBuildType({
                id: "custom-web-platform",
                title: "Custom Web Platform",
                industryTag: "Cross-Industry",
                icon: Layers,
                description: "Custom digital platform engineered for your specific business requirements.",
                highlights: ["Tailored UX", "Custom API integrations", "Dedicated roadmap"],
                ctaText: "Request Custom Concept",
              })
            }
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0B1726] text-white text-xs sm:text-sm font-bold hover:bg-[#111827] transition-all flex items-center gap-2 border border-[#D4A72C]/40 shadow-xs"
          >
            <span>Discuss Custom Build</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />
          </button>
        </div>
      </Container>
    </section>
  );
};
