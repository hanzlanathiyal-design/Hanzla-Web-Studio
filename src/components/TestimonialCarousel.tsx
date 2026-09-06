import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  Zap,
  Pause,
  Play,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { TESTIMONIALS } from "../data/agencyData";
import { Testimonial, IndustryType } from "../types";
import { Badge, Button } from "./ui";

interface TestimonialCarouselProps {
  onOpenInquiry?: () => void;
  filterIndustry?: IndustryType;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onOpenInquiry,
  filterIndustry = "All",
}) => {
  const [activeIndustry, setActiveIndustry] = useState<IndustryType>(filterIndustry);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageLoadedMap, setImageLoadedMap] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Available filter categories based on actual items
  const industries: IndustryType[] = [
    "All",
    "Hospitality & Dining",
    "Real Estate & Estates",
    "Healthcare & Medical",
    "E-Commerce & Retail",
    "B2B SaaS & Tech",
    "Professional Services",
  ];

  // Filtered testimonials
  const filteredStories = TESTIMONIALS.filter((t) =>
    activeIndustry === "All" ? true : t.industry === activeIndustry
  );

  const total = filteredStories.length;

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeIndustry]);

  // Safe navigation handlers
  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Autoplay management
  useEffect(() => {
    if (!isPlaying || total <= 1) return;

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, total, handleNext, currentIndex]);

  // Pause on hover/focus
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  // Touch swipe support (lightweight & zero layout shift)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 45;
      if (diff > minSwipeDistance) {
        handleNext();
      } else if (diff < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const currentTestimonial: Testimonial | undefined = filteredStories[currentIndex];

  if (total === 0 || !currentTestimonial) {
    return null;
  }

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client Success Stories & Testimonials"
      className="w-full focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Industry Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
        {industries.map((ind) => {
          const count =
            ind === "All"
              ? TESTIMONIALS.length
              : TESTIMONIALS.filter((t) => t.industry === ind).length;
          if (count === 0 && ind !== "All") return null;

          const isActive = activeIndustry === ind;
          return (
            <button
              key={ind}
              type="button"
              onClick={() => {
                setActiveIndustry(ind);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#0B1726] text-white shadow-xs"
                  : "bg-white text-[#111827]/70 hover:text-[#0B1726] hover:bg-black/5 border border-[#E5E7EB]"
              }`}
            >
              <span>{ind}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#F7F7F5] text-[#111827]/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Carousel Card Container */}
      <div
        className="relative bg-white rounded-3xl border border-[#E5E7EB] shadow-lg shadow-black/5 overflow-hidden transition-all duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Decorative Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D4A72C]/8 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

        {/* Carousel Content Grid */}
        <div className="p-6 sm:p-10 md:p-12 min-h-[460px] flex flex-col justify-between relative z-10">
          {/* Top Bar: Verification Badge, Rating & Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]/80">
            <div className="flex items-center gap-3">
              {/* Verified Client Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Client Partnership</span>
              </div>

              {/* Industry Tag */}
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#111827]/60 font-medium">
                <Building2 className="w-3.5 h-3.5" />
                {currentTestimonial.industry}
              </span>
            </div>

            {/* Stars & Slide Counter */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-1 text-[#D4A72C]"
                aria-label={`${currentTestimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current text-[#D4A72C]"
                  />
                ))}
              </div>

              <div className="text-xs font-mono font-bold text-[#0B1726]/70 bg-[#F7F7F5] px-2.5 py-1 rounded-md border border-[#E5E7EB]">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Center Stage: Highlight Metrics & Quote Body */}
          <div className="my-8">
            {/* Metric Highlights Pill Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              {/* Primary Metric Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B1726] text-[#D4A72C] font-mono text-xs sm:text-sm font-bold shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>{currentTestimonial.highlightMetric}</span>
              </div>

              {/* Secondary Performance Metric */}
              {currentTestimonial.secondaryMetric && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200/80">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentTestimonial.secondaryMetric}</span>
                </div>
              )}

              {/* Project Scope Pill */}
              <div className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F7F7F5] text-[#111827]/80 text-xs font-medium border border-[#E5E7EB]">
                <Sparkles className="w-3 h-3 text-[#D4A72C]" />
                <span>{currentTestimonial.projectScope}</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#0B1726]/10 absolute -top-4 -left-2 -z-10" />
              <blockquote className="font-display text-lg sm:text-2xl font-bold text-[#0B1726] leading-snug tracking-tight">
                "{currentTestimonial.quote}"
              </blockquote>
            </div>

            {/* Key Deliverables Delivered in Project */}
            {currentTestimonial.deliverables && currentTestimonial.deliverables.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#111827]/60 font-bold mr-1">
                  Deliverables:
                </span>
                {currentTestimonial.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-md bg-[#F7F7F5] text-[#0B1726] border border-[#E5E7EB] font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Bar: Client Info & Carousel Navigation Controls */}
          <div className="pt-6 border-t border-[#E5E7EB]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            {/* Client Avatar + Title */}
            <div className="flex items-center gap-3.5">
              {/* Avatar with Lazy Loading & Layout Shift Prevention */}
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#0B1726] border-2 border-white shadow-md shrink-0 aspect-square">
                {/* Initials Fallback placeholder (visible until image loads) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center font-mono font-bold text-white text-sm bg-gradient-to-br from-[#0B1726] to-[#1E293B] transition-opacity duration-300 ${
                    imageLoadedMap[currentTestimonial.id] ? "opacity-0" : "opacity-100"
                  }`}
                  aria-hidden="true"
                >
                  {getInitials(currentTestimonial.name)}
                </div>

                {/* Lazy-Loaded WebP Image */}
                <img
                  src={currentTestimonial.avatar}
                  alt={`${currentTestimonial.name} - ${currentTestimonial.role} at ${currentTestimonial.company}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onLoad={() =>
                    setImageLoadedMap((prev) => ({
                      ...prev,
                      [currentTestimonial.id]: true,
                    }))
                  }
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoadedMap[currentTestimonial.id] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Name & Credentials */}
              <div>
                <h3 className="font-display text-base font-bold text-[#0B1726] leading-tight">
                  {currentTestimonial.name}
                </h3>
                <p className="text-xs text-[#111827]/75 font-medium mt-0.5">
                  {currentTestimonial.role},{" "}
                  <span className="font-semibold text-[#0B1726]">
                    {currentTestimonial.company}
                  </span>
                </p>
                {currentTestimonial.location && (
                  <p className="text-[11px] text-[#111827]/55 mt-0.5">
                    {currentTestimonial.location} • {currentTestimonial.year || "2025"}
                  </p>
                )}
              </div>
            </div>

            {/* Navigation Controls & Action Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Autoplay Play/Pause Toggle */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F7F7F5] text-[#0B1726] flex items-center justify-center transition-colors focus:ring-2 focus:ring-[#D4A72C]/40 focus:outline-none"
                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-[#0B1726]/70" />
                ) : (
                  <Play className="w-4 h-4 text-[#0B1726] fill-current ml-0.5" />
                )}
              </button>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F7F7F5] text-[#0B1726] flex items-center justify-center transition-colors focus:ring-2 focus:ring-[#D4A72C]/40 focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#0B1726] bg-[#0B1726] text-white hover:bg-[#1E293B] flex items-center justify-center transition-colors shadow-xs focus:ring-2 focus:ring-[#D4A72C]/40 focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Inquiry CTA */}
              {onOpenInquiry && (
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4A72C] hover:bg-[#B88D22] text-[#0B1726] text-xs font-bold transition-all shadow-xs ml-2"
                >
                  <span>Build Similar Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0B1726]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots & Progress Indicator */}
        <div className="bg-[#F7F7F5] px-6 py-3 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {filteredStories.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4A72C] ${
                  idx === currentIndex
                    ? "w-8 bg-[#0B1726]"
                    : "w-2 bg-[#E5E7EB] hover:bg-[#0B1726]/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : undefined}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#111827]/60 font-mono">
            <span className="hidden sm:inline">Use Arrow Keys or Swipe</span>
            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client Retention
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
