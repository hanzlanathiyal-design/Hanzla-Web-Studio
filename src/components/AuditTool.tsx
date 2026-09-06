import React, { useState } from "react";
import { Sparkles, ArrowRight, AlertTriangle, Layers, Globe } from "lucide-react";
import { AuditResult } from "../types";
import { useAudit } from "../hooks";
import {
  Container,
  Button,
  Input,
  Select,
  Alert,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui";

interface AuditToolProps {
  onOpenInquiryWithAudit: (audit: AuditResult) => void;
}

export const AuditTool: React.FC<AuditToolProps> = ({ onOpenInquiryWithAudit }) => {
  const [url, setUrl] = useState("");
  const [industry, setIndustry] = useState<string>("E-Commerce & Retail");
  const [primaryGoal, setPrimaryGoal] = useState<string>("Increase Conversions & Sales");
  const { loading, result, error, runAudit } = useAudit();

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runAudit(url, industry, primaryGoal);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-700 border-emerald-300 bg-emerald-50";
    if (score >= 70) return "text-amber-700 border-amber-300 bg-amber-50";
    return "text-rose-700 border-rose-300 bg-rose-50";
  };

  return (
    <section id="audit" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <Badge variant="navy" size="sm" dot className="mb-3">
            Studio Diagnostic Engine
          </Badge>
          <h2 className="font-display text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Discover where your current website is{" "}
            <span className="text-[#D4A72C]">
              losing clients.
            </span>
          </h2>
          <p className="text-[#111827]/75 text-xs sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Enter your domain for an instant 60-second diagnostic evaluating Core Web Vitals, conversion architecture,
            mobile responsiveness, and industry benchmark gaps.
          </p>
        </div>

        {/* Input Form Card */}
        <Card variant="elevated" className="max-w-3xl mx-auto p-4 sm:p-8 md:p-10 border-[#E5E7EB] bg-white">
          <form onSubmit={handleRunAudit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="sm:col-span-3">
                <Input
                  label="Your Website URL or Company Domain"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. yourcompany.com or https://brand.com"
                  leftIcon={<Globe className="w-4 h-4 text-[#D4A72C]" />}
                  helperText="Enter any live site or prototype for instant headless & speed benchmark analysis"
                />
              </div>

              <div>
                <Select
                  label="Your Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  options={[
                    { value: "B2B SaaS & Tech", label: "B2B SaaS & Tech" },
                    { value: "E-Commerce & Retail", label: "E-Commerce & Retail" },
                    { value: "Professional Services", label: "Professional Services" },
                    { value: "Healthcare & Medical", label: "Healthcare & Medical" },
                    { value: "Real Estate & Estates", label: "Real Estate & Estates" },
                    { value: "Hospitality & Dining", label: "Hospitality & Dining" },
                    { value: "General Business", label: "Other Multi-Industry" },
                  ]}
                />
              </div>

              <div className="sm:col-span-2">
                <Select
                  label="Primary Growth Objective"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  options={[
                    { value: "Increase Conversions & Sales", label: "Increase Conversions & Sales Rate" },
                    { value: "Fix Slow Page Speed & Mobile Lag", label: "Fix Slow Page Speed & Core Web Vitals" },
                    { value: "Elevate Brand Prestige & Trust", label: "Elevate Brand Prestige for High Tickets" },
                    { value: "Replace Clunky Third-Party Apps", label: "Eliminate Monthly Plugin/App Bloat" },
                  ]}
                />
              </div>
            </div>

            {error && (
              <Alert variant="error" title="Diagnostic Notice">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              variant="primary"
              fullWidth
              isLoading={loading}
              loadingText="Analyzing Core Web Vitals & Conversion Funnel..."
              leftIcon={<Sparkles className="w-4 h-4 text-[#D4A72C]" />}
              rightIcon={<ArrowRight className="w-4 h-4 text-[#D4A72C]" />}
            >
              Generate Free 60-Second Conversion Audit
            </Button>
          </form>

          {/* Audit Results View */}
          {result && (
            <div
              role="region"
              aria-label="Audit Analysis Results"
              aria-live="polite"
              className="mt-8 pt-8 border-t border-[#E5E7EB] space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F7F7F5] p-4 sm:p-5 rounded-2xl border border-[#E5E7EB]">
                <div className="min-w-0">
                  <span className="text-xs text-zinc-600 font-mono block">Report #{result.id}</span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#0B1726] truncate">
                    Audit Analysis for: {result.url}
                  </h3>
                  <p className="text-xs text-zinc-600">{result.industry} Benchmark Matrix</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 block">Overall Grade</span>
                    <span className="text-xs font-bold text-emerald-800">Uplift: {result.estimatedRevenueUplift}</span>
                  </div>
                  <div
                    className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl border-2 flex items-center justify-center font-display font-black text-xl sm:text-2xl shadow-xs ${getScoreColor(
                      result.score.overall
                    )}`}
                    aria-label={`Overall score ${result.score.overall} out of 100`}
                  >
                    {result.score.overall}
                  </div>
                </div>
              </div>

              {/* 4 Diagnostic Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E5E7EB] text-center">
                  <span className="text-xs text-zinc-700 font-medium block">Speed & Vitals</span>
                  <span className={`font-display text-xl sm:text-2xl font-bold mt-1 inline-block ${getScoreColor(result.score.performance).split(" ")[0]}`}>
                    {result.score.performance}/100
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E5E7EB] text-center">
                  <span className="text-xs text-zinc-700 font-medium block">Conversion UX</span>
                  <span className={`font-display text-xl sm:text-2xl font-bold mt-1 inline-block ${getScoreColor(result.score.conversion).split(" ")[0]}`}>
                    {result.score.conversion}/100
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E5E7EB] text-center">
                  <span className="text-xs text-zinc-700 font-medium block">Mobile Readiness</span>
                  <span className={`font-display text-xl sm:text-2xl font-bold mt-1 inline-block ${getScoreColor(result.score.ux).split(" ")[0]}`}>
                    {result.score.ux}/100
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7F7F5] border border-[#E5E7EB] text-center">
                  <span className="text-xs text-zinc-700 font-medium block">SEO & Schema</span>
                  <span className={`font-display text-xl sm:text-2xl font-bold mt-1 inline-block ${getScoreColor(result.score.seo).split(" ")[0]}`}>
                    {result.score.seo}/100
                  </span>
                </div>
              </div>

              {/* Actionable Findings */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-rose-700 flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Identified Conversion & Architectural Leaks:
                </h4>
                <div className="space-y-1.5">
                  {result.keyFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-800">
                      <span className="text-rose-600 font-bold shrink-0" aria-hidden="true">•</span>
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Stack */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0B1726]/5 border border-[#0B1726]/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1726] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" aria-hidden="true" />
                    Recommended Modern Architecture:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {result.recommendedStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-md bg-white text-[#0B1726] border border-[#E5E7EB] text-[11px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  size="md"
                  variant="primary"
                  onClick={() => onOpenInquiryWithAudit(result)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />}
                  className="w-full sm:w-auto"
                >
                  Fix Leaks with Studio
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Container>
    </section>
  );
};
