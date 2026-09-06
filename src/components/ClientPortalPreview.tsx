import React, { useState } from "react";
import { Layers, ShieldCheck, CheckCircle2, Clock, Globe, Laptop, Video, Terminal } from "lucide-react";
import { Container, Badge, Card } from "./ui";

export const ClientPortalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sprint" | "staging" | "deliverables">("sprint");

  return (
    <section id="see-what-your-business-could-look-like" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-white">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Transparent Client Sprint Environment
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            See What Your Business{" "}
            <span className="text-[#D4A72C]">
              Could Look Like
            </span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed">
            From private staging environments and weekly Loom walkthroughs to direct GitHub repository handover—experience total transparency from day one.
          </p>
        </div>

        {/* Dashboard Frame */}
        <Card variant="elevated" padding="none" className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white border-[#E5E7EB] shadow-xl overflow-hidden">
          {/* Top Frame Header */}
          <div className="bg-[#F7F7F5] px-4 sm:px-6 py-3.5 border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <span className="text-[#111827]/60 font-mono text-[11px]">hanzla-portal.internal/client/sprint-view</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                Sprint 3 of 4: In Progress
              </span>
              <span className="text-[#111827]/60 font-mono hidden sm:inline text-xs">Lead: Hanzla Nathiyal</span>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="bg-white px-6 py-3 border-b border-[#E5E7EB] flex items-center gap-6 text-xs font-medium overflow-x-auto">
            <button
              onClick={() => setActiveTab("sprint")}
              className={`pb-1 border-b-2 transition-all uppercase tracking-wider text-[11px] font-bold whitespace-nowrap ${
                activeTab === "sprint"
                  ? "border-[#0B1726] text-[#0B1726]"
                  : "border-transparent text-[#111827]/50 hover:text-[#0B1726]"
              }`}
            >
              Sprint Milestones
            </button>
            <button
              onClick={() => setActiveTab("staging")}
              className={`pb-1 border-b-2 transition-all uppercase tracking-wider text-[11px] font-bold whitespace-nowrap ${
                activeTab === "staging"
                  ? "border-[#0B1726] text-[#0B1726]"
                  : "border-transparent text-[#111827]/50 hover:text-[#0B1726]"
              }`}
            >
              Live Staging & Previews
            </button>
            <button
              onClick={() => setActiveTab("deliverables")}
              className={`pb-1 border-b-2 transition-all uppercase tracking-wider text-[11px] font-bold whitespace-nowrap ${
                activeTab === "deliverables"
                  ? "border-[#0B1726] text-[#0B1726]"
                  : "border-transparent text-[#111827]/50 hover:text-[#0B1726]"
              }`}
            >
              Repository & Deliverables
            </button>
          </div>

          {/* Body Content by Tab */}
          <div className="p-6 sm:p-8">
            {activeTab === "sprint" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#111827]/70 pb-2">
                  <span>Project: Vanguard Goods Next.js 15 Storefront</span>
                  <span className="font-semibold text-[#0B1726]">Target Launch: Oct 14</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                    <div className="flex items-center justify-between text-emerald-700 mb-1">
                      <span className="text-xs font-bold">1. Discovery</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-[#111827]/70">Architecture spec approved</p>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold mt-2 block">100% Completed</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                    <div className="flex items-center justify-between text-emerald-700 mb-1">
                      <span className="text-xs font-bold">2. Wireframes & UX</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-[#111827]/70">Mobile user journeys signed off</p>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold mt-2 block">100% Completed</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B1726]/5 border border-[#0B1726]/20 shadow-xs">
                    <div className="flex items-center justify-between text-[#0B1726] mb-1">
                      <span className="text-xs font-bold">3. Engineering</span>
                      <Clock className="w-4 h-4 text-[#D4A72C] animate-spin" />
                    </div>
                    <p className="text-[11px] text-[#0B1726] font-medium">Shopify Storefront API & Cart</p>
                    <span className="text-[10px] font-mono text-[#0B1726] font-bold mt-2 block">Active: Day 18 of 24</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] opacity-60">
                    <div className="flex items-center justify-between text-[#111827]/40 mb-1">
                      <span className="text-xs font-bold">4. Launch & QA</span>
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-[#111827]/50">Core Web Vitals & DNS cutover</p>
                    <span className="text-[10px] font-mono text-[#111827]/50 mt-2 block">Scheduled</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-[#D4A72C] shrink-0" />
                    <div>
                      <p className="text-[#0B1726] font-bold">Sprint Video Walkthrough (Loom)</p>
                      <p className="text-[#111827]/70 text-[11px]">4-minute summary of checkout speed benchmarks and cart slide-over.</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#0B1726] text-[#D4A72C] font-mono text-[10px] font-bold shrink-0 uppercase tracking-wider">
                    Recorded Today
                  </span>
                </div>
              </div>
            )}

            {activeTab === "staging" && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#D4A72C]" />
                      <span className="font-bold text-[#0B1726] text-xs">Client Staging Deployment URL</span>
                    </div>
                    <p className="font-mono text-[#0B1726] font-bold text-xs mt-1">https://staging-vanguard.hanzla.studio</p>
                    <p className="text-[11px] text-[#111827]/60 mt-0.5">Password protected • Edge caching active</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    🟢 Build Passing (Lighthouse 99)
                  </span>
                </div>
              </div>
            )}

            {activeTab === "deliverables" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <Terminal className="w-4 h-4 text-[#D4A72C] mb-2" />
                  <p className="font-bold text-[#0B1726]">GitHub Organization Transfer</p>
                  <p className="text-[#111827]/70 text-[11px] mt-1">100% clean TypeScript repository with commit history.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mb-2" />
                  <p className="font-bold text-[#0B1726]">30-Day Hypercare Contract</p>
                  <p className="text-[#111827]/70 text-[11px] mt-1">Dedicated bug fixes, monitor alerts, and SEO monitoring.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <Layers className="w-4 h-4 text-[#D4A72C] mb-2" />
                  <p className="font-bold text-[#0B1726]">Figma Design System & UI Kit</p>
                  <p className="text-[#111827]/70 text-[11px] mt-1">Components, color tokens, typography scale, and assets.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
};
