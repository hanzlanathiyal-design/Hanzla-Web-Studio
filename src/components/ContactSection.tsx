import React, { useState, useRef } from "react";
import {
  Mail,
  Clock,
  ShieldCheck,
  ChevronDown,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Building,
  Sparkles,
  ArrowRight,
  RefreshCw,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Container, Badge, Button, Input, Select, Textarea, Card } from "./ui";
import { FAQS } from "../data/agencyData";
import { inquiryService } from "../services";
import { scrollToElement } from "../utils";

interface ContactSectionProps {
  onOpenInquiry?: (data?: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry }) => {
  // Form Field States
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState("");
  const [businessType, setBusinessType] = useState("Professional & Legal Services");
  const [projectType, setProjectType] = useState("Business Websites");
  const [budgetRange, setBudgetRange] = useState("Flexible / Need Advice");
  const [message, setMessage] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState<{
    name?: string;
    businessName?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "failure">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    businessName: string;
    email: string;
    projectType: string;
    referenceId?: string;
  } | null>(null);

  // Concept mode highlight badge
  const [isConceptMode, setIsConceptMode] = useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const businessNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Handle CTA button clicks
  const handleStartProjectCTA = () => {
    setIsConceptMode(false);
    if (projectType === "Free Website Concept") {
      setProjectType("Business Websites");
    }
    scrollToElement("contact-form-card");
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 400);
  };

  const handleGetConceptCTA = () => {
    setIsConceptMode(true);
    setProjectType("Free Website Concept");
    if (!message) {
      setMessage("I would like to request a free custom website concept for our business. Here are our main goals and target audience:");
    }
    scrollToElement("contact-form-card");
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 400);
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: {
      name?: string;
      businessName?: string;
      email?: string;
      message?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Valid email is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@company.com).";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!name.trim()) {
        nameInputRef.current?.focus();
      } else if (!businessName.trim()) {
        businessNameInputRef.current?.focus();
      } else if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        emailInputRef.current?.focus();
      } else if (!message.trim()) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await inquiryService.submitInquiry({
        name: name.trim(),
        businessName: businessName.trim(),
        company: businessName.trim(),
        email: email.trim(),
        phone: phoneOrWhatsApp.trim() || undefined,
        phoneOrWhatsApp: phoneOrWhatsApp.trim() || undefined,
        businessType,
        industry: businessType,
        projectType,
        budgetRange,
        budget: budgetRange,
        message: message.trim(),
      });

      if (response && response.success) {
        setSubmittedSummary({
          name: name.trim(),
          businessName: businessName.trim(),
          email: email.trim(),
          projectType,
          referenceId: response.referenceId,
        });
        setStatus("success");
      } else {
        throw new Error(response?.message || "Failed to submit inquiry.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(
        err?.message || "Unable to send your request right now. Please try again or reach out directly at hanzlanathiyal@gmail.com."
      );
      setStatus("failure");
    }
  };

  const handleResetForm = () => {
    setName("");
    setBusinessName("");
    setEmail("");
    setPhoneOrWhatsApp("");
    setMessage("");
    setErrors({});
    setStatus("idle");
    setIsConceptMode(false);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="xl">
        {/* ============================================================ */}
        {/* 1. STRONG CTA BANNER: "Your Business Deserves a Better Website." */}
        {/* ============================================================ */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0B1726] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden mb-20 border border-[#0B1726]/10">
          {/* Subtle geometric background accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4A72C]/10 via-[#D4A72C]/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#D4A72C] text-xs font-mono font-bold mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
              <span>Direct Studio Engagement</span>
            </div>

            {/* Headline requested by user */}
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-[#F7F7F5] tracking-tight leading-[1.1] mb-5">
              Your Business Deserves a{" "}
              <span className="text-[#D4A72C]">
                Better Website.
              </span>
            </h2>

            {/* Supporting text requested by user */}
            <p className="text-[#E5E7EB]/85 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-8">
              Let's build something that represents your business professionally.
            </p>

            {/* Action buttons: "Start a Project" and "Get a Free Website Concept" */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartProjectCTA}
                className="w-full sm:w-auto bg-[#D4A72C] hover:bg-[#B88D22] text-[#0B1726] font-extrabold px-8 py-4 shadow-lg text-base"
                rightIcon={<ArrowRight className="w-4 h-4 text-[#0B1726]" />}
              >
                Start a Project
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleGetConceptCTA}
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-7 py-4 text-base"
                leftIcon={<Sparkles className="w-4 h-4 text-[#D4A72C]" />}
              >
                Get a Free Website Concept
              </Button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Get In Touch
            </Badge>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
            Tell Us About Your Project
          </h3>
          <p className="text-[#111827]/75 text-sm sm:text-base mt-2 leading-relaxed">
            Fill in your details below. You will receive a direct technical review and roadmap within 4 business hours.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. PROFESSIONAL CONTACT FORM & STUDIO CONTACT INFORMATION */}
        {/* ============================================================ */}
        <div
          id="contact-form-card"
          ref={formRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto"
        >
          {/* Left Column: Form with Validation, Loading, Success, Failure states */}
          <Card
            variant="elevated"
            padding="lg"
            className="lg:col-span-7 bg-white border-[#E5E7EB] rounded-3xl shadow-sm p-6 sm:p-10"
          >
            {/* Concept Mode Banner */}
            {isConceptMode && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-amber-950 block">
                      Free Website Concept Mode Active
                    </span>
                    <p className="text-xs text-amber-900/80 mt-0.5">
                      We will prepare an architectural layout concept tailored to your brand without any upfront obligation.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConceptMode(false)}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline shrink-0"
                >
                  Standard Mode
                </button>
              </div>
            )}

            {/* SUCCESS STATE */}
            {status === "success" && submittedSummary && (
              <div className="py-10 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs animate-in zoom-in-90 duration-300">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h4 className="font-display text-2xl font-black text-[#0B1726]">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-[#111827]/75 max-w-md mx-auto leading-relaxed mt-2">
                    Thank you, <strong className="text-[#0B1726]">{submittedSummary.name}</strong> from{" "}
                    <strong className="text-[#0B1726]">{submittedSummary.businessName}</strong>.
                    Your request regarding <strong>{submittedSummary.projectType}</strong> has been logged.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]/60">
                    <span className="text-[#111827]/60">Contact Email:</span>
                    <span className="font-bold text-[#0B1726]">{submittedSummary.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E5E7EB]/60">
                    <span className="text-[#111827]/60">Project Type:</span>
                    <span className="font-bold text-[#0B1726]">{submittedSummary.projectType}</span>
                  </div>
                  {submittedSummary.referenceId && (
                    <div className="flex justify-between py-1">
                      <span className="text-[#111827]/60">Reference ID:</span>
                      <span className="font-mono font-bold text-[#D4A72C]">{submittedSummary.referenceId}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Lead engineer Hanzla Nathiyal will reply within 4 business hours.</span>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetForm}
                    className="font-semibold text-xs"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              </div>
            )}

            {/* FAILURE STATE ALERT */}
            {status === "failure" && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 flex items-start gap-3 text-xs">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block text-sm">Submission Error</span>
                  <p className="mt-1 leading-relaxed">{errorMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-xs font-bold text-red-800 underline hover:text-red-950"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* ACTIVE FORM */}
            {status !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <h4 className="font-display text-lg font-bold text-[#0B1726]">
                    Project Inquiry Details
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Accepting New Projects
                  </span>
                </div>

                {/* Name & Business Name (Both Required) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      ref={nameInputRef}
                      label="Name"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      error={errors.name}
                      disabled={status === "loading"}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                    />
                  </div>

                  <div>
                    <Input
                      ref={businessNameInputRef}
                      label="Business Name"
                      required
                      placeholder="e.g. Apex Legal or Bellini Bistro"
                      value={businessName}
                      error={errors.businessName}
                      disabled={status === "loading"}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                        if (errors.businessName) setErrors({ ...errors, businessName: undefined });
                      }}
                    />
                  </div>
                </div>

                {/* Email (Required) & Phone / WhatsApp (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      ref={emailInputRef}
                      label="Email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      error={errors.email}
                      disabled={status === "loading"}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                    />
                  </div>

                  <div>
                    <Input
                      label="Phone / WhatsApp (optional)"
                      type="tel"
                      placeholder="e.g. +92 300 1234567"
                      value={phoneOrWhatsApp}
                      disabled={status === "loading"}
                      onChange={(e) => setPhoneOrWhatsApp(e.target.value)}
                    />
                  </div>
                </div>

                {/* Business Type & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Business Type"
                    value={businessType}
                    disabled={status === "loading"}
                    onChange={(e) => setBusinessType(e.target.value)}
                    options={[
                      { value: "Professional & Legal Services", label: "Professional & Legal Services" },
                      { value: "Restaurant & Hospitality", label: "Restaurant & Hospitality" },
                      { value: "Real Estate & Architecture", label: "Real Estate & Architecture" },
                      { value: "E-Commerce & Retail", label: "E-Commerce & Retail" },
                      { value: "Healthcare & Medical", label: "Healthcare & Medical" },
                      { value: "B2B SaaS & Tech", label: "B2B SaaS & Tech" },
                      { value: "Fitness & Wellness", label: "Fitness & Wellness" },
                      { value: "Other Business", label: "Other Business" },
                    ]}
                  />

                  <Select
                    label="Project Type"
                    value={projectType}
                    disabled={status === "loading"}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                      if (e.target.value === "Free Website Concept") {
                        setIsConceptMode(true);
                      } else {
                        setIsConceptMode(false);
                      }
                    }}
                    options={[
                      { value: "Business Websites", label: "Business Websites" },
                      { value: "Website Design", label: "Website Design" },
                      { value: "Website Development", label: "Website Development" },
                      { value: "Responsive Web Design", label: "Responsive Web Design" },
                      { value: "Landing Pages", label: "Landing Pages" },
                      { value: "E-commerce Development", label: "E-commerce Development" },
                      { value: "Website Redesign", label: "Website Redesign" },
                      { value: "Performance Optimization", label: "Performance Optimization" },
                      { value: "Website Maintenance", label: "Website Maintenance" },
                      { value: "Free Website Concept", label: "✨ Free Website Concept" },
                    ]}
                  />
                </div>

                {/* Budget Range (optional) */}
                <Select
                  label="Budget Range (optional)"
                  value={budgetRange}
                  disabled={status === "loading"}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  options={[
                    { value: "Flexible / Need Advice", label: "Flexible / Need Advice" },
                    { value: "Under $2,500", label: "Under $2,500" },
                    { value: "$2,500 - $5,000", label: "$2,500 - $5,000" },
                    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
                    { value: "$10,000+", label: "$10,000+" },
                  ]}
                />

                {/* Message (Required) */}
                <div>
                  <Textarea
                    ref={messageInputRef}
                    label="Message"
                    required
                    rows={4}
                    placeholder="Tell us about your business, current website challenges, timeline goals, and must-have features..."
                    value={message}
                    error={errors.message}
                    disabled={status === "loading"}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                  />
                </div>

                {/* Submit Button & Status Handling */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full justify-center text-sm font-bold bg-[#D4A72C] hover:bg-[#B88D22] text-[#0B1726] shadow-sm py-3.5"
                    rightIcon={
                      status === "loading" ? (
                        <RefreshCw className="w-4 h-4 text-[#0B1726] animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 text-[#0B1726]" />
                      )
                    }
                  >
                    {status === "loading"
                      ? "Submitting Your Inquiry..."
                      : projectType === "Free Website Concept"
                      ? "Request Free Website Concept"
                      : "Start a Project — Submit Inquiry"}
                  </Button>
                </div>

                {/* Trust and Privacy Guarantee */}
                <div className="flex items-center justify-between text-[11px] text-[#111827]/60 pt-2 border-t border-[#E5E7EB]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Strict confidentiality & NDA guaranteed
                  </span>
                  <span>No spam • Direct founder response</span>
                </div>
              </form>
            )}
          </Card>

          {/* Right Column: Direct Studio Contact Info & FAQs */}
          <div className="lg:col-span-5 space-y-6">
            {/* ============================================================ */}
            {/* 3. STUDIO CONTACT DETAILS (Requested by user) */}
            {/* ============================================================ */}
            <Card
              variant="default"
              padding="lg"
              className="bg-white border-[#E5E7EB] rounded-3xl p-7 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
                <div className="w-12 h-12 rounded-2xl bg-[#0B1726] text-[#D4A72C] flex items-center justify-center font-display font-black text-base shadow-xs">
                  HW
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-[#0B1726]">
                    Hanzla Web Studio
                  </h4>
                  <p className="text-xs text-[#111827]/60">
                    Modern Web Development Studio
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Name */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B1726]/5 text-[#0B1726] flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#111827]/60 uppercase tracking-wider block">
                      Name
                    </span>
                    <span className="font-bold text-[#0B1726]">
                      Hanzla Web Studio
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B1726]/5 text-[#D4A72C] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#111827]/60 uppercase tracking-wider block">
                      Email
                    </span>
                    <a
                      href="mailto:hanzlanathiyal@gmail.com"
                      className="font-bold text-[#0B1726] hover:text-[#D4A72C] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726]"
                    >
                      hanzlanathiyal@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">
                      WhatsApp
                    </span>
                    <a
                      href="https://wa.me/923001234567?text=Hi%20Hanzla%2C%20I%20would%20like%20to%20discuss%20a%20website%20project%20for%20my%20business."
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp at +92 300 1234567 (opens in a new tab)"
                      className="font-bold text-[#0B1726] hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726]"
                    >
                      <span>+92 300 1234567</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                        Chat on WhatsApp
                      </span>
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B1726]/5 text-[#0B1726] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="font-semibold text-[#0B1726]">
                      Pakistan / Serving clients worldwide
                    </span>
                  </div>
                </div>

                {/* SLA */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B1726]/5 text-[#D4A72C] flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">
                      Response SLA
                    </span>
                    <span className="font-semibold text-emerald-800">
                      Within 4 business hours
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-semibold text-[#0B1726]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>100% Client Code & Asset Handover Guaranteed</span>
              </div>
            </Card>

            {/* Essential FAQs Accordion */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 block px-1">
                Frequently Answered Questions:
              </span>
              {FAQS.slice(0, 4).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "bg-white border-[#0B1726] shadow-2xs"
                        : "bg-white border-[#E5E7EB] hover:border-[#0B1726]/30"
                    }`}
                  >
                    <button
                      type="button"
                      id={`faq-btn-${idx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] rounded-2xl"
                    >
                      <span className="text-xs font-bold text-[#0B1726]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#0B1726] shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#D4A72C]" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        className="px-4 pb-4 pt-1 text-xs text-zinc-700 leading-relaxed border-t border-[#E5E7EB]/50"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
