import React, { useState } from "react";
import { X, Monitor, Tablet, Smartphone, CheckCircle2, ArrowRight, ShieldCheck, Code2, Sparkles, Layers } from "lucide-react";
import { IndustryCaseStudy } from "../types";
import { Button, Badge } from "./ui";

interface CaseStudyModalProps {
  study: IndustryCaseStudy | null;
  onClose: () => void;
  onRequestProposal: (study: IndustryCaseStudy) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onRequestProposal,
}) => {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0B1726]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F7F7F5]">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0B1726] text-[#D4A72C] text-xs font-bold tracking-wider">
              {study.statusBadge || "Concept Project"}
            </span>
            <span className="text-xs text-[#111827]/70 font-semibold">{study.projectType}</span>
            <span className="hidden sm:inline text-xs text-[#111827]/40">•</span>
            <span className="hidden sm:inline text-xs text-[#111827]/60 font-mono">{study.industry}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport switcher */}
            <div className="hidden sm:flex items-center bg-[#E5E7EB]/50 p-1 rounded-full border border-[#E5E7EB] text-xs">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all text-xs font-bold uppercase tracking-wider ${
                  deviceMode === "desktop"
                    ? "bg-[#0B1726] text-[#D4A72C] shadow-xs"
                    : "text-[#111827]/70 hover:text-[#0B1726]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("tablet")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all text-xs font-bold uppercase tracking-wider ${
                  deviceMode === "tablet"
                    ? "bg-[#0B1726] text-[#D4A72C] shadow-xs"
                    : "text-[#111827]/70 hover:text-[#0B1726]"
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all text-xs font-bold uppercase tracking-wider ${
                  deviceMode === "mobile"
                    ? "bg-[#0B1726] text-[#D4A72C] shadow-xs"
                    : "text-[#111827]/70 hover:text-[#0B1726]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white hover:bg-[#E5E7EB] text-[#111827] border border-[#E5E7EB] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Project Title & Status Notice */}
          <div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap mb-2">
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0B1726]">
                {study.title} — {study.projectType}
              </h2>
              <span className="text-xs font-medium text-[#111827]/60">
                Industry: <strong className="text-[#0B1726]">{study.industry}</strong>
              </span>
            </div>
            <p className="text-base text-[#111827]/80 font-medium leading-relaxed">
              {study.tagline}
            </p>

            {/* Honest Disclosure Banner */}
            <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1"></span>
              <p>
                <strong>{study.statusBadge || "Concept Project"}:</strong> Engineered as an architectural portfolio showcase demonstrating user interface design, responsive layout engineering, and conversion workflows for the {study.industry} sector.
              </p>
            </div>
          </div>

          {/* Interactive Device Showcase Viewport */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] flex flex-col items-center justify-center">
            <div
              className={`transition-all duration-300 w-full overflow-hidden ${
                deviceMode === "mobile"
                  ? "max-w-[340px] rounded-3xl border-4 border-[#0B1726] shadow-2xl bg-[#0B1726]"
                  : deviceMode === "tablet"
                  ? "max-w-[620px] rounded-2xl border-4 border-[#0B1726] shadow-2xl bg-[#0B1726]"
                  : "max-w-full rounded-xl border border-[#0B1726] shadow-xl bg-[#0B1726]"
              }`}
            >
              {/* Browser or Phone Header Bar */}
              <div className="bg-[#F7F7F5] px-3 py-2 border-b border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#111827]/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <span className="font-mono text-[#0B1726] truncate max-w-[200px]">
                  https://preview.{study.id}.hanzla.studio
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> SSL
                </span>
              </div>

              {/* Viewport Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={
                    deviceMode === "mobile"
                      ? study.livePreview.mobileMockupUrl
                      : study.livePreview.desktopMockupUrl
                  }
                  srcSet={`${study.livePreview.mobileMockupUrl} 600w, ${study.livePreview.desktopMockupUrl} 1200w`}
                  sizes="(max-width: 640px) 100vw, 1200px"
                  alt={`${study.title} - ${study.industry} website mockup displaying ${study.projectType} in ${deviceMode} mode`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{study.livePreview.headline}</p>
                    <p className="text-[#E5E7EB] text-xs">{study.livePreview.subheadline}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    {study.livePreview.highlights.map((h, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#D4A72C]/20 text-[#D4A72C] font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Challenge & Engineered Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#F7F7F5] border border-[#E5E7EB]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1726] flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#0B1726]"></span>
                Design & User Challenge
              </h4>
              <p className="text-sm text-[#111827]/80 leading-relaxed">{study.challenge}</p>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F7F5] border border-[#E5E7EB]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                The Studio Engineering Solution
              </h4>
              <p className="text-sm text-[#111827]/80 leading-relaxed">{study.solution}</p>
            </div>
          </div>

          {/* Key Architectural Features Delivered */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1726] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4A72C]" />
              Key Features & Capabilities Included:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {study.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F7F7F5] border border-[#E5E7EB] text-xs text-[#111827] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1726] mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#0B1726]" />
              Technology Stack:
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-[#F7F7F5] border border-[#E5E7EB] text-xs font-mono text-[#0B1726]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F7F7F5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#111827]/70">
            Interested in an engineered website tailored for your business?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onRequestProposal(study);
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />}
            >
              Inquire About {study.projectType}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
