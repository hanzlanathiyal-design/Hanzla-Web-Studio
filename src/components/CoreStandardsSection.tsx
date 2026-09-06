import React from "react";
import { LayoutTemplate, Smartphone, Zap, Search, Sliders } from "lucide-react";
import { Container } from "./ui/Container";

interface StandardItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
}

const standards: StandardItem[] = [
  {
    id: "modern-design",
    icon: LayoutTemplate,
    title: "Modern Design",
    description:
      "Clean typography, balanced negative space, and a refined aesthetic tailored to elevate your brand's credibility.",
    badge: "Bespoke Aesthetics",
  },
  {
    id: "mobile-first",
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Crafted from touchscreens upward, ensuring fluid layouts, intuitive interactions, and accessible tap targets on all devices.",
    badge: "Fluid Responsiveness",
  },
  {
    id: "fast-performance",
    icon: Zap,
    title: "Fast Performance",
    description:
      "Lean code bundles, optimized media, and efficient rendering pipelines designed for swift, frictionless browsing.",
    badge: "Sub-Second Loading",
  },
  {
    id: "seo-friendly",
    icon: Search,
    title: "SEO-Friendly",
    description:
      "Semantic HTML5 hierarchy, schema data, OpenGraph metadata, and crawlable architecture built for search discoverability.",
    badge: "Semantic Architecture",
  },
  {
    id: "easy-to-maintain",
    icon: Sliders,
    title: "Easy to Maintain",
    description:
      "Modular components and structured organization make text updates, new pages, and ongoing iterations straightforward.",
    badge: "Modular & Documented",
  },
];

export const CoreStandardsSection: React.FC = () => {
  return (
    <section
      id="standards"
      aria-label="Core Engineering Standards"
      className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]"
    >
      <Container size="xl">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[#E5E7EB]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0B1726]/5 border border-[#0B1726]/10 text-xs font-semibold text-[#0B1726] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Foundational Standards
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1726] tracking-tight">
              Engineered for Quality, Speed, and Longevity
            </h2>
            <p className="text-[#111827]/70 text-sm sm:text-base mt-1.5 leading-relaxed">
              Every project is built against five core technical disciplines to ensure a dependable digital presence.
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs font-mono font-medium text-[#111827]/60 block">
              Direct Engineering Oversight
            </span>
            <span className="text-xs font-bold text-[#0B1726] mt-0.5 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              100% Quality Checked
            </span>
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pt-8 sm:pt-10">
          {standards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] hover:border-[#D4A72C]/50 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Icon and sequential indicator */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#0B1726] group-hover:bg-[#0B1726] group-hover:text-[#D4A72C] group-hover:border-[#0B1726] flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-[#111827]/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base font-bold text-[#0B1726] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#111827]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom pill badge */}
                <div className="mt-5 pt-3 border-t border-[#E5E7EB]/70 flex items-center">
                  <span className="text-[10px] font-semibold tracking-wide uppercase text-[#0B1726] bg-white px-2 py-0.5 rounded-md border border-[#E5E7EB] whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
