import React from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useStickyBar } from "../hooks";
import { scrollToElement } from "../utils";
import { Button } from "../components/ui";

interface MainLayoutProps {
  children: React.ReactNode;
  onOpenInquiry: () => void;
  onOpenAudit?: () => void;
  onOpenCalculator?: () => void;
  onOpenDesignSystem?: () => void;
  onOpenAdmin?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  onOpenInquiry,
  onOpenAudit,
  onOpenCalculator,
  onOpenDesignSystem,
  onOpenAdmin,
}) => {
  const showStickyBar = useStickyBar(550);

  const handleAuditClick = () => {
    if (onOpenAudit) onOpenAudit();
    else scrollToElement("audit");
  };

  const handleCalculatorClick = () => {
    if (onOpenCalculator) onOpenCalculator();
    else scrollToElement("calculator");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#D4A72C]/20 selection:text-[#0B1726] flex flex-col">
      {/* Keyboard Accessibility: Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-[#0B1726] focus:text-white focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-[#D4A72C] focus:outline-none font-bold text-xs tracking-wider uppercase transition-transform"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar
        onOpenInquiry={onOpenInquiry}
        onOpenAudit={handleAuditClick}
        onOpenCalculator={handleCalculatorClick}
        onOpenDesignSystem={onOpenDesignSystem}
      />

      {/* Main Page Content Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 pt-[57px] sm:pt-[65px] focus:outline-none">
        {children}
      </main>

      {/* Footer */}
      <Footer
        onOpenInquiry={onOpenInquiry}
        onOpenAudit={handleAuditClick}
        onOpenCalculator={handleCalculatorClick}
        onOpenDesignSystem={onOpenDesignSystem}
        onOpenAdmin={onOpenAdmin}
      />

      {/* Sticky Bottom Quick-Conversion Bar (Responsive across 320px to 1440px+) */}
      {showStickyBar && (
        <aside
          aria-label="Quick action conversion bar"
          className="fixed bottom-3 sm:bottom-5 left-2.5 right-2.5 sm:left-4 sm:right-4 z-40 max-w-3xl mx-auto p-2 sm:p-2.5 px-3 sm:px-4 bg-white/95 backdrop-blur-md border border-[#E5E7EB] rounded-2xl sm:rounded-full shadow-xl shadow-[#0B1726]/10 flex items-center justify-between gap-2 sm:gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pl-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0B1726] truncate">
                Hanzla Web Studio • Accepting Sprints
              </p>
              <p className="text-[11px] text-[#111827]/70 truncate hidden md:block">
                Sub-second page loads, conversion-first UX & 100% code ownership.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCalculatorClick}
              className="hidden sm:inline-flex text-[10px] sm:text-xs"
            >
              Estimate
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenInquiry}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-[10px] sm:text-xs px-3 sm:px-4"
            >
              Start Project
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
};
