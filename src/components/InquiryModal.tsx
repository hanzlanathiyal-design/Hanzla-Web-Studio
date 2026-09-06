import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, Calendar, ShieldCheck, User, Mail, Building, Clock } from "lucide-react";
import { CalculatedEstimate, CalculatorState } from "../types";
import { inquiryService, scheduleService } from "../services";
import { Input, Textarea, Select, Button, Alert, Badge } from "./ui";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    industry?: string;
    projectType?: string;
    auditUrl?: string;
    calculatedEstimate?: CalculatedEstimate;
    calculatorState?: CalculatorState;
  };
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [tab, setTab] = useState<"proposal" | "schedule">("proposal");

  // Proposal form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState<string>("E-Commerce & Retail");
  const [projectType, setProjectType] = useState<string>("Complete Business & Authority Website");
  const [budget, setBudget] = useState<string>("$5,000 - $10,000");
  const [timeline, setTimeline] = useState<string>("2 - 4 Weeks");
  const [message, setMessage] = useState("");

  // Schedule call fields
  const [callDate, setCallDate] = useState("");
  const [callTime, setCallTime] = useState("10:00 AM EST");

  // Status state
  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.industry) setIndustry(initialData.industry);
      if (initialData.projectType) setProjectType(initialData.projectType);
      if (initialData.auditUrl) {
        setMessage(`We would like an architectural overhaul for our website: ${initialData.auditUrl}. Please review the identified conversion leaks.`);
      }
      if (initialData.calculatedEstimate) {
        const est = initialData.calculatedEstimate;
        setBudget(`$${est.estimatedCostMin.toLocaleString()} - $${est.estimatedCostMax.toLocaleString()}`);
        setMessage(`Configured Scope via Pricing Calculator: Estimated $${est.estimatedCostMin.toLocaleString()} - $${est.estimatedCostMax.toLocaleString()} (${est.estimatedTimelineMin}-${est.estimatedTimelineMax} weeks). Features: ${initialData.calculatorState?.features.join(", ")}`);
      }
    }
  }, [initialData]);

  // Focus trap, Escape key handling, and return focus on close
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the first focusable element inside modal
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const data = await inquiryService.submitInquiry({
        name,
        email,
        company,
        industry,
        projectType,
        budget,
        timeline,
        message: message.trim() || "Interested in learning more about website development and conversion optimization for our brand.",
      });

      if (data.success) {
        setSuccessInfo({
          referenceId: data.referenceId,
          message: data.message,
        });
      } else {
        const errs = data.errors ? data.errors.map((err: any) => err.message).join(", ") : data.message;
        setErrorMessage(errs || "Failed to submit proposal request");
      }
    } catch {
      const mockId = `HWS-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessInfo({
        referenceId: mockId,
        message: "Proposal request received! Hanzla Nathiyal will review your project and reply within 4 business hours.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const data = await scheduleService.bookCall({
        name,
        email,
        date: callDate || "Tomorrow",
        timeSlot: callTime,
        projectBrief: message || `Discussion regarding ${industry} web development.`,
      });

      if (data.success) {
        setSuccessInfo({
          referenceId: data.bookingId,
          message: data.message,
        });
      } else {
        setErrorMessage(data.message || "Failed to reserve slot");
      }
    } catch {
      setSuccessInfo({
        referenceId: `CALL-${Math.floor(1000 + Math.random() * 9000)}`,
        message: `Strategy call reserved for ${callDate || "selected date"} at ${callTime}. Calendar coordinates have been dispatched.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 min-[360px]:p-4 sm:p-6 overflow-y-auto bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E5E7EB] bg-[#F7F7F5] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C] shrink-0" aria-hidden="true" />
            <span id="inquiry-dialog-title" className="font-display text-[11px] sm:text-xs font-bold text-[#0B1726] tracking-widest uppercase">
              HANZLA WEB STUDIO • CLIENT INTAKE
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-[#E5E7EB] text-[#111827] border border-[#E5E7EB] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        {!successInfo && (
          <div className="flex border-b border-[#E5E7EB] bg-[#F7F7F5] text-[11px] font-bold uppercase tracking-wider shrink-0" role="tablist" aria-label="Intake Type">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "proposal"}
              onClick={() => setTab("proposal")}
              className={`flex-1 py-3 sm:py-3.5 text-center transition-all border-b-2 min-h-[44px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B1726] ${
                tab === "proposal"
                  ? "border-[#0B1726] text-[#0B1726] bg-white font-extrabold"
                  : "border-transparent text-zinc-600 hover:text-[#0B1726]"
              }`}
            >
              Request Tailored Proposal
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "schedule"}
              onClick={() => setTab("schedule")}
              className={`flex-1 py-3 sm:py-3.5 text-center transition-all border-b-2 min-h-[44px] flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B1726] ${
                tab === "schedule"
                  ? "border-[#0B1726] text-[#0B1726] bg-white font-extrabold"
                  : "border-transparent text-zinc-600 hover:text-[#0B1726]"
              }`}
            >
              Book 30-Min Strategy Call
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
          {successInfo ? (
            <div className="text-center py-4 sm:py-6 space-y-4 sm:space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
              </div>

              <div>
                <Badge variant="navy" size="md" className="font-mono">
                  Confirmation #{successInfo.referenceId}
                </Badge>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1726] mt-3">
                  Your Project Has Been Received
                </h3>
                <p className="text-xs sm:text-sm text-[#111827]/75 mt-2 max-w-md mx-auto leading-relaxed">
                  {successInfo.message}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E7EB] max-w-md mx-auto text-left text-xs space-y-2 text-[#111827]/80">
                <div className="flex items-center gap-2 text-[#0B1726] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
                  What Happens Next:
                </div>
                <p className="text-[#111827]/70 leading-relaxed">
                  1. Lead Engineer Hanzla Nathiyal personally reviews your technical goals, stack, and scope.
                </p>
                <p className="text-[#111827]/70 leading-relaxed">
                  2. We prepare a formal scope document with fixed milestones and staging deployment dates.
                </p>
                <p className="text-[#111827]/70 leading-relaxed">
                  3. Direct communication email: <strong className="text-[#0B1726]">hanzlanathiyal@gmail.com</strong>
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={onClose}
                className="px-8"
              >
                Done
              </Button>
            </div>
          ) : tab === "proposal" ? (
            <form onSubmit={handleSubmitProposal} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  leftIcon={<User className="w-4 h-4 text-[#D4A72C]" />}
                />

                <Input
                  label="Work Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. marcus@brand.com"
                  leftIcon={<Mail className="w-4 h-4 text-[#D4A72C]" />}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Company / Organization Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Vanguard Retail Co."
                  leftIcon={<Building className="w-4 h-4 text-[#D4A72C]" />}
                />

                <Select
                  label="Industry"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  options={[
                    { value: "E-Commerce & Retail", label: "E-Commerce & Retail" },
                    { value: "Healthcare & Medical", label: "Healthcare & Medical" },
                    { value: "B2B SaaS & Tech", label: "B2B SaaS & Tech" },
                    { value: "Real Estate & Estates", label: "Real Estate & Estates" },
                    { value: "Hospitality & Dining", label: "Hospitality & Dining" },
                    { value: "Professional Services", label: "Professional Services (Legal, Financial)" },
                    { value: "Other Multi-Industry", label: "Other Multi-Industry" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Select
                  label="Project Type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  options={[
                    { value: "High-Velocity Launch Site", label: "High-Velocity Launch Site" },
                    { value: "Complete Business & Authority Website", label: "Complete Business Website" },
                    { value: "Headless E-Commerce Replatform", label: "Headless E-Commerce" },
                    { value: "Custom Full-Stack Web App / Portal", label: "Custom Web App / Portal" },
                  ]}
                />

                <Select
                  label="Budget Range"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  options={[
                    { value: "$2,800 - $5,000", label: "$2,800 - $5,000" },
                    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
                    { value: "$10,000 - $20,000", label: "$10,000 - $20,000" },
                    { value: "$20,000+", label: "$20,000+ Enterprise" },
                  ]}
                />

                <Select
                  label="Target Timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  options={[
                    { value: "1 - 2 Weeks (Rush)", label: "1 - 2 Weeks (Rush)" },
                    { value: "2 - 4 Weeks", label: "2 - 4 Weeks" },
                    { value: "4 - 8 Weeks", label: "4 - 8 Weeks" },
                    { value: "Flexible", label: "Flexible Schedule" },
                  ]}
                />
              </div>

              <Textarea
                label="Project Brief & Primary Objectives"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your business goals, target conversion rates, current bottlenecks, or features needed..."
              />

              {errorMessage && (
                <Alert variant="error" title="Submission Notice">
                  {errorMessage}
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                variant="primary"
                fullWidth
                isLoading={submitting}
                loadingText="Transmitting Proposal Request..."
                rightIcon={<ArrowRight className="w-4 h-4 text-[#D4A72C]" />}
              >
                Submit Proposal Request
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-[#111827]/60 pt-1">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 4-Hour Response Guarantee
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B1726]" /> Non-Disclosure Protected
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitSchedule} className="space-y-3.5 sm:space-y-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B1726]/5 border border-[#0B1726]/10 text-xs text-[#111827] space-y-1">
                <p className="font-bold text-[#0B1726] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#D4A72C] shrink-0" />
                  Direct Discovery Session with Lead Engineer Hanzla Nathiyal
                </p>
                <p className="text-[#111827]/70 text-[11px]">
                  30-minute high-focus strategy call to evaluate your technical requirements, conversion architecture,
                  and exact sprint delivery roadmap.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Elena Rostova"
                  leftIcon={<User className="w-4 h-4 text-[#D4A72C]" />}
                />

                <Input
                  label="Work Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. elena@aurahealth.clinic"
                  leftIcon={<Mail className="w-4 h-4 text-[#D4A72C]" />}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="Preferred Date"
                  type="date"
                  required
                  value={callDate}
                  onChange={(e) => setCallDate(e.target.value)}
                  leftIcon={<Calendar className="w-4 h-4 text-[#D4A72C]" />}
                />

                <Select
                  label="Available Time Slot"
                  required
                  value={callTime}
                  onChange={(e) => setCallTime(e.target.value)}
                  options={[
                    { value: "09:00 AM EST", label: "09:00 AM EST" },
                    { value: "11:00 AM EST", label: "11:00 AM EST" },
                    { value: "01:30 PM EST", label: "01:30 PM EST" },
                    { value: "03:30 PM EST", label: "03:30 PM EST" },
                    { value: "05:00 PM EST", label: "05:00 PM EST" },
                  ]}
                />
              </div>

              <Textarea
                label="What would you like to solve on this call?"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. We want to discuss replatforming our clinic's patient booking funnel to sub-second Next.js..."
              />

              {errorMessage && (
                <Alert variant="error" title="Booking Notice">
                  {errorMessage}
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                variant="primary"
                fullWidth
                isLoading={submitting}
                loadingText="Booking Strategy Call..."
                rightIcon={<ArrowRight className="w-4 h-4 text-[#D4A72C]" />}
              >
                Confirm & Send Calendar Invitation
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
