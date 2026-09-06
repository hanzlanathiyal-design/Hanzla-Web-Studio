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
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import { Container, Badge, Card, Button } from "./ui";
import { TestimonialCarousel } from "./TestimonialCarousel";

interface ClientExperienceSectionProps {
  onOpenInquiry?: () => void;
}

export const ClientExperienceSection: React.FC<ClientExperienceSectionProps> = ({
  onOpenInquiry,
}) => {
  const proofStats = [
    {
      metric: "5.0 / 5.0",
      label: "Client Review Score",
      subtext: "100% verified project satisfaction",
      icon: Star,
      iconColor: "text-[#D4A72C]",
    },
    {
      metric: "0.6s",
      label: "Average Mobile LCP",
      subtext: "Sub-second Core Web Vitals",
      icon: Zap,
      iconColor: "text-emerald-500",
    },
    {
      metric: "100%",
      label: "Milestone Delivery",
      subtext: "Zero missed launch deadlines",
      icon: Award,
      iconColor: "text-[#D4A72C]",
    },
    {
      metric: "$14M+",
      label: "Client Value Generated",
      subtext: "Direct pipeline & revenue impact",
      icon: TrendingUp,
      iconColor: "text-blue-500",
    },
  ];
  const experiencePrinciples = [
    {
      icon: MessageSquare,
      title: "Direct Engineer Access",
      tagline: "Zero Account Managers",
      description:
        "You communicate directly with lead designer & engineer Hanzla Nathiyal from kick-off to launch. No telephone games, no junior handoffs, and no miscommunication.",
      benefit: "Decisions happen in hours, not weeks.",
    },
    {
      icon: Clock,
      title: "Milestone Transparency",
      tagline: "Live Staging Previews",
      description:
        "You receive private staging access throughout the build. You see the website evolve in real time with weekly sprint updates and clear milestone sign-offs.",
      benefit: "Zero surprises on launch day.",
    },
    {
      icon: Code2,
      title: "Clean Production Code",
      tagline: "Modern TypeScript & React",
      description:
        "No drag-and-drop page builder bloat or fragile plugins. Every component is cleanly written in type-safe TypeScript, semantic HTML5, and utility CSS.",
      benefit: "Lightweight, secure, and easily maintainable.",
    },
    {
      icon: Zap,
      title: "Sub-Second Performance",
      tagline: "Speed Under Real Conditions",
      description:
        "Every site is audited across real iOS and Android devices, optimized for Core Web Vitals, and tuned to load in under a second on mobile networks.",
      benefit: "Higher engagement and lower bounce rates.",
    },
    {
      icon: Lock,
      title: "100% Unconditional Ownership",
      tagline: "Zero Proprietary Lock-In",
      description:
        "Upon project completion, all GitHub repositories, Figma source files, domain records, and hosting credentials are unconditionally transferred to your organization.",
      benefit: "You own every single line of code.",
    },
    {
      icon: HeartHandshake,
      title: "Post-Launch Hypercare",
      tagline: "Active Support After Deployment",
      description:
        "We don't vanish once the site goes live. Every build includes 30 days of active monitoring, Core Web Vitals verification, and priority bug fixing.",
      benefit: "Total peace of mind during launch.",
    },
  ];

  const standardsComparison = [
    {
      aspect: "Communication",
      traditionalAgency: "Middleman account managers & delayed ticket responses",
      hanzlaStudio: "Direct collaboration with the engineer writing your code",
    },
    {
      aspect: "Code Quality",
      traditionalAgency: "Heavy WordPress themes with 30+ plugins or slow builders",
      hanzlaStudio: "Clean, bespoke React & TypeScript architecture with zero bloat",
    },
    {
      aspect: "Mobile Usability",
      traditionalAgency: "Desktop-first layouts hastily compressed for phones",
      hanzlaStudio: "Mobile-first engineered layouts with 44px minimum hit targets",
    },
    {
      aspect: "Asset Ownership",
      traditionalAgency: "Proprietary retainers or ongoing agency licensing fees",
      hanzlaStudio: "100% full source code, repository, and asset handover",
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-white">
      {/* Anchor for testimonials */}
      <div id="testimonials" className="absolute -top-20" aria-hidden="true" />

      <Container size="xl">
        {/* Section Header: Client Success Stories & Social Proof */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Client Success Stories & Social Proof
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Real Results Engineered for{" "}
            <span className="text-[#D4A72C]">
              Ambitious Brands
            </span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            From high-conversion restaurant reservations and luxury real estate showrooms to headless e-commerce and medical portals—explore verified client outcomes.
          </p>
        </div>

        {/* Aggregate Social Proof Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-14">
          {proofStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F7F5] rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 text-center hover:border-[#0B1726]/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] mb-3 shadow-xs">
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1726] tracking-tight">
                  {stat.metric}
                </div>
                <div className="font-semibold text-xs sm:text-sm text-[#0B1726] mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#111827]/60 mt-0.5 font-medium">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Responsive Testimonials Carousel */}
        <div className="max-w-5xl mx-auto mb-24">
          <TestimonialCarousel onOpenInquiry={onOpenInquiry} />
        </div>

        {/* Section Sub-Header: Studio Working Standards */}
        <div className="text-center max-w-3xl mx-auto mb-14 pt-10 border-t border-[#E5E7EB]/80">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Client Working Standards
            </Badge>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            What Clients Will{" "}
            <span className="text-[#D4A72C]">
              Experience
            </span>
          </h3>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            We let our engineering discipline and transparent working standards speak for themselves. Here is the exact standard of communication, craftsmanship, and accountability you can rely on.
          </p>
        </div>

        {/* 6 Core Working Experience Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16">
          {experiencePrinciples.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                variant="default"
                padding="lg"
                className="bg-[#F7F7F5] border-[#E5E7EB] hover:border-[#0B1726]/40 hover:shadow-lg transition-all duration-300 rounded-3xl p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1726] text-[#D4A72C] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white text-[#0B1726] border border-[#E5E7EB]">
                      {item.tagline}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0B1726] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#111827]/75 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item.benefit}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Side-by-Side Standards Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#F7F7F5] border border-[#E5E7EB] p-6 sm:p-10 shadow-xs mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#0B1726]/60 font-bold block mb-1">
              Honest Comparison
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1726]">
              How Our Studio Operates Differently
            </h3>
          </div>

          <div className="space-y-4">
            {standardsComparison.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] items-center"
              >
                <div className="md:col-span-3 font-bold text-xs sm:text-sm text-[#0B1726]">
                  {row.aspect}
                </div>
                <div className="md:col-span-4 flex items-start gap-2 text-xs text-[#111827]/60">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{row.traditionalAgency}</span>
                </div>
                <div className="md:col-span-5 flex items-start gap-2 text-xs font-semibold text-[#0B1726]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{row.hanzlaStudio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Guarantee Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B1726] text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/30 text-[#D4A72C] text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded in Service Principles</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#F7F7F5] tracking-tight">
              Ready for a transparent web development partnership?
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E7EB]/80 max-w-lg leading-relaxed">
              Book a 30-minute discovery consultation to discuss your business requirements, timeline, and exact scope.
            </p>
          </div>

          {onOpenInquiry && (
            <Button
              variant="primary"
              size="md"
              onClick={onOpenInquiry}
              className="bg-[#D4A72C] hover:bg-[#B88D22] text-[#0B1726] font-bold shrink-0 shadow-md whitespace-nowrap px-6 py-3"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#0B1726]" />}
            >
              Start Discovery
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

// Export alias for backwards compatibility
export const TestimonialsSection = ClientExperienceSection;
export { TestimonialCarousel } from "./TestimonialCarousel";
