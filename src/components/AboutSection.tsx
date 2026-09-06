import React from "react";
import {
  Palette,
  Code2,
  Zap,
  Smartphone,
  Target,
  Building2,
  ShieldCheck,
  ArrowRight,
  User,
  MapPin,
  Mail,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Container, Badge, Card, Button } from "./ui";

interface AboutSectionProps {
  onOpenInquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenInquiry }) => {
  // 6 Core Focus Areas
  const focusPillars = [
    {
      icon: Palette,
      title: "Design",
      tagline: "Thoughtful & Distinctive Aesthetics",
      description:
        "Every interface is crafted from first principles to reflect your company's distinct identity. We reject generic, bloated templates in favor of deliberate typography, balanced negative space, and intuitive visual hierarchies that command credibility.",
      tag: "Custom UX/UI",
    },
    {
      icon: Code2,
      title: "Development",
      tagline: "Clean, Maintainable Architecture",
      description:
        "Built with a modern, type-safe stack: React, TypeScript, and Tailwind CSS. We deliver structured, modular code that is fast, resilient, easy to extend, and completely free of proprietary vendor lock-in.",
      tag: "Clean TypeScript",
    },
    {
      icon: Zap,
      title: "Performance",
      tagline: "Speed-First Engineering",
      description:
        "Modern visitors expect instant responses. We engineer lightweight asset delivery, modern WebP/AVIF image formats, and minimal script overhead to ensure sub-second page loads and seamless interaction across all network conditions.",
      tag: "Sub-Second Speeds",
    },
    {
      icon: Smartphone,
      title: "Responsive Experiences",
      tagline: "Fluid Across Every Viewport",
      description:
        "Mobile usability is never an afterthought. Every layout is engineered from the ground up for seamless navigation across mobile phones, tablets, laptops, and ultra-wide desktop monitors with touch-friendly 44px hit targets.",
      tag: "Mobile-First Precision",
    },
    {
      icon: Target,
      title: "Business Goals",
      tagline: "Engineered for Tangible Outcomes",
      description:
        "A website should be an active digital asset, not a passive brochure. Every user journey, content block, and call-to-action is structured around your specific business goals—generating qualified leads, bookings, and customer trust.",
      tag: "Goal-Oriented UX",
    },
    {
      icon: Building2,
      title: "Professional Online Presence",
      tagline: "Authoritative Brand Credibility",
      description:
        "Your website is the digital front door to your business. We build polished, trustworthy digital environments that validate your capabilities, establish institutional confidence, and set you apart from competitors.",
      tag: "Brand Authority",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              About Hanzla Web Studio
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Crafting Professional Digital Experiences{" "}
            <span className="text-[#D4A72C]">
              for Modern Businesses
            </span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Hanzla Web Studio is a modern web-development studio focused on creating professional digital experiences for businesses.
            We unite thoughtful design with disciplined full-stack engineering to help companies build trust, present their services with clarity, and achieve their goals online.
          </p>
        </div>

        {/* 6 Core Focus Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16">
          {focusPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                variant="default"
                padding="lg"
                className="bg-white border-[#E5E7EB] hover:border-[#0B1726]/40 hover:shadow-lg transition-all duration-300 rounded-3xl p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1726] text-[#D4A72C] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0B1726] mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4A72C] mb-3">
                    {pillar.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#111827]/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-semibold text-[#0B1726]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Engineered to professional standards</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Studio Profile & Engineering Values Card (Transparent, honest, no fabricated metrics) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Studio Profile & Founder Contact Card */}
          <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3 pb-5 border-b border-[#E5E7EB] mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0B1726] text-[#D4A72C] flex items-center justify-center font-display font-black text-base">
                  HW
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-[#0B1726]">
                    Hanzla Web Studio
                  </h4>
                  <p className="text-xs text-[#111827]/60">
                    Modern Web Development Studio
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1726] block">Studio Lead:</span>
                    <span className="text-[#111827]/75">Hanzla Nathiyal — Web Designer & Developer</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1726] block">Primary Focus:</span>
                    <span className="text-[#111827]/75">Professional Business Websites, High-Speed Web Applications & Landing Pages</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1726] block">Studio Availability:</span>
                    <span className="text-[#111827]/75">Open for select new client projects & custom builds (Remote / Global)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0B1726] block">Direct Contact:</span>
                    <span className="text-[#111827]/75">hanzlanathiyal@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5E7EB]">
              <span className="text-[11px] font-mono text-[#111827]/50 block uppercase tracking-wider">
                Working Methodology
              </span>
              <p className="text-xs text-[#0B1726] font-semibold mt-1">
                Direct client collaboration from initial discovery to final deployment.
              </p>
            </div>
          </div>

          {/* Right: Studio Engineering Principles */}
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1726]/5 text-[#0B1726] text-xs font-mono font-bold mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Our Core Operating Principles</span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0B1726] mb-4">
                How We Approach Every Project
              </h4>
              <p className="text-xs sm:text-sm text-[#111827]/75 leading-relaxed mb-6">
                We believe that businesses thrive when their websites are engineered with intention. Instead of relying on buzzwords, pre-bought templates, or vanity metrics, we focus on technical fundamentals that deliver tangible value.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0B1726] mb-1">
                    Direct Technical Access
                  </h5>
                  <p className="text-xs text-[#111827]/70 leading-relaxed">
                    You communicate directly with the engineer writing your code—ensuring zero communication friction or handoff misunderstandings.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0B1726] mb-1">
                    100% Asset Ownership
                  </h5>
                  <p className="text-xs text-[#111827]/70 leading-relaxed">
                    You receive full source code repository handover, design assets, and host deployment upon project completion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0B1726] mb-1">
                    No Template Bloat
                  </h5>
                  <p className="text-xs text-[#111827]/70 leading-relaxed">
                    Every site is coded with lean, modern components to ensure maximum speed, security, and clean readability.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                  <h5 className="font-bold text-xs sm:text-sm text-[#0B1726] mb-1">
                    Honest Scope & Roadmaps
                  </h5>
                  <p className="text-xs text-[#111827]/70 leading-relaxed">
                    Clear milestones, realistic delivery timelines, and transparent pricing with zero surprise charges.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-[#111827]/70 font-medium">
                Ready to review your project with us?
              </span>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="text-xs font-bold text-[#0B1726] hover:text-[#D4A72C] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Request a consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#0B1726] to-[#1E293B] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A72C] font-bold block">
              Let's Build Together
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-[#F7F7F5] tracking-tight">
              Ready to create a standout online presence?
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E7EB]/80 max-w-lg leading-relaxed">
              Tell us about your business, your goals, and what you're looking to build. We'll provide honest recommendations and a clear roadmap.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={onOpenInquiry}
            className="bg-[#D4A72C] hover:bg-[#B88D22] text-[#0B1726] font-bold shrink-0 shadow-md whitespace-nowrap px-6 py-3"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#0B1726]" />}
          >
            Start a Conversation
          </Button>
        </div>
      </Container>
    </section>
  );
};
