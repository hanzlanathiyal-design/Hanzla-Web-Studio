import { CalculatorState, CalculatedEstimate } from "../types";

export interface FeatureOption {
  id: string;
  label: string;
  cost: number;
}

export const AVAILABLE_FEATURES: FeatureOption[] = [
  { id: "booking", label: "Self-Service Scheduling & Calendar Engine", cost: 650 },
  { id: "cms", label: "Headless CMS for Instant In-House Updates", cost: 850 },
  { id: "payments", label: "Stripe / Apple Pay 1-Click Checkout & Subscriptions", cost: 1200 },
  { id: "motion", label: "Custom 3D / Fluid Micro-Interactions", cost: 750 },
  { id: "multilang", label: "Multi-Language & Geo-Targeting", cost: 950 },
  { id: "auth_portal", label: "Protected Client Portal & User Accounts", cost: 1800 },
  { id: "crm_webhooks", label: "Automated CRM / Email Lead Routing", cost: 500 },
];

export class CalculatorService {
  public calculateEstimate(state: CalculatorState): CalculatedEstimate {
    let baseMin = 2800;
    let baseMax = 3800;
    let timeMin = 1;
    let timeMax = 2;

    switch (state.projectType) {
      case "conversion_landing":
        baseMin = 2800;
        baseMax = 3800;
        timeMin = 1;
        timeMax = 2;
        break;
      case "business_corporate":
        baseMin = 4800;
        baseMax = 7200;
        timeMin = 2;
        timeMax = 4;
        break;
      case "ecommerce_store":
        baseMin = 8500;
        baseMax = 12500;
        timeMin = 3;
        timeMax = 5;
        break;
      case "custom_webapp":
        baseMin = 11500;
        baseMax = 18500;
        timeMin = 4;
        timeMax = 8;
        break;
      case "enterprise_replatform":
        baseMin = 16000;
        baseMax = 28000;
        timeMin = 6;
        timeMax = 10;
        break;
    }

    const featuresCost = state.features.reduce((acc, featId) => {
      const match = AVAILABLE_FEATURES.find((f) => f.id === featId);
      return acc + (match ? match.cost : 0);
    }, 0);

    let scaleMultiplier = 1.0;
    if (state.scale === "growth") scaleMultiplier = 1.25;
    if (state.scale === "enterprise") scaleMultiplier = 1.6;

    let designMultiplier = 1.0;
    if (state.designLevel === "high_end") designMultiplier = 1.2;
    if (state.designLevel === "bespoke_motion") designMultiplier = 1.4;

    let costMin = Math.round((baseMin + featuresCost) * scaleMultiplier * designMultiplier);
    let costMax = Math.round((baseMax + featuresCost * 1.3) * scaleMultiplier * designMultiplier);

    if (state.rushDelivery) {
      costMin = Math.round(costMin * 1.25);
      costMax = Math.round(costMax * 1.25);
      timeMin = Math.max(1, Math.round(timeMin * 0.65));
      timeMax = Math.max(1, Math.round(timeMax * 0.7));
    }

    const recommendedStack =
      state.projectType === "ecommerce_store"
        ? ["Next.js 15", "Shopify Storefront API", "Tailwind CSS", "Stripe Checkout", "Cloudflare"]
        : state.projectType === "custom_webapp"
        ? ["React 19 / Next.js", "Node.js Microservices", "PostgreSQL", "Tailwind CSS", "Redis"]
        : state.projectType === "enterprise_replatform"
        ? ["Next.js App Router", "Headless CMS (Sanity)", "TypeScript", "Vercel Enterprise", "Algolia Search"]
        : ["React + Vite / Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Cloudflare CDN"];

    const deliverablesList = [
      "Bespoke High-Fidelity Interactive Wireframes & Prototype",
      "Production TypeScript Codebase (100% Unminified Client Ownership)",
      "Core Web Vitals Guarantee (95+ Google PageSpeed Performance)",
      "Cross-Browser Mobile & Desktop Fluid Responsive QA",
      "Full On-Page Technical SEO Schema & OpenGraph Meta Tags",
      "30-Day Post-Launch Hypercare Warranty & Live Monitoring",
    ];

    if (state.features.includes("cms")) {
      deliverablesList.push("Staff Video Tutorial & Headless CMS Publishing Guide");
    }
    if (state.features.includes("payments")) {
      deliverablesList.push("PCI-Compliant Payment Gateway Integration & Webhook Testing");
    }

    return {
      estimatedCostMin: costMin,
      estimatedCostMax: costMax,
      estimatedTimelineMin: timeMin,
      estimatedTimelineMax: timeMax,
      recommendedStack,
      deliverablesList,
    };
  }
}

export const calculatorService = new CalculatorService();
