import React from "react";
import { AuditTool } from "../components/AuditTool";
import { AuditResult } from "../types";

interface AuditSectionProps {
  onOpenInquiryWithAudit: (audit: AuditResult) => void;
}

export const AuditSection: React.FC<AuditSectionProps> = ({ onOpenInquiryWithAudit }) => {
  return (
    <section id="audit" aria-label="Website Audit" className="relative scroll-mt-20">
      <AuditTool onOpenInquiryWithAudit={onOpenInquiryWithAudit} />
    </section>
  );
};
