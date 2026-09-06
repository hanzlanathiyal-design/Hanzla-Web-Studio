import { ProjectDetail } from "../types/api.types";

/**
 * Static portfolio showcase data.
 * Does NOT hit any database table, keeping architecture simple and maintainable.
 */
export const STATIC_PROJECTS: ProjectDetail[] = [
  {
    slug: "bonavia",
    title: "Bonavia Dining Concept",
    clientName: "Bonavia Artisanal Italian",
    industry: "Hospitality & Dining",
    projectType: "Restaurant Website",
    badge: "Concept Project",
    tagline: "Refined culinary web platform with interactive seasonal menus & online table reservations",
    shortDescription:
      "A mobile-first restaurant web experience designed for an artisanal Italian dining room. Features interactive seasonal menus with dietary allergen filters, frictionless table reservation intake, and private dining event workflows.",
    challenge:
      "Traditional restaurant websites often rely on unreadable zoom-and-pinch PDF menus on mobile, clunky multi-step reservation redirects, and generic template styling that fails to evoke the culinary ambiance of the physical dining room.",
    solution:
      "Engineered an elegant, sub-second digital storefront with high-definition dish presentation, live-filtered digital menus, seamless date/party size table booking inquiry flow, and Google-friendly schema markup for local search discovery.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    desktopMockupUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    mobileMockupUrl:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop&q=80",
    features: [
      "Mobile-first interactive seasonal menu with dietary allergen badges (Gluten-Free, Vegan, Chef's Special)",
      "Integrated table reservation request workflow with instant date, time, and party selector",
      "Private dining & event hosting inquiry portal with group dining specifications",
      "Interactive Google Maps directions, transit guidance, and real-time open/closed status",
      "Semantic HTML5 hierarchy and Schema.org Restaurant structured data for local search discoverability",
    ],
    year: "2025",
  },
  {
    slug: "luchsheye",
    title: "Luchsheye Properties",
    clientName: "Luchsheye Properties Concept",
    industry: "Real Estate & Estates",
    projectType: "Real Estate Website",
    badge: "Concept Project",
    tagline: "Editorial luxury real estate showcase for architectural residences & developments",
    shortDescription:
      "A modern, high-end residential real estate concept designed to showcase premium architectural properties. Features high-resolution listing galleries, interactive floor plans, neighborhood lifestyle guides, and a private viewing appointment scheduler.",
    challenge:
      "Luxury properties require an editorial visual hierarchy and deep immersion to convey exclusivity, yet typical real estate themes clutter screens with generic MLS badges, sluggish plugins, and confusing contact forms.",
    solution:
      "Crafted an editorial-grade digital showroom focusing on architectural photography, interactive unit specifications, downloadable property dossiers, and an integrated private broker viewing scheduler.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Mapbox UI", "Vite"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    desktopMockupUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    mobileMockupUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80",
    features: [
      "Editorial property listing gallery with high-resolution visual showcase and fullscreen zoom",
      "Interactive floor plan views with unit dimensions, materials, and architectural specs",
      "Curated neighborhood lifestyle guide with nearby dining, schools, parks, and transit points",
      "Confidential private viewing scheduler with automated calendar intake workflow",
      "Fast, responsive layout engineered for prospective buyers browsing on mobile and tablet devices",
    ],
    year: "2025",
  },
];
