import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, Menu, X, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

interface NavbarProps {
  onOpenInquiry: (initialData?: any) => void;
  onOpenAudit?: () => void;
  onOpenCalculator?: () => void;
  onOpenDesignSystem?: () => void;
}

interface NavItem {
  label: string;
  id: string;
  href: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  onOpenAudit,
  onOpenCalculator,
  onOpenDesignSystem,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Core Navigation Items matching the natural site journey
  const navItems: NavItem[] = [
    { label: "Home", id: "home", href: "#home" },
    { label: "What We Build", id: "what-i-build", href: "#what-i-build" },
    { label: "Selected Work", id: "work", href: "#work" },
    { label: "Why Us", id: "why-hanzla-web-studio", href: "#why-hanzla-web-studio" },
    { label: "Process", id: "process", href: "#process" },
    { label: "Services", id: "services", href: "#services" },
    { label: "Contact", id: "contact", href: "#contact" },
  ];

  // Dynamic active section detection & scroll state tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy for active navigation state
      const sectionIds = [
        "home",
        "what-i-build",
        "work",
        "see-what-your-business-could-look-like",
        "why-hanzla-web-studio",
        "process",
        "services",
        "strong-cta",
        "contact",
      ];
      const scrollPosition = window.scrollY + 140;

      // Top of page is home
      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // Check sections from bottom to top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler with sticky header offset
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
        window.history.pushState(null, "", "#home");
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        // Offset for the sticky header height + safety padding
        const navHeight = 76;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveSection(id);
        window.history.pushState(null, "", `#${id}`);
      }
    },
    []
  );

  // Keyboard accessibility: handle Escape key to close mobile menu & lock scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Primary CTA action
  const handlePrimaryCTA = () => {
    setMobileMenuOpen(false);
    onOpenInquiry({
      projectType: "Free Website Concept & Strategy Consultation",
    });
  };

  return (
    <header
      id="main-navbar"
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F7F5]/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_4px_20px_-4px_rgba(11,23,38,0.06)] py-2.5 sm:py-3"
          : "bg-[#F7F7F5]/85 backdrop-blur-sm border-b border-[#E5E7EB]/70 py-3.5 sm:py-4"
      }`}
    >
      <Container size="xl" className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* 1. Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-2 rounded-lg py-1 px-1 transition-transform min-h-[44px]"
              aria-label="Hanzla Web Studio - Return to top"
            >
              <Logo variant="full" theme="light" size="sm" />
            </a>

            {/* Availability status badge - visible on desktop */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B1726]/5 border border-[#0B1726]/10 text-[11px] font-medium text-[#0B1726]">
              <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse shrink-0" />
              <span>Accepting New Clients</span>
            </div>
          </div>

          {/* 2. Desktop Navigation Links (Home, Services, Work, Process, About, Contact) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-3 py-1.5 rounded-lg text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-2 ${
                        isActive
                          ? "text-[#0B1726] font-bold bg-[#0B1726]/8 shadow-2xs"
                          : "text-[#111827]/80 hover:text-[#0B1726] hover:bg-[#E5E7EB]/60 font-medium"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D4A72C] rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 3. Primary CTA & Mobile Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Design System Spec Link (optional secondary access) */}
            {onOpenDesignSystem && (
              <button
                type="button"
                onClick={onOpenDesignSystem}
                className="hidden 2xl:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white hover:bg-[#E5E7EB]/60 text-[#111827] border border-[#E5E7EB] transition-colors"
                title="View Global Design System Spec"
              >
                Tokens
              </button>
            )}

            {/* PRIMARY CTA: "Get a Free Website Concept" - Prominently Styled */}
            <button
              id="navbar-primary-cta"
              type="button"
              onClick={handlePrimaryCTA}
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 min-h-[44px] rounded-xl bg-[#0B1726] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0B1726]/10 hover:bg-[#111827] hover:shadow-lg hover:shadow-[#0B1726]/20 active:scale-[0.98] transition-all duration-200 border border-[#D4A72C]/40 outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-2 group"
              aria-label="Get a Free Website Concept"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C] group-hover:rotate-12 transition-transform shrink-0" />
              <span className="hidden sm:inline">Get a Free Website Concept</span>
              <span className="sm:hidden text-xs">Free Concept</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A72C] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-nav-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-white border border-[#E5E7EB] text-[#0B1726] hover:bg-[#E5E7EB]/50 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-2"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#0B1726]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0B1726]" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* 4. Mobile Hamburger Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-x-0 top-[59px] sm:top-[65px] bottom-0 bg-[#0B1726]/50 backdrop-blur-xs z-40 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#F7F7F5] border-b border-[#E5E7EB] px-5 py-6 max-h-[calc(100vh-65px)] overflow-y-auto shadow-2xl space-y-5 animate-in slide-in-from-top-4 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Studio Availability Banner in Drawer */}
            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white border border-[#E5E7EB] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse shrink-0" />
                <span className="font-bold text-[#0B1726]">Accepting Sprint Clients</span>
              </div>
              <span className="text-[#111827]/60 text-[11px] font-mono">hanzlanathiyal@gmail.com</span>
            </div>

            {/* Mobile Navigation List (Home, Services, Work, Process, About, Contact) */}
            <nav aria-label="Mobile Navigation Links">
              <ul className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors min-h-[48px] outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] ${
                          isActive
                            ? "bg-[#0B1726] text-white shadow-xs"
                            : "bg-white text-[#111827] hover:bg-[#E5E7EB]/50 border border-[#E5E7EB]/80"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isActive && <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />}
                          {item.label}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 ${
                            isActive ? "text-[#D4A72C]" : "text-[#111827]/40"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Prominent Mobile Primary CTA */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handlePrimaryCTA}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#0B1726] text-white font-bold text-sm shadow-md hover:bg-[#111827] active:scale-[0.99] transition-all border border-[#D4A72C]/50 outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726]"
              >
                <Sparkles className="w-4 h-4 text-[#D4A72C]" />
                <span>Get a Free Website Concept</span>
                <ArrowRight className="w-4 h-4 text-[#D4A72C]" />
              </button>

              {/* Quick secondary action */}
              {onOpenAudit && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAudit();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#0B1726] hover:bg-[#E5E7EB]/50 transition-colors"
                >
                  Run 60-Second Website Audit
                </button>
              )}
            </div>

            {/* Studio SLA Note */}
            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-center gap-2 text-xs text-[#111827]/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Response within 4 business hours</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
