import React, { useState } from "react";
import { FAQS } from "../data/agencyData";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Container, Badge } from "./ui";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 border-t border-[#E5E7EB] relative bg-[#F7F7F5]">
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center mb-3">
            <Badge variant="navy" size="sm" dot>
              Frequently Asked Questions
            </Badge>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
            Straightforward answers before we{" "}
            <span className="text-[#D4A72C]">
              start working together.
            </span>
          </h2>
          <p className="text-[#111827]/75 text-base sm:text-lg mt-3 leading-relaxed">
            Have a question about intellectual property, timelines, multi-industry capabilities, or maintenance? Find it below.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "bg-white border-[#0B1726] shadow-sm ring-1 ring-[#0B1726]"
                    : "bg-white border-[#E5E7EB] hover:border-[#0B1726]/30 shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-bold text-[#0B1726]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "bg-[#0B1726] text-[#D4A72C] rotate-180" : "bg-[#F7F7F5] text-[#111827]/70 border border-[#E5E7EB]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#111827]/80 leading-relaxed border-t border-[#E5E7EB] pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
