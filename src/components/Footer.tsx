import React from "react";
import { Mail, ShieldCheck, ArrowUp, CheckCircle2, Layers, MessageCircle, MapPin, Lock } from "lucide-react";
import { Container, Button, Badge } from "./ui";
import { Logo } from "./Logo";

interface FooterProps {
  onOpenInquiry: () => void;
  onOpenAudit: () => void;
  onOpenCalculator: () => void;
  onOpenDesignSystem?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInquiry,
  onOpenAudit,
  onOpenCalculator,
  onOpenDesignSystem,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#0B1726] border-t border-[#0B1726] text-[#E5E7EB]/70 text-xs relative">
      {/* Top CTA Banner */}
      <div className="border-b border-[#E5E7EB] py-12 sm:py-16 bg-[#F7F7F5]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center mb-3">
                <Badge variant="navy" size="sm" dot>
                  Currently Accepting 2 New Projects
                </Badge>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1726] tracking-tight">
                Your Business Deserves a{" "}
                <span className="text-[#D4A72C]">
                  Better Website.
                </span>
              </h3>
              <p className="text-[#111827]/75 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                Let's build something that represents your business professionally.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
              <Button
                size="md"
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto"
              >
                Get a Free Website Concept
              </Button>
              <Button
                size="md"
                variant="primary"
                onClick={() => onOpenInquiry()}
                className="w-full sm:w-auto"
              >
                Start a Project
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Info */}
            <div className="sm:col-span-2 space-y-4">
              <div className="flex items-center">
                <Logo variant="dark" />
              </div>

              <p className="text-[#E5E7EB]/75 text-xs leading-relaxed max-w-sm">
                An independent digital engineering studio crafting high-converting web applications, headless commerce,
                and enterprise platforms across diverse industries.
              </p>

              <div className="space-y-2 text-xs text-[#E5E7EB]/85">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <a href="mailto:hanzlanathiyal@gmail.com" className="hover:text-white font-medium transition-colors">
                    hanzlanathiyal@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <a
                    href="https://wa.me/923001234567?text=Hi%20Hanzla%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-medium transition-colors"
                  >
                    WhatsApp: +92 300 1234567
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#E5E7EB]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A72C]" />
                  <span>Pakistan / Serving clients worldwide</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Response SLA: Within 4 Business Hours</span>
                </div>
              </div>
            </div>

            {/* Multi-Industry Sectors */}
            <div>
              <h4 className="font-bold text-[#F7F7F5] text-xs uppercase tracking-widest mb-4">Industries</h4>
              <ul className="space-y-2.5 text-[#E5E7EB]/70">
                <li><a href="#work" className="hover:text-white transition-colors">B2B SaaS & Tech</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">E-Commerce & Retail</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Professional Services</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Healthcare & Medical</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Real Estate & Estates</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Hospitality & Dining</a></li>
              </ul>
            </div>

            {/* Studio Capabilities & Navigation */}
            <div>
              <h4 className="font-bold text-[#F7F7F5] text-xs uppercase tracking-widest mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-[#E5E7EB]/70">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#what-i-build" className="hover:text-white transition-colors">What I Build</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Selected Work</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services & Pricing</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact & FAQ</a></li>
              </ul>
            </div>

            {/* Guarantees */}
            <div>
              <h4 className="font-bold text-[#F7F7F5] text-xs uppercase tracking-widest mb-4">Guarantees</h4>
              <ul className="space-y-2.5 text-[#E5E7EB]/80">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>95+ Google Lighthouse</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Code Ownership</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>30-Day Hypercare Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero Outsourced Juniors</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright & responsive note */}
          <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E5E7EB]/50 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Hanzla Web Studio. Directed by Hanzla Nathiyal.</p>

            <div className="flex items-center gap-3">
              {onOpenAdmin && (
                <>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="text-[11px] text-[#E5E7EB]/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Private Lead Management Portal (Restricted Access)"
                  >
                    <Lock className="w-3 h-3 text-[#D4A72C]" />
                    <span>Admin Portal</span>
                  </button>
                  <span className="text-[#E5E7EB]/30 hidden sm:inline">•</span>
                </>
              )}
              <span className="text-[#E5E7EB]/60 hidden sm:inline">TypeScript • React • Tailwind CSS</span>
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                rightIcon={<ArrowUp className="w-3 h-3 text-[#D4A72C]" />}
                className="text-[10px] uppercase font-bold border-white/20 text-white hover:bg-white/10"
                aria-label="Back to top"
              >
                Top
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
