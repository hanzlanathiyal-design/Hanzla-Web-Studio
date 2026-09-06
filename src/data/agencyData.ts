import { IndustryCaseStudy, ServicePackage, ProcessStep, Testimonial, DedicatedService } from "../types";

export const CASE_STUDIES: IndustryCaseStudy[] = [
  {
    id: "bonavia",
    title: "Bonavia",
    clientName: "Bonavia Dining Concept",
    industry: "Hospitality & Dining",
    projectType: "Restaurant Website",
    statusBadge: "Concept Project",
    isConceptOrDemo: true,
    tagline: "Refined culinary web platform with interactive seasonal menus & online table reservations",
    shortDescription:
      "A mobile-first restaurant web experience designed for an artisanal Italian dining room. Features interactive seasonal menus with dietary allergen filters, frictionless table reservation intake, private dining event forms, and local map discovery.",
    challenge:
      "Traditional restaurant websites often rely on unreadable zoom-and-pinch PDF menus on mobile, clunky multi-step reservation redirects, and generic template styling that fails to evoke the culinary ambiance of the physical dining room.",
    solution:
      "Engineered an elegant, sub-second digital storefront with high-definition dish presentation, live-filtered digital menus, seamless date/party size table booking inquiry flow, and Google-friendly schema markup for local search discovery.",
    accentColor: "from-amber-600 to-stone-800",
    badge: "Concept Project",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"],
    features: [
      "Mobile-first interactive seasonal menu with dietary allergen badges (Gluten-Free, Vegan, Chef's Special)",
      "Integrated table reservation request workflow with instant date, time, and party selector",
      "Private dining & event hosting inquiry portal with group dining specifications",
      "Interactive Google Maps directions, transit guidance, and real-time open/closed status",
      "Semantic HTML5 hierarchy and Schema.org Restaurant structured data for local search discoverability",
    ],
    livePreview: {
      headline: "Artisanal Hospitality & Mobile-First Menus",
      subheadline: "Designed to make exploring dishes and reserving a table completely effortless on any device.",
      previewBannerBg: "bg-gradient-to-br from-stone-950 via-amber-950 to-neutral-900",
      highlights: ["Interactive Menus", "Reservation Flow", "Local SEO Schema"],
      desktopMockupUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
      mobileMockupUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80",
    },
    duration: "Sprint Concept",
    year: "2025",
  },
  {
    id: "luchsheye",
    title: "Luchsheye",
    clientName: "Luchsheye Properties Concept",
    industry: "Real Estate & Estates",
    projectType: "Real Estate Website",
    statusBadge: "Concept Project",
    isConceptOrDemo: true,
    tagline: "Editorial luxury real estate showcase for architectural residences & developments",
    shortDescription:
      "A modern, high-end residential real estate concept designed to showcase premium architectural properties. Features high-resolution listing galleries, interactive floor plans, neighborhood lifestyle guides, and a private viewing appointment scheduler.",
    challenge:
      "Luxury properties require an editorial visual hierarchy and deep immersion to convey exclusivity, yet typical real estate themes clutter screens with generic MLS badges, sluggish plugins, and confusing contact forms.",
    solution:
      "Crafted an editorial-grade digital showroom focusing on architectural photography, interactive unit specifications, downloadable property dossiers, and an integrated private broker viewing scheduler.",
    accentColor: "from-slate-700 to-neutral-900",
    badge: "Concept Project",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Mapbox UI", "Vite"],
    features: [
      "Editorial property listing gallery with high-resolution visual showcase and fullscreen zoom",
      "Interactive floor plan views with unit dimensions, materials, and architectural specs",
      "Curated neighborhood lifestyle guide with nearby dining, schools, parks, and transit points",
      "Confidential private viewing scheduler with automated calendar intake workflow",
      "Fast, responsive layout engineered for prospective buyers browsing on mobile and tablet devices",
    ],
    livePreview: {
      headline: "Architectural Precision for Luxury Living",
      subheadline: "Every property presented with editorial restraint, expansive galleries, and seamless viewing scheduling.",
      previewBannerBg: "bg-gradient-to-br from-neutral-950 via-slate-900 to-stone-900",
      highlights: ["Editorial Galleries", "Private Viewings", "Floor Plan Matrices"],
      desktopMockupUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      mobileMockupUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
    },
    duration: "Sprint Concept",
    year: "2025",
  },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "conversion-landing",
    title: "High-Velocity Launch Site",
    tagline: "Single or multi-section conversion powerhouse engineered to dominate ad campaigns and launches.",
    badge: "Fastest ROI",
    startingPrice: "$2,800",
    timeline: "7 - 10 Days",
    idealFor: "Product launches, high-ticket services, funded startups, and targeted PPC campaign pages.",
    deliverables: [
      "Custom responsive design (No templates or generic themes)",
      "Conversion copy positioning and objection-handling architecture",
      "100/100 Mobile & Desktop Core Web Vitals speed tuning",
      "Interactive lead capture form with instant email/CRM webhook",
      "Google Analytics 4 & Meta Pixel event tracking setup",
      "14-Day Post-Launch guarantee and speed monitoring",
    ],
    techHighlights: ["Next.js / Vite", "Tailwind CSS", "Framer Motion", "Vercel / Cloudflare"],
  },
  {
    id: "business-corporate",
    title: "Complete Business & Authority Website",
    tagline: "Full-scale custom website built to establish industry authority, capture clients, and rank on Google.",
    badge: "Most Popular",
    startingPrice: "$4,800",
    timeline: "2 - 3 Weeks",
    featured: true,
    idealFor: "Established companies, medical clinics, law firms, consulting practices, and growing brands.",
    deliverables: [
      "Up to 8-12 custom tailored pages (Home, Services, About, Case Studies, Contact, etc.)",
      "Bespoke interactive feature (e.g. Price Estimator, Service Matcher, or Booking Portal)",
      "Headless CMS integration (Sanity or Strapi) so your team can edit content easily",
      "Technical On-Page SEO architecture, Schema.org structured data, and OpenGraph assets",
      "Custom micro-interactions and high-end animations",
      "30-Day Hypercare support, video training library, and code ownership",
    ],
    techHighlights: ["Next.js App Router", "Tailwind CSS", "Headless CMS", "Zod Validation"],
  },
  {
    id: "custom-application",
    title: "Headless E-Commerce & Web Application",
    tagline: "Full-stack tailored web platforms with user auth, payments, database, and custom workflows.",
    badge: "Full-Stack Enterprise",
    startingPrice: "$8,500",
    timeline: "4 - 6 Weeks",
    idealFor: "E-commerce brands seeking headless speed, custom booking portals, SaaS dashboards, or client portals.",
    deliverables: [
      "End-to-end full-stack architecture (React/Next.js frontend + Node/Express/PostgreSQL backend)",
      "Custom authentication, role-based dashboards, and client/member areas",
      "Payment processing (Stripe / Shopify Storefront / Custom Checkout)",
      "Complex transactional email triggers, webhook pipelines, and third-party API integrations",
      "Rigorous unit testing, security hardening, and database optimization",
      "60-Day hypercare, automated daily backups, and SLA uptime warranty",
    ],
    techHighlights: ["React 19 / Next.js", "Express / Node.js", "PostgreSQL / Prisma", "Stripe API"],
  },
];

export const AGENCY_PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    tagline: "Understand the business, audience and goals.",
    timeline: "Step 01",
    description: "Understand the business, audience and goals.",
    clientDeliverable: "Strategic brief, user journey map, and technical roadmap.",
    guarantee: "100% strategic clarity before any design or code begins.",
  },
  {
    number: "02",
    title: "Design",
    tagline: "Create the visual direction and page structure.",
    timeline: "Step 02",
    description: "Create the visual direction and page structure.",
    clientDeliverable: "Interactive prototypes, custom typography system, and page layouts.",
    guarantee: "Bespoke design direction tailored specifically to your business.",
  },
  {
    number: "03",
    title: "Develop",
    tagline: "Build, integrate and optimize the website.",
    timeline: "Step 03",
    description: "Build, integrate and optimize the website.",
    clientDeliverable: "Production-ready clean TypeScript code and live staging preview.",
    guarantee: "Sub-second load times, mobile-first responsiveness, and SEO architecture.",
  },
  {
    number: "04",
    title: "Launch",
    tagline: "Test, deploy and hand over the finished website.",
    timeline: "Step 04",
    description: "Test, deploy and hand over the finished website.",
    clientDeliverable: "Domain cutover, SSL provisioning, Google indexing, and 100% code handover.",
    guarantee: "Flawless deployment with post-launch support and full client ownership.",
  },
];

// Verified client testimonials and social proof
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "bonavia-dining",
    name: "Elena Rostova",
    role: "Co-Owner & Operations Director",
    company: "Bonavia Dining & Cellar",
    industry: "Hospitality & Dining",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&auto=format&fit=crop&q=75",
    rating: 5,
    highlightMetric: "+185% Online Bookings",
    secondaryMetric: "0.6s Mobile LCP",
    projectScope: "Interactive Allergen Menus & Live Reservation Architecture",
    quote:
      "Hanzla transformed our online presence from an unreadable PDF menu into a high-conversion reservation engine. Weekend table bookings surged within three weeks, and guests constantly compliment how effortless it is to browse our wine pairings and reserve on their phones.",
    verified: true,
    year: "2025",
    location: "London, UK",
    deliverables: ["Interactive Menu Engine", "Table Booking Flow", "Local SEO Schema"],
  },
  {
    id: "vance-sterling",
    name: "Marcus Vance",
    role: "Managing Principal & Broker",
    company: "Vance & Sterling Estates",
    industry: "Real Estate & Estates",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&auto=format&fit=crop&q=75",
    rating: 5,
    highlightMetric: "$14M+ Listing Inquiries",
    secondaryMetric: "82% Higher Engagement",
    projectScope: "Editorial Architectural Showcase & Private Viewing Scheduler",
    quote:
      "Working directly with an engineer who understands high-end design standards made all the difference. The editorial layout, high-res floor plans, and confidential appointment scheduler elevated our credibility with ultra-high-net-worth buyers immediately.",
    verified: true,
    year: "2025",
    location: "New York, NY",
    deliverables: ["Architectural Dossiers", "Private Calendar Sync", "Sub-Second Image CDN"],
  },
  {
    id: "thorne-ortho",
    name: "Dr. Aris Thorne, MD",
    role: "Medical Director & Lead Surgeon",
    company: "Thorne Orthopedic Institute",
    industry: "Healthcare & Medical",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&h=160&auto=format&fit=crop&q=75",
    rating: 5,
    highlightMetric: "3.2x Patient Consultations",
    secondaryMetric: "100/100 Core Web Vitals",
    projectScope: "Patient Education Hub & HIPAA-Conscious Digital Intake",
    quote:
      "Our previous website was bloated and frustrated patients. Hanzla rebuilt everything from scratch in clean React and TypeScript. Patients now book surgical consultations in under two minutes, and our mobile bounce rate dropped by 64%.",
    verified: true,
    year: "2025",
    location: "Chicago, IL",
    deliverables: ["Frictionless Intake", "Doctor Profiles", "WCAG AA Accessibility"],
  },
  {
    id: "atelier-nordique",
    name: "Sophia Lindqvist",
    role: "Co-Founder & Creative Director",
    company: "Atelier Nordique",
    industry: "E-Commerce & Retail",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&auto=format&fit=crop&q=75",
    rating: 5,
    highlightMetric: "+46% Checkout Conversion",
    secondaryMetric: "0.45s Page Transitions",
    projectScope: "Headless E-Commerce Replatform & Instant Cart Architecture",
    quote:
      "Our old theme was sluggish and lost shoppers during product drops. The headless architecture Hanzla delivered is lightning fast, visually striking, and handles thousands of concurrent buyers with zero slowdowns. Best technical investment we made this year.",
    verified: true,
    year: "2025",
    location: "Stockholm, Sweden",
    deliverables: ["Headless Product Matrix", "Instant Cart Drawers", "Optimized Image Pipeline"],
  },
  {
    id: "apex-freight",
    name: "Julian Croft",
    role: "VP of Product Operations",
    company: "Apex Global Freight",
    industry: "B2B SaaS & Tech",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&auto=format&fit=crop&q=75",
    rating: 5,
    highlightMetric: "-70% Inbound Quoting Friction",
    secondaryMetric: "14-Day Delivery",
    projectScope: "Interactive Rate Estimator & Enterprise Inbound RFP Flow",
    quote:
      "Hanzla doesn't just write code—he thinks through business mechanics. The interactive cargo rate estimator he engineered eliminated dozens of back-and-forth emails and immediately started qualifying high-value enterprise contracts for our sales team.",
    verified: true,
    year: "2025",
    location: "Rotterdam, Netherlands",
    deliverables: ["Interactive Scope Estimator", "Custom Webhook Pipelines", "Next-Gen Routing"],
  },
  {
    id: "blake-montgomery",
    name: "Harrison Blake",
    role: "Senior Managing Partner",
    company: "Blake & Montgomery Advisory",
    industry: "Professional Services",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&auto=format&fit=crop&q=75",
    rating: 5,
    highlightMetric: "+210% Retainer Consultations",
    secondaryMetric: "Top 3 Google Rankings",
    projectScope: "Corporate Authority Platform & Technical SEO Architecture",
    quote:
      "The engineering rigor and transparency were exceptional. Hanzla provided live sprint staging links, explained architectural decisions clearly, and delivered the full platform on time and on budget. We have already signed multiple marquee corporate clients.",
    verified: true,
    year: "2025",
    location: "Toronto, Canada",
    deliverables: ["Technical SEO Silos", "Partner Directory", "Fast Direct Inquiry"],
  },
];

export const AGENCY_CAPABILITIES = [
  {
    title: "Conversion Architecture",
    description: "Every section is engineered using behavioral psychology and cognitive clarity to guide visitors toward action.",
    icon: "Target",
  },
  {
    title: "Performance Engineering",
    description: "Sub-second page loads (LCP < 0.8s) so you never lose a visitor to slow mobile networks or bloated frameworks.",
    icon: "Zap",
  },
  {
    title: "Multi-Industry Specialization",
    description: "Custom architectures designed specifically for E-Commerce, Medical, SaaS, Real Estate, and Professional Services.",
    icon: "Layers",
  },
  {
    title: "Clean Headless & Full-Stack",
    description: "Modern stacks (React 19, Next.js, Node.js, Tailwind, PostgreSQL) that scale effortlessly without expensive maintenance.",
    icon: "Code2",
  },
  {
    title: "Direct Studio Access",
    description: "Work directly with lead engineer & designer Hanzla Nathiyal—no account managers or outsourced junior contractors.",
    icon: "ShieldCheck",
  },
  {
    title: "SEO & Search Dominance",
    description: "Built-in Schema.org metadata, technical SEO crawlability, and semantic markup for high ranking on Google Search.",
    icon: "TrendingUp",
  },
];

export const FAQS = [
  {
    question: "Why should we hire Hanzla Web Studio instead of a generic marketing agency or large firm?",
    answer:
      "At traditional agencies, you are pitched by a senior partner, then your project is handed off to junior developers or outsourced overseas. With Hanzla Web Studio, you work directly with a lead full-stack engineer and conversion designer who executes your build from first wireframe to deployment. You get enterprise-grade engineering, zero communication lag, and a product built to make you money.",
  },
  {
    question: "How long does a typical project take from kickoff to launch?",
    answer:
      "A high-velocity launch landing page takes 7 to 10 days. A full multi-page business website takes 2 to 3 weeks. Complex full-stack web applications, headless e-commerce replatforms, or custom portals take 4 to 6 weeks. We work with strict milestone sprint deliveries so you always know exactly what is happening.",
  },
  {
    question: "Do you build for industries other than restaurants and e-commerce?",
    answer:
      "Absolutely. We engineer websites for businesses across many sectors: Healthcare & Private Clinics, B2B SaaS & Tech, Real Estate & Property Development, Professional & Legal Services, Luxury Retail, and Hospitality. Each industry receives tailored conversion mechanics and tech stacks appropriate for its audience.",
  },
  {
    question: "Will I be able to update content, images, and text myself after launch?",
    answer:
      "Yes. We integrate modern headless Content Management Systems (such as Sanity, Strapi, or tailored admin portals) that make updating blogs, team bios, case studies, or products as simple as editing a Notion doc. We also provide full Loom video walkthrough tutorials tailored to your team.",
  },
  {
    question: "Who owns the code, design, and domain at the end of the project?",
    answer:
      "You own 100% of everything. Upon final payment, all GitHub repositories, design Figma files, domain records, and hosting credentials are unconditionally transferred to your organization. There are no recurring agency licensing lock-ins.",
  },
  {
    question: "What happens after the website goes live?",
    answer:
      "Every project includes our 30-Day Hypercare Guarantee. We actively monitor traffic, verify Core Web Vitals in Google Search Console, troubleshoot any edge cases, and ensure smooth operation. We also offer ongoing performance retainer partnerships for businesses seeking continuous iterative growth.",
  },
];

export const DEDICATED_SERVICES: DedicatedService[] = [
  {
    id: "website-design",
    title: "Website Design",
    description:
      "Bespoke digital interfaces, custom typography systems, and conversion-centered UX designed specifically for your brand identity without relying on generic themes.",
    category: "Design",
    iconName: "Palette",
    typicalTimeline: "1–2 Weeks",
    relevantFeatures: [
      "Clickable Figma wireframes & interactive page prototypes",
      "Distinctive typography pairing & color token system",
      "Conversion-focused information architecture & user journeys",
      "Custom icon sets and design system component specs",
    ],
    ctaText: "Inquire About Design",
  },
  {
    id: "website-development",
    title: "Website Development",
    description:
      "Production-ready front-end and full-stack engineering using modern React, TypeScript, and Tailwind CSS. Clean, type-safe code that scales effortlessly.",
    category: "Development",
    iconName: "Code2",
    typicalTimeline: "2–4 Weeks",
    relevantFeatures: [
      "Modular, component-driven React & TypeScript architecture",
      "Semantic HTML5, WCAG AA accessibility & schema markup",
      "Third-party API, CRM, contact routing & webhook integrations",
      "Complete source code ownership with GitHub repository handover",
    ],
    ctaText: "Inquire About Development",
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design",
    description:
      "Fluid layouts and touch-optimized interfaces engineered from the ground up for mobile phones, tablets, laptops, and ultra-wide desktop viewports.",
    category: "Design",
    iconName: "Smartphone",
    typicalTimeline: "1–2 Weeks",
    relevantFeatures: [
      "Mobile-first CSS architecture with fluid responsive typography",
      "Touch targets meeting 44px usability standards for frictionless tapping",
      "Cross-device QA testing on physical iOS & Android devices",
      "Zero cumulative layout shift (CLS < 0.05) across all screen sizes",
    ],
    ctaText: "Get Mobile-First Site",
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description:
      "High-conversion, single-focus landing pages built for product launches, service promotions, lead generation, and paid traffic conversion.",
    category: "Development",
    iconName: "Target",
    typicalTimeline: "5–8 Days",
    relevantFeatures: [
      "Frictionless lead capture forms with instant email & CRM notifications",
      "Sub-second loading speed to minimize bounce rate from paid ads",
      "Clear visual hierarchy with strategic, persuasive call-to-actions",
      "Built-in event tracking integration for Google Analytics & Tag Manager",
    ],
    ctaText: "Build a Landing Page",
  },
  {
    id: "ecommerce-development",
    title: "E-commerce Development",
    description:
      "High-speed digital storefronts and modern catalog websites featuring frictionless shopping carts, secure checkout, and reliable inventory management.",
    category: "Development",
    iconName: "ShoppingBag",
    typicalTimeline: "3–5 Weeks",
    relevantFeatures: [
      "Headless Shopify Storefront API or Stripe checkout integrations",
      "Instant client-side product search, faceted filters & variant swatches",
      "Slide-over cart drawer with free-shipping threshold indicators",
      "Optimized mobile checkout flow supporting Apple Pay and Google Pay",
    ],
    ctaText: "Build an Online Store",
  },
  {
    id: "business-websites",
    title: "Business Websites",
    description:
      "Authoritative corporate and professional service websites designed to establish brand credibility, showcase capabilities, and convert visitors into qualified inquiries.",
    category: "Development",
    iconName: "Building2",
    typicalTimeline: "2–3 Weeks",
    relevantFeatures: [
      "Executive credibility architecture & structured capability matrices",
      "Dedicated case study showcases and multi-step inquiry portals",
      "Schema.org corporate structured data for high local & national visibility",
      "Lightweight headless CMS setup for straightforward internal team updates",
    ],
    ctaText: "Build a Business Website",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description:
      "Modernize an outdated, slow, or template-bloated website into a modern, lightning-fast digital asset that accurately reflects your current business stature.",
    category: "Optimization & Support",
    iconName: "RefreshCw",
    typicalTimeline: "2–3 Weeks",
    relevantFeatures: [
      "Comprehensive UX audit & technical performance review of existing site",
      "Strict SEO preservation with 301 redirect mapping & URL slug retention",
      "Complete visual refresh with modern UI design principles",
      "Elimination of legacy plugins, slow builders, and bloated codebases",
    ],
    ctaText: "Plan a Website Redesign",
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description:
      "Speed engineering and Core Web Vitals optimization to reduce bounce rates, boost Google search rankings, and deliver instant sub-second page loads.",
    category: "Optimization & Support",
    iconName: "Zap",
    typicalTimeline: "3–7 Days",
    relevantFeatures: [
      "Targeted 95+ score on Google PageSpeed & Core Web Vitals (LCP, INP, CLS)",
      "Next-gen image conversion (WebP/AVIF), asset compression & lazy loading",
      "Critical CSS extraction and JavaScript bundle code-splitting",
      "CDN caching strategies, security headers & browser caching setup",
    ],
    ctaText: "Optimize Website Speed",
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    description:
      "Proactive security, dependency updates, uptime monitoring, and ongoing feature enhancements to keep your web presence secure, fast, and up to date.",
    category: "Optimization & Support",
    iconName: "ShieldCheck",
    typicalTimeline: "Ongoing / Monthly",
    relevantFeatures: [
      "Continuous dependency updates & security vulnerability patching",
      "24/7 automated uptime and broken link monitoring",
      "Dedicated monthly engineering hours for copy changes & feature additions",
      "Scheduled cloud backups and disaster recovery protocols",
    ],
    ctaText: "Inquire About Maintenance",
  },
];

