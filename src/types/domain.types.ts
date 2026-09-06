export type IndustryType =
  | "All"
  | "E-Commerce & Retail"
  | "Healthcare & Medical"
  | "B2B SaaS & Tech"
  | "Real Estate & Estates"
  | "Hospitality & Dining"
  | "Professional Services";

export interface CaseStudyMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface IndustryCaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: IndustryType;
  projectType: string;
  statusBadge: "Concept Project" | "Demo Project" | "Client Project";
  isConceptOrDemo: boolean;
  tagline: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  accentColor: string;
  badge: string;
  metrics?: CaseStudyMetric[];
  techStack: string[];
  features: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
    company: string;
    avatarUrl: string;
  };
  livePreview: {
    headline: string;
    subheadline: string;
    previewBannerBg: string;
    highlights: string[];
    desktopMockupUrl: string;
    mobileMockupUrl: string;
  };
  duration: string;
  year: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  tagline: string;
  badge?: string;
  startingPrice: string;
  timeline: string;
  deliverables: string[];
  idealFor: string;
  techHighlights: string[];
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  timeline: string;
  description: string;
  clientDeliverable: string;
  guarantee: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: IndustryType;
  avatar: string;
  rating: number;
  highlightMetric: string;
  quote: string;
  projectScope: string;
  secondaryMetric?: string;
  verified?: boolean;
  year?: string;
  location?: string;
  deliverables?: string[];
}

export interface CalculatorState {
  industry: string;
  projectType: "conversion_landing" | "business_corporate" | "ecommerce_store" | "custom_webapp" | "enterprise_replatform";
  scale: "startup" | "growth" | "enterprise";
  features: string[];
  designLevel: "standard" | "high_end" | "bespoke_motion";
  rushDelivery: boolean;
}

export interface CalculatedEstimate {
  estimatedCostMin: number;
  estimatedCostMax: number;
  estimatedTimelineMin: number;
  estimatedTimelineMax: number;
  recommendedStack: string[];
  deliverablesList: string[];
}

export interface DedicatedService {
  id: string;
  title: string;
  description: string;
  relevantFeatures: string[];
  ctaText: string;
  category: "Design" | "Development" | "Optimization & Support";
  iconName: string;
  typicalTimeline: string;
}

