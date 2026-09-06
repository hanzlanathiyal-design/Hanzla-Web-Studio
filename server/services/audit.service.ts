import { db } from "../db";
import { AuditRequestInput } from "../validators";
import { AuditEntity } from "../db/schema";

export class AuditService {
  public async generateAudit(input: AuditRequestInput): Promise<AuditEntity> {
    let cleanUrl = input.url.trim().toLowerCase();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    // Deterministic heuristic calculation based on domain hash
    const hash = cleanUrl.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const perfScore = 60 + (hash % 32); // 60 - 91
    const uxScore = 58 + ((hash * 3) % 35);
    const seoScore = 65 + ((hash * 7) % 30);
    const convScore = 55 + ((hash * 11) % 38);
    const overall = Math.round((perfScore + uxScore + seoScore + convScore) / 4);

    const findingsByIndustry: Record<string, string[]> = {
      "E-Commerce": [
        "Product page First Contentful Paint (FCP) delays can increase cart abandonment by up to 24%.",
        "Missing 1-click checkout options (Apple Pay / Google Pay) causing mobile friction.",
        "Images lack next-gen WebP/AVIF compression, leading to >3.4MB payload on catalog views.",
        "Unoptimized Shopify/WooCommerce apps creating render-blocking JavaScript waterfalls.",
      ],
      Healthcare: [
        "Missing instant online intake & HIPAA-compliant self-scheduling causes lost prospective patients.",
        "Mobile viewport readability score below 78% on clinical service breakdown pages.",
        "Lack of high-trust physician credential badges above the mobile fold.",
        "Patient testimonial structure lacks Schema.org LocalBusiness & MedicalBusiness metadata.",
      ],
      "B2B & SaaS": [
        "Call-to-Action ('Book Demo') buried below 900px on typical laptop viewport heights.",
        "Zero interactive ROI calculator or feature playground for enterprise buyers.",
        "Page load speed >2.8s reduces ad spend ROAS on Google Search & LinkedIn campaigns.",
        "Pricing tier comparison lacks clear feature tooltips and enterprise custom tier anchoring.",
      ],
      "Real Estate": [
        "Property imagery load times average 4.2 seconds on 4G cellular connections.",
        "Lack of interactive neighborhood filter or instant mortgage/schedule tour widget.",
        "Lead capture modal is intrusive rather than contextualized per listing.",
      ],
    };

    const defaultFindings = [
      "Page load speed exceeds modern Google Core Web Vitals thresholds (LCP > 2.5s).",
      "Mobile touch targets are cramped (<48px), degrading tap accuracy on handheld devices.",
      "Hero section lacks clear primary value proposition and immediate friction-free CTA.",
      "Unbundled legacy JavaScript libraries delaying browser main thread execution.",
    ];

    const keyFindings = findingsByIndustry[input.industry] || defaultFindings;

    const recommendedStack =
      input.industry === "E-Commerce"
        ? ["Next.js 15", "Shopify Storefront API", "Tailwind CSS", "Stripe Checkout", "Cloudflare CDN"]
        : input.industry === "Healthcare"
        ? ["React + Vite", "Node.js Microservices", "Tailwind CSS", "HIPAA-grade Encryption", "Supabase Auth"]
        : input.industry === "B2B & SaaS"
        ? ["Next.js App Router", "Tailwind CSS", "Framer Motion", "Stripe Billing", "PostgreSQL"]
        : ["React / Next.js", "Tailwind CSS", "Vite", "Headless CMS (Sanity)", "Vercel Edge Network"];

    const estimatedRevenueUplift =
      overall < 70
        ? "+35% to +65% in Qualified Leads"
        : overall < 85
        ? "+20% to +40% in Conversions"
        : "+12% to +25% Performance Boost";

    return await db.addAudit({
      url: cleanUrl,
      industry: input.industry,
      score: {
        overall,
        performance: perfScore,
        seo: seoScore,
        ux: uxScore,
        conversion: convScore,
      },
      keyFindings,
      recommendedStack,
      estimatedRevenueUplift,
    });
  }
}

export const auditService = new AuditService();
