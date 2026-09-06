import React, { useState, useEffect, Suspense, lazy } from "react";
import { CASE_STUDIES } from "../data/agencyData";
import { IndustryType, IndustryCaseStudy } from "../types";

// Code splitting: Lazy load case study modal
const CaseStudyModal = lazy(() =>
  import("./CaseStudyModal").then((mod) => ({ default: mod.CaseStudyModal }))
);
import {
  UtensilsCrossed,
  Home,
  Dumbbell,
  ShoppingBag,
  Briefcase,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  Code2,
  Clock,
  ShieldCheck,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Container, Button, Badge, Card } from "./ui";

interface PortfolioSectionProps {
  selectedIndustry: IndustryType;
  onSelectIndustry?: (industry: IndustryType) => void;
  onRequestProposal: (study?: IndustryCaseStudy) => void;
}

type IndustrySelectorId = "restaurant" | "real_estate" | "gym" | "ecommerce" | "business";

interface IndustryDemoConfig {
  id: IndustrySelectorId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  industryTag: string;
  title: string;
  subtitle: string;
  tagline: string;
  statusBadge: "Concept Project" | "Demo Coming Soon";
  isComingSoon: boolean;
  matchingCaseStudyId?: "bonavia" | "luchsheye";
  description: string;
  highlights: string[];
  techStack: string[];
  urlSlug: string;
  previewImages: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  sampleUi: {
    heroHeadline: string;
    heroSubheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    accentBg: string;
    featurePill: string;
  };
}

const INDUSTRY_DEMOS: IndustryDemoConfig[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    icon: UtensilsCrossed,
    industryTag: "Hospitality & Dining",
    title: "Bonavia",
    subtitle: "Artisanal Italian Dining & Online Reservation Engine",
    tagline: "Refined culinary web platform with interactive seasonal menus & online table reservations",
    statusBadge: "Concept Project",
    isComingSoon: false,
    matchingCaseStudyId: "bonavia",
    description:
      "A mobile-first restaurant web experience designed for an artisanal dining room. Features interactive seasonal menus with dietary allergen filters, frictionless table reservation intake, private dining event forms, and local map discovery.",
    highlights: [
      "Mobile-first interactive menu with dietary allergen badges (Gluten-Free, Vegan)",
      "Frictionless table reservation booking workflow with party size selector",
      "Private dining & event hosting intake portal for private groups",
      "Semantic HTML5 & Schema.org Restaurant local SEO structured data",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Schema.org"],
    urlSlug: "bonavia-dining.studio",
    previewImages: {
      desktop: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
      mobile: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80",
    },
    sampleUi: {
      heroHeadline: "Artisanal Italian Cuisine & Natural Wines",
      heroSubheadline: "Hand-rolled pasta, wood-fired hearth cooking, and intimate hospitality. Reserve your table online.",
      primaryCtaText: "Reserve a Table",
      secondaryCtaText: "Explore Seasonal Menu",
      accentBg: "from-amber-950 via-stone-900 to-neutral-950",
      featurePill: "Live Table Reservations Available",
    },
  },
  {
    id: "real_estate",
    label: "Real Estate",
    icon: Home,
    industryTag: "Real Estate & Estates",
    title: "Luchsheye",
    subtitle: "Editorial Luxury Residences & Architectural Developments",
    tagline: "Editorial luxury real estate showcase for architectural residences & developments",
    statusBadge: "Concept Project",
    isComingSoon: false,
    matchingCaseStudyId: "luchsheye",
    description:
      "A modern, high-end residential real estate concept designed to showcase premium architectural properties. Features high-resolution listing galleries, interactive floor plans, neighborhood lifestyle guides, and a private viewing appointment scheduler.",
    highlights: [
      "Editorial property listing gallery with fullscreen high-definition zoom",
      "Interactive floor plan views with unit dimensions & architectural specs",
      "Curated neighborhood lifestyle guide with transit, dining, and park points",
      "Confidential private broker viewing scheduler with automated calendar intake",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Mapbox UI", "Vite"],
    urlSlug: "luchsheye-estates.studio",
    previewImages: {
      desktop: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      mobile: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
    },
    sampleUi: {
      heroHeadline: "Architectural Precision for Modern Living",
      heroSubheadline: "Private residential estates designed with bespoke materials, panoramic terraces, and timeless restraint.",
      primaryCtaText: "Book Private Viewing",
      secondaryCtaText: "Download Floor Plans",
      accentBg: "from-slate-950 via-neutral-900 to-stone-950",
      featurePill: "Penthouse Residences Available",
    },
  },
  {
    id: "gym",
    label: "Gym",
    icon: Dumbbell,
    industryTag: "Health & Fitness",
    title: "Pulse Athletic Club",
    subtitle: "High-Energy Fitness Studio & Class Booking Engine",
    tagline: "Engineered for member acquisition, real-time class scheduling, and recurring memberships",
    statusBadge: "Demo Coming Soon",
    isComingSoon: true,
    description:
      "A high-energy, conversion-focused concept engineered for boutique gym studios, CrossFit boxes, and training facilities. Designed to convert visitors into trial members with sub-second class timetable browsing and frictionless signups.",
    highlights: [
      "Interactive weekly class timetable with real-time coach availability",
      "Trainer credentials and coaching specialization profiles",
      "Frictionless trial pass registration and automated SMS intake",
      "Recurring Stripe membership billing and digital liability waivers",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Stripe API", "Vite"],
    urlSlug: "pulse-athletics.studio",
    previewImages: {
      desktop: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
      mobile: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    },
    sampleUi: {
      heroHeadline: "Transform Your Strength & Conditioning",
      heroSubheadline: "Elite coaching, functional training sprints, and an empowered community. Claim your 3-day guest trial.",
      primaryCtaText: "Claim 3-Day Guest Pass",
      secondaryCtaText: "View Class Schedule",
      accentBg: "from-zinc-950 via-neutral-900 to-stone-900",
      featurePill: "Next Class Starts in 35 Mins",
    },
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    industryTag: "E-Commerce & Retail",
    title: "Vanguard Goods",
    subtitle: "Headless Commerce & Rapid Mobile Checkout Concept",
    tagline: "Sub-second product catalog browsing, instant search, and headless checkout",
    statusBadge: "Demo Coming Soon",
    isComingSoon: true,
    description:
      "A minimalist, performance-engineered storefront built for direct-to-consumer brands. Replaces bloated templates with an ultra-fast headless React storefront that loads instantly on mobile networks.",
    highlights: [
      "Sub-second instant product search with fuzzy matching and filtering",
      "Slide-over cart drawer with free-shipping threshold progress bar",
      "Product detail page with 360-degree image zoom and variant swatches",
      "Headless Shopify Storefront API / Stripe Elements checkout integration",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Shopify API", "Vite"],
    urlSlug: "vanguard-goods.studio",
    previewImages: {
      desktop: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80",
      mobile: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
    },
    sampleUi: {
      heroHeadline: "Engineered Essentials for Everyday Carry",
      heroSubheadline: "Minimalist aesthetic, indestructible materials, and Japanese hardware. Free worldwide shipping on orders over $100.",
      primaryCtaText: "Shop New Collection",
      secondaryCtaText: "View Lookbook",
      accentBg: "from-stone-950 via-neutral-900 to-zinc-950",
      featurePill: "Free Express Worldwide Shipping",
    },
  },
  {
    id: "business",
    label: "Business",
    icon: Briefcase,
    industryTag: "B2B & Corporate Services",
    title: "Stratum Advisory",
    subtitle: "Corporate Authority & B2B Solutions Architecture",
    tagline: "B2B credibility architecture with clear value positioning and high-conversion lead intake",
    statusBadge: "Demo Coming Soon",
    isComingSoon: true,
    description:
      "A commanding digital presence built for advisory firms, software consultancies, and professional service practices. Focuses on executive trust, clear capability matrices, client problem diagnosis, and frictionless consultation booking.",
    highlights: [
      "Executive value proposition hero with client proof architecture",
      "Interactive capabilities matrix with clear milestone scope breakdowns",
      "Integrated multi-step project discovery intake questionnaire",
      "Enterprise security, GDPR compliance, and direct CRM webhook routing",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zod", "Vite"],
    urlSlug: "stratum-advisory.studio",
    previewImages: {
      desktop: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      tablet: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
      mobile: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
    },
    sampleUi: {
      heroHeadline: "Strategic Capital & Digital Transformation",
      heroSubheadline: "We guide mid-market enterprises through complex technical modernization, governance restructuring, and revenue acceleration.",
      primaryCtaText: "Request Executive Brief",
      secondaryCtaText: "Our Methodology",
      accentBg: "from-slate-950 via-stone-900 to-neutral-950",
      featurePill: "Q1 Strategic Advisory Sprints Open",
    },
  },
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  selectedIndustry,
  onSelectIndustry,
  onRequestProposal,
}) => {
  const [selectedDemoId, setSelectedDemoId] = useState<IndustrySelectorId>("restaurant");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeModalStudy, setActiveModalStudy] = useState<IndustryCaseStudy | null>(null);

  // Sync with external selectedIndustry prop if provided
  useEffect(() => {
    if (selectedIndustry === "Hospitality & Dining") {
      setSelectedDemoId("restaurant");
    } else if (selectedIndustry === "Real Estate & Estates") {
      setSelectedDemoId("real_estate");
    } else if (selectedIndustry === "Healthcare & Medical") {
      setSelectedDemoId("gym");
    } else if (selectedIndustry === "E-Commerce & Retail") {
      setSelectedDemoId("ecommerce");
    } else if (selectedIndustry === "B2B SaaS & Tech" || selectedIndustry === "Professional Services") {
      setSelectedDemoId("business");
    }
  }, [selectedIndustry]);

  const currentDemo = INDUSTRY_DEMOS.find((d) => d.id === selectedDemoId) || INDUSTRY_DEMOS[0];

  const handleSelectIndustry = (id: IndustrySelectorId) => {
    setSelectedDemoId(id);
    if (onSelectIndustry) {
      if (id === "restaurant") onSelectIndustry("Hospitality & Dining");
      else if (id === "real_estate") onSelectIndustry("Real Estate & Estates");
      else if (id === "gym") onSelectIndustry("Healthcare & Medical");
      else if (id === "ecommerce") onSelectIndustry("E-Commerce & Retail");
      else if (id === "business") onSelectIndustry("B2B SaaS & Tech");
    }
  };

  const handleOpenCaseStudyModal = (caseStudyId?: "bonavia" | "luchsheye") => {
    if (!caseStudyId) return;
    const study = CASE_STUDIES.find((cs) => cs.id === caseStudyId);
    if (study) {
      setActiveModalStudy(study);
    }
  };

  const handleCtaClick = () => {
    // Construct a synthetic or existing study object to pass to the inquiry modal
    if (currentDemo.matchingCaseStudyId) {
      const match = CASE_STUDIES.find((cs) => cs.id === currentDemo.matchingCaseStudyId);
      if (match) {
        onRequestProposal(match);
        return;
      }
    }

    // Generic concept inquiry
    onRequestProposal({
      id: currentDemo.id,
      title: currentDemo.title,
      clientName: `${currentDemo.label} Industry Concept`,
      industry: currentDemo.industryTag as any,
      projectType: `${currentDemo.label} Website`,
      statusBadge: "Concept Project",
      isConceptOrDemo: true,
      tagline: currentDemo.tagline,
      shortDescription: currentDemo.description,
      challenge: "Needs modern, high-performance web architecture.",
      solution: "Engineered bespoke web platform.",
      accentColor: "from-[#0B1726] to-[#1E293B]",
      techStack: currentDemo.techStack,
      features: currentDemo.highlights,
      livePreview: {
        headline: currentDemo.sampleUi.heroHeadline,
        subheadline: currentDemo.sampleUi.heroSubheadline,
        previewBannerBg: currentDemo.sampleUi.accentBg,
        highlights: currentDemo.highlights.slice(0, 3),
        desktopMockupUrl: currentDemo.previewImages.desktop,
        mobileMockupUrl: currentDemo.previewImages.mobile,
      },
    });
  };

  return (
    <section id="work" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Selected Work & Concept Prototypes
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Selected Work &{" "}
            <span className="text-[#D4A72C]">
              Interactive Concepts
            </span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed">
            Explore working architectural concepts and functional case studies engineered for specific business sectors. Test responsive viewports and review technical stacks below.
          </p>

          {/* Explicit Concept / Demo Transparency Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0B1726]/5 border border-[#0B1726]/10 text-xs text-[#0B1726]/80 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
            <span>Interactive Concept Demos: High-fidelity working prototypes engineered to showcase capability & design execution.</span>
          </div>
        </div>

        {/* 5 Industry Selectors (Interactive Tabs) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12">
          {INDUSTRY_DEMOS.map((demo) => {
            const Icon = demo.icon;
            const isSelected = selectedDemoId === demo.id;

            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleSelectIndustry(demo.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] ${
                  isSelected
                    ? "bg-[#0B1726] text-[#D4A72C] ring-2 ring-[#0B1726] shadow-md scale-[1.02]"
                    : "bg-white text-[#111827]/75 hover:text-[#0B1726] hover:bg-white/90 border border-[#E5E7EB]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-[#D4A72C]" : "text-[#111827]/50"}`} />
                <span>{demo.label}</span>
                {demo.isComingSoon && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                      isSelected
                        ? "bg-[#D4A72C]/20 text-[#D4A72C] border border-[#D4A72C]/40"
                        : "bg-[#E5E7EB] text-[#111827]/60"
                    }`}
                  >
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage: 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start max-w-7xl mx-auto">
          {/* Left Column (5 Cols): Project Specs, Honest Badge, Features, and CTA */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="elevated" padding="lg" className="bg-white border-[#E5E7EB] space-y-5">
              {/* Status Header Badge */}
              <div className="flex items-center justify-between gap-3 flex-wrap pb-3 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase inline-flex items-center gap-1.5 ${
                      currentDemo.statusBadge === "Concept Project"
                        ? "bg-[#0B1726] text-[#D4A72C] border border-[#D4A72C]/30"
                        : "bg-blue-50 text-blue-800 border border-blue-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        currentDemo.statusBadge === "Concept Project" ? "bg-[#D4A72C]" : "bg-blue-500 animate-pulse"
                      }`}
                    ></span>
                    {currentDemo.statusBadge}
                  </span>
                </div>
                <span className="text-xs text-[#111827]/60 font-medium">{currentDemo.industryTag}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1726]">
                  {currentDemo.title}
                </h3>
                <p className="text-xs text-[#D4A72C] font-semibold mt-0.5 tracking-wide">
                  {currentDemo.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#111827]/75 mt-3 leading-relaxed">
                  {currentDemo.description}
                </p>
              </div>

              {/* Verified Architecture Highlights */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#111827]/50 block">
                  Engineered Capabilities:
                </span>
                <div className="space-y-2">
                  {currentDemo.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#111827]/85">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111827]/50 block mb-2">
                  Technology Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDemo.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* If Case Study exists (Bonavia or Luchsheye), allow opening deep case study */}
              {currentDemo.matchingCaseStudyId && (
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleOpenCaseStudyModal(currentDemo.matchingCaseStudyId)}
                    rightIcon={<Eye className="w-3.5 h-3.5 text-[#D4A72C]" />}
                    className="text-xs font-bold"
                  >
                    View Full {currentDemo.title} Case Study
                  </Button>
                </div>
              )}

              {/* Notice for Coming Soon Demos */}
              {currentDemo.isComingSoon && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                  <span className="font-bold block mb-0.5">Honest Scope Notice:</span>
                  This is an in-development concept specification. In adherence to our integrity guidelines, we do not fabricate client metrics, sales increases, or fake client testimonials.
                </div>
              )}
            </Card>

            {/* Signature CTA Card (User Request: "Want Something Like This?" + "Get Your Free Concept") */}
            <Card
              variant="elevated"
              padding="lg"
              className="bg-gradient-to-br from-[#0B1726] to-[#1E293B] text-white border-[#0B1726] relative overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4A72C]/20 border border-[#D4A72C]/40 text-[#D4A72C] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Custom Engineering</span>
                </div>

                <div>
                  <h4 className="font-display text-xl sm:text-2xl font-black text-[#F7F7F5] tracking-tight">
                    Want Something Like This?
                  </h4>
                  <p className="text-xs sm:text-sm text-[#E5E7EB]/75 mt-1.5 leading-relaxed">
                    Partner directly with lead engineer Hanzla Nathiyal to design a high-velocity {currentDemo.label.toLowerCase()} website tailored precisely to your brand.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleCtaClick}
                  className="bg-[#D4A72C] hover:bg-[#b88f22] text-[#0B1726] font-bold text-xs sm:text-sm justify-center shadow-md py-3"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#0B1726]" />}
                >
                  Get Your Free Concept
                </Button>

                <div className="pt-2 flex items-center justify-between text-[10px] text-[#E5E7EB]/60 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Zero template code
                  </span>
                  <span>100% Code Ownership</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column (7 Cols): Interactive Viewport Mockup */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewport Device Controls & Simulated URL Bar */}
            <div className="flex items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-[#E5E7EB] shadow-xs flex-wrap">
              {/* Mac-style traffic lights & simulated URL */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-[#E5E7EB] text-[11px] font-mono text-[#111827]/70 truncate max-w-[240px]">
                  <span className="text-[#D4A72C] font-bold">https://</span>
                  <span className="truncate">{currentDemo.urlSlug}</span>
                </div>
              </div>

              {/* Device Mode Switcher (Desktop, Tablet, Mobile) */}
              <div className="flex items-center bg-[#F7F7F5] p-1 rounded-xl border border-[#E5E7EB] text-xs">
                <button
                  type="button"
                  onClick={() => setDeviceMode("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${
                    deviceMode === "desktop"
                      ? "bg-[#0B1726] text-[#D4A72C] shadow-xs"
                      : "text-[#111827]/60 hover:text-[#0B1726]"
                  }`}
                  title="Desktop View (1200px)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden min-[420px]:inline">Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("tablet")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${
                    deviceMode === "tablet"
                      ? "bg-[#0B1726] text-[#D4A72C] shadow-xs"
                      : "text-[#111827]/60 hover:text-[#0B1726]"
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden min-[420px]:inline">Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeviceMode("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold ${
                    deviceMode === "mobile"
                      ? "bg-[#0B1726] text-[#D4A72C] shadow-xs"
                      : "text-[#111827]/60 hover:text-[#0B1726]"
                  }`}
                  title="Mobile View (390px)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden min-[420px]:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Simulated Device Frame Container */}
            <div className="p-3 sm:p-6 rounded-3xl bg-[#E5E7EB]/40 border border-[#E5E7EB] flex items-center justify-center min-h-[480px] sm:min-h-[560px] overflow-hidden transition-all duration-300">
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl border border-[#E5E7EB] shadow-2xl overflow-hidden transition-all duration-500 flex flex-col ${
                  deviceMode === "desktop"
                    ? "w-full"
                    : deviceMode === "tablet"
                    ? "w-[85%] max-w-[580px]"
                    : "w-[65%] max-w-[340px]"
                }`}
              >
                {/* Simulated App Header inside device */}
                <div className="px-4 py-3 bg-[#0B1726] text-white flex items-center justify-between border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4A72C]"></span>
                    <span className="font-display font-black tracking-tight text-[#F7F7F5]">
                      {currentDemo.title.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden min-[480px]:inline text-[10px] text-white/60 font-mono">
                      {currentDemo.industryTag}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A72C] text-[#0B1726] font-bold">
                      DEMO
                    </span>
                  </div>
                </div>

                {/* Simulated Web Canvas */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group">
                  {/* Hero Backdrop Image with Zero-CLS aspect ratio and responsive srcset */}
                  <img
                    src={
                      deviceMode === "desktop"
                        ? currentDemo.previewImages.desktop
                        : deviceMode === "tablet"
                        ? currentDemo.previewImages.tablet
                        : currentDemo.previewImages.mobile
                    }
                    srcSet={`${currentDemo.previewImages.mobile} 600w, ${currentDemo.previewImages.tablet} 800w, ${currentDemo.previewImages.desktop} 1200w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                    alt={`${currentDemo.title} - ${currentDemo.industryTag} responsive website design interface preview in ${deviceMode} view`}
                    width={1200}
                    height={675}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark Vignette Overlay for UI Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 flex flex-col justify-end p-4 sm:p-6 text-white">
                    {/* Live Feature Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-[#D4A72C] font-semibold w-fit mb-2 sm:mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>{currentDemo.sampleUi.featurePill}</span>
                    </div>

                    {/* Simulated Hero Typography */}
                    <h4 className="font-display text-base sm:text-xl md:text-2xl font-black text-white leading-tight mb-1.5 sm:mb-2">
                      {currentDemo.sampleUi.heroHeadline}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/80 line-clamp-2 leading-relaxed mb-3 sm:mb-4 max-w-lg">
                      {currentDemo.sampleUi.heroSubheadline}
                    </p>

                    {/* Simulated Interactive Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleCtaClick}
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#D4A72C] text-[#0B1726] font-bold text-xs hover:bg-[#b88f22] transition-colors shadow-sm"
                      >
                        {currentDemo.sampleUi.primaryCtaText}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (currentDemo.matchingCaseStudyId) {
                            handleOpenCaseStudyModal(currentDemo.matchingCaseStudyId);
                          } else {
                            handleCtaClick();
                          }
                        }}
                        className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/20 backdrop-blur-md text-white font-semibold text-xs hover:bg-white/30 transition-colors border border-white/30"
                      >
                        {currentDemo.sampleUi.secondaryCtaText}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Device Chrome Info Bar */}
                <div className="px-4 py-3 bg-[#F7F7F5] border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#111827]/70">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>100/100 Core Web Vitals Standard</span>
                  </span>
                  <span className="font-mono text-[10px] text-[#111827]/50">
                    {deviceMode.toUpperCase()} VIEWPORT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Case Study Modal (for Bonavia & Luchsheye deep dive - Code-split) */}
      <Suspense fallback={null}>
        {activeModalStudy && (
          <CaseStudyModal
            study={activeModalStudy}
            onClose={() => setActiveModalStudy(null)}
            onRequestProposal={(s) => onRequestProposal(s)}
          />
        )}
      </Suspense>
    </section>
  );
};
