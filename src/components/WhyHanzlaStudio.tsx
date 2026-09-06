import React from "react";
import {
  ShieldCheck,
  MessageSquare,
  Clock,
  Code2,
  Lock,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  Zap,
  Award,
  ArrowRight,
  Terminal,
  Cpu,
} from "lucide-react";
import { Container, Badge, Card, Button } from "./ui";

interface WhyHanzlaStudioProps {
  onOpenInquiry?: () => void;
}

export const WhyHanzlaStudio: React.FC<WhyHanzlaStudioProps> = ({ onOpenInquiry }) => {
  const commitments = [
    {
      icon: MessageSquare,
      title: "Direct Engineer Access",
      subtitle: "Zero account managers or telephone games",
      description:
        "You collaborate directly with lead designer & engineer Hanzla Nathiyal from discovery through launch. Inquiries, architectural choices, and refinements are handled in hours, not lost in ticket queues.",
      badge: "Direct Communication",
    },
    {
      icon: Code2,
      title: "Clean Production Codebase",
      subtitle: "Bespoke TypeScript & modern React",
      description:
        "No drag-and-drop page builders, no 40-plugin WordPress vulnerabilities, and no legacy spaghetti code. Every system is engineered with modular TypeScript, semantic HTML5, and utility CSS.",
      badge: "Maintainable Architecture",
    },
    {
      icon: Zap,
      title: "Sub-Second Performance",
      subtitle: "Audited Core Web Vitals under real conditions",
      description:
        "Every page is benchmarked across real iOS and Android viewports. We tune asset delivery, font swapping, and code splitting to achieve Largest Contentful Paint under 1.0s and zero layout shift.",
      badge: "LCP < 1.0s Guaranteed",
    },
    {
      icon: Lock,
      title: "100% Unconditional Ownership",
      subtitle: "Full GitHub repository & asset transfer",
      description:
        "Upon project completion, all GitHub repositories, Figma source files, DNS configurations, and hosting accounts are unconditionally transferred to your organization with zero proprietary retainers.",
      badge: "Zero Vendor Lock-In",
    },
    {
      icon: Clock,
      title: "Transparent Weekly Staging",
      subtitle: "Private staging URLs & milestone sign-offs",
      description:
        "You receive private access to your staging environment from week one. Follow sprint progress in real-time, review Loom video walkthroughs, and approve milestones with zero launch-day surprises.",
      badge: "Real-Time Staging",
    },
    {
      icon: HeartHandshake,
      title: "30-Day Post-Launch Hypercare",
      subtitle: "Continuous support & warranty after go-live",
      description:
        "We don't disappear once the domain cutover finishes. Every build includes 30 days of active speed monitoring, analytics verification, priority bug fixing, and direct technical support.",
      badge: "Launch Warranty",
    },
  ];

  const comparisonRows = [
    {
      aspect: "Primary Contact",
      traditionalAgency: "Middleman account manager or junior coordinator",
      genericFreelancer: "Single freelancer, often variable responsiveness",
      hanzlaStudio: "Direct WhatsApp / Slack with Lead Engineer Hanzla Nathiyal",
    },
    {
      aspect: "Architecture & Code",
      traditionalAgency: "Heavy WordPress / Elementor themes with 30+ fragile plugins",
      genericFreelancer: "Ad-hoc template customization or inconsistent code standards",
      hanzlaStudio: "Type-safe React 19 / Next.js, Tailwind CSS, & clean PostgreSQL/Prisma",
    },
    {
      aspect: "Performance Standard",
      traditionalAgency: "Often 3.0s - 5.0s mobile LCP with heavy script blocking",
      genericFreelancer: "Variable; rarely rigorously audited for Core Web Vitals",
      hanzlaStudio: "Engineered sub-second mobile LCP (<1.0s) & Zero Cumulative Layout Shift",
    },
    {
      aspect: "Source Code Ownership",
      traditionalAgency: "Proprietary licensing, lock-in hosting retainers, or hidden fees",
      genericFreelancer: "Manual ZIP handoff, often without Git commit histories",
      hanzlaStudio: "100% unconditional transfer of GitHub repo, Figma files, & hosting",
    },
    {
      aspect: "Delivery Timeline",
      traditionalAgency: "3 to 6 months with frequent scope bloat and billable hours",
      genericFreelancer: "Variable timelines prone to sudden availability gaps",
      hanzlaStudio: "Strict 2 to 4-week structured sprints with weekly staging demos",
    },
  ];

  return (
    <section id="why-hanzla-web-studio" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#FAFAF8]">
      {/* Anchor aliases for about and why-us */}
      <div id="about" className="absolute -top-20" aria-hidden="true" />
      <div id="why-us" className="absolute -top-20" aria-hidden="true" />
      <div id="experience" className="absolute -top-20" aria-hidden="true" />
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Engineering Philosophy & Standards
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Why Ambitious Businesses Choose{" "}
            <span className="text-[#D4A72C]">Hanzla Web Studio</span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            We operate as a high-conviction digital engineering studio. No bloated agency overhead, no junior handoffs, and no template shortcuts—just precision craftsmanship that elevates your company.
          </p>
        </div>

        {/* 6 Core Studio Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {commitments.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={idx}
                variant="white"
                className="p-6 sm:p-7 rounded-2xl border-[#E5E7EB] hover:border-[#0B1726]/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1726]/5 border border-[#0B1726]/10 flex items-center justify-center text-[#0B1726]">
                      <Icon className="w-6 h-6 text-[#0B1726]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F7F7F5] border border-[#E5E7EB] text-[10px] font-mono font-bold text-[#0B1726] uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1726] tracking-tight mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4A72C] mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-[#111827]/70 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Studio Comparison Matrix */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1726] tracking-tight">
              A Clear Contrast in Execution
            </h3>
            <p className="text-[#111827]/70 text-sm mt-2">
              How our engineered approach compares against traditional agencies and unvetted freelancers.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#F7F7F5] border-b border-[#E5E7EB] text-xs font-bold uppercase tracking-wider text-[#0B1726]">
                    <th className="py-4 px-5 w-1/4">Aspect</th>
                    <th className="py-4 px-5 w-1/4 text-[#111827]/60">Traditional Agency</th>
                    <th className="py-4 px-5 w-1/4 text-[#111827]/60">Generic Freelancer</th>
                    <th className="py-4 px-5 w-1/4 bg-[#0B1726] text-[#D4A72C]">Hanzla Web Studio</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-[#E5E7EB]">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAF8]/80 transition-colors">
                      <td className="py-4 px-5 font-bold text-[#0B1726] bg-[#FAFAF8]/50">
                        {row.aspect}
                      </td>
                      <td className="py-4 px-5 text-[#111827]/65">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{row.traditionalAgency}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-[#111827]/65">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{row.genericFreelancer}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 font-semibold text-[#0B1726] bg-[#0B1726]/5">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.hanzlaStudio}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Anchor Callout */}
        <div className="text-center pt-6">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenInquiry}
            icon={ArrowRight}
            className="shadow-md"
          >
            Start a Technical Consultation with Hanzla
          </Button>
        </div>
      </Container>
    </section>
  );
};
