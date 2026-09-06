import React, { useState } from "react";
import { AGENCY_PROCESS } from "../data/agencyData";
import {
  Search,
  Palette,
  Code2,
  Rocket,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Container, Button, Badge, Card } from "./ui";

interface ProcessSectionProps {
  onStartProject: () => void;
}

const STEP_ICONS = [Search, Palette, Code2, Rocket];

const STEP_ACTIVITIES = [
  ["Stakeholder Interviews", "Audience & Competitor Analysis", "Core Conversion Goals"],
  ["Visual Direction & Moodboard", "Figma Page Wireframes", "Interactive UX Prototype"],
  ["Clean TypeScript & React", "API & Third-party Integrations", "Sub-second Speed Tuning"],
  ["Cross-browser QA & Testing", "DNS, SSL & Search Indexing", "100% Code & Asset Handover"],
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartProject }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="process" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Clear 4-Step Blueprint
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            How We Build <span className="text-[#D4A72C]">Your Website</span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed">
            A transparent, disciplined roadmap with zero guesswork. From initial diagnosis to production handover, you always know what is being built and when.
          </p>
        </div>

        {/* Visual Progress Connector Bar (Desktop & Tablet) */}
        <div className="hidden lg:block relative mb-12 max-w-6xl mx-auto px-10">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-0.5 bg-[#E5E7EB]">
            <div
              className="h-full bg-gradient-to-r from-[#0B1726] via-[#D4A72C] to-emerald-500 transition-all duration-500"
              style={{ width: `${((activeStepIndex + 1) / 4) * 100}%` }}
            />
          </div>

          {/* Connected Step Markers */}
          <div className="relative z-10 flex justify-between">
            {AGENCY_PROCESS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isCompleted = idx < activeStepIndex;
              const Icon = STEP_ICONS[idx];

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-col items-center group focus:outline-none`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-sm transition-all duration-300 shadow-md ${
                      isSelected
                        ? "bg-[#0B1726] text-[#D4A72C] ring-4 ring-[#D4A72C]/30 scale-110"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-[#111827]/60 border border-[#E5E7EB] hover:border-[#0B1726]/40"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2.5 text-xs font-bold font-mono tracking-wider transition-colors ${
                      isSelected ? "text-[#0B1726]" : "text-[#111827]/60"
                    }`}
                  >
                    Phase {step.number}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Four-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {AGENCY_PROCESS.map((step, idx) => {
            const Icon = STEP_ICONS[idx];
            const isSelected = activeStepIndex === idx;
            const activities = STEP_ACTIVITIES[idx];

            return (
              <div
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`cursor-pointer rounded-3xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between relative bg-white border ${
                  isSelected
                    ? "border-[#0B1726] shadow-xl ring-2 ring-[#0B1726]/10 -translate-y-1.5"
                    : "border-[#E5E7EB] hover:border-[#0B1726]/30 shadow-xs hover:shadow-md"
                }`}
              >
                {/* Visual Arrow Indicator between cards (desktop only) */}
                {idx < 3 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-[#E5E7EB] shadow-xs items-center justify-center text-[#111827]/40">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}

                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`font-mono text-sm font-black px-3 py-1.5 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-[#0B1726] text-[#D4A72C]"
                          : "bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB]"
                      }`}
                    >
                      {step.number}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#D4A72C]/15 text-[#0B1726]"
                          : "bg-[#F7F7F5] text-[#111827]/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title formatted as: "01 — Discover" */}
                  <h3 className="font-display text-xl sm:text-2xl font-black text-[#0B1726] tracking-tight">
                    {step.number} — {step.title}
                  </h3>

                  {/* Core Description requested by user */}
                  <p className="text-xs sm:text-sm text-[#111827]/80 font-medium mt-3 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Visual Activity Checklist */}
                  <div className="mt-6 pt-5 border-t border-[#E5E7EB] space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block">
                      Key Activities:
                    </span>
                    {activities.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-[#111827]/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Assurance & Deliverable */}
                <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                  <div className="text-[11px] text-[#0B1726] font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{step.guarantee}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Spotlight Card for Active Step */}
        <div className="mt-10 max-w-4xl mx-auto">
          <Card
            variant="elevated"
            padding="lg"
            className="bg-white border-[#E5E7EB] p-6 sm:p-8 rounded-3xl shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0B1726] text-[#D4A72C]">
                  Phase {AGENCY_PROCESS[activeStepIndex].number} Spotlight
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#0B1726]">
                  {AGENCY_PROCESS[activeStepIndex].number} — {AGENCY_PROCESS[activeStepIndex].title} Deliverables
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#111827]/60 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{AGENCY_PROCESS[activeStepIndex].timeline}</span>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block mb-1">
                  What You Receive:
                </span>
                <p className="text-[#0B1726] font-medium leading-relaxed">
                  {AGENCY_PROCESS[activeStepIndex].clientDeliverable}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block mb-1">
                  Client Assurance:
                </span>
                <p className="text-emerald-800 font-medium flex items-start gap-1.5 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{AGENCY_PROCESS[activeStepIndex].guarantee}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Process Bottom Assurance & Call to Action */}
        <Card
          variant="elevated"
          className="mt-10 max-w-4xl mx-auto p-6 sm:p-8 border-[#E5E7EB] bg-gradient-to-br from-[#0B1726] to-[#1E293B] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/40 text-[#D4A72C] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Step 01 Discovery Call</span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-black text-[#F7F7F5] tracking-tight">
              Ready to begin with Step 01?
            </h4>
            <p className="text-xs sm:text-sm text-[#E5E7EB]/75 mt-1 leading-relaxed max-w-xl">
              Book a 30-minute discovery call to dissect your business, target audience, and project goals with complete transparency.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={onStartProject}
            rightIcon={<ArrowRight className="w-4 h-4 text-[#0B1726]" />}
            className="bg-[#D4A72C] hover:bg-[#b88f22] text-[#0B1726] font-bold whitespace-nowrap shrink-0 w-full sm:w-auto px-6 py-3 shadow-md"
          >
            Start Project
          </Button>
        </Card>
      </Container>
    </section>
  );
};
