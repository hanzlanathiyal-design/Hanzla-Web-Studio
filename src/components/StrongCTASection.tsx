import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
import { Container, Badge, Button } from "./ui";
import { scrollToElement } from "../utils";

interface StrongCTASectionProps {
  onOpenInquiry?: () => void;
  onOpenConcept?: () => void;
}

export const StrongCTASection: React.FC<StrongCTASectionProps> = ({
  onOpenInquiry,
  onOpenConcept,
}) => {
  const handleDirectContact = () => {
    scrollToElement("contact");
  };

  return (
    <section id="strong-cta" className="py-20 sm:py-28 bg-[#0B1726] text-white relative overflow-hidden">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,167,44,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_50%)] pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Currently Accepting Sprint Bookings for Next Month • 2 Slots Available</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Ready to Build a High-Performance{" "}
            <span className="text-[#D4A72C]">Web Platform?</span>
          </h2>

          {/* Subheading */}
          <p className="text-white/80 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Skip the bloated agencies and fragile page builders. Partner directly with Lead Designer & Engineer Hanzla Nathiyal to engineer a bespoke, lightning-fast digital asset for your business.
          </p>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-[#D4A72C] font-semibold text-sm mb-1">
                <Clock className="w-4 h-4 shrink-0" />
                <span>4-Hour SLA</span>
              </div>
              <p className="text-white/70 text-xs">
                Inquiries reviewed directly by Hanzla with response within 4 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Code Ownership</span>
              </div>
              <p className="text-white/70 text-xs">
                Full GitHub repository & Figma transfer with zero vendor lock-in.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-[#D4A72C] font-semibold text-sm mb-1">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Free Initial Concept</span>
              </div>
              <p className="text-white/70 text-xs">
                Request a custom interactive layout concept before committing.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={onOpenConcept || onOpenInquiry}
              icon={Sparkles}
              className="w-full sm:w-auto shadow-lg"
            >
              Get a Free Website Concept
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleDirectContact}
              icon={ArrowRight}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
            >
              Start Project Inquiry
            </Button>
          </div>

          {/* Direct Channels */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <a
              href="mailto:hanzlanathiyal@gmail.com"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
              <span>hanzlanathiyal@gmail.com</span>
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://wa.me/923238640000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp Channel</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
