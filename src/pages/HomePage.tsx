import React, { useState, Suspense, lazy } from "react";
import {
  HeroSection,
  CoreStandardsSection,
  WhatIBuildSection,
  PortfolioSection,
  ClientPortalPreview,
  WhyHanzlaStudio,
  ProcessSection,
  ServicesSection,
  StrongCTASection,
  ContactSection,
} from "../sections";
import {
  IndustryType,
  IndustryCaseStudy,
  ServicePackage,
  CalculatedEstimate,
  CalculatorState,
  DedicatedService,
} from "../types";
import { scrollToElement } from "../utils";

// Code splitting: Lazy-load modal to keep initial route bundle minimal
const InquiryModal = lazy(() =>
  import("../components/InquiryModal").then((mod) => ({ default: mod.InquiryModal }))
);

interface HomePageProps {
  onOpenInquiry?: () => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>("All");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryInitialData, setInquiryInitialData] = useState<{
    industry?: string;
    projectType?: string;
    calculatedEstimate?: CalculatedEstimate;
    calculatorState?: CalculatorState;
  } | undefined>(undefined);

  // Contextual triggers for modal
  const handleOpenGeneralInquiry = () => {
    setInquiryInitialData(undefined);
    setIsInquiryModalOpen(true);
  };

  const handleOpenInquiryForStudy = (study?: IndustryCaseStudy) => {
    if (study) {
      setInquiryInitialData({
        industry: study.industry,
        projectType: `${study.title} — ${study.projectType}`,
      });
    } else {
      setInquiryInitialData(undefined);
    }
    setIsInquiryModalOpen(true);
  };

  const handleLockInEstimate = (estimate: CalculatedEstimate, state: CalculatorState) => {
    setInquiryInitialData({
      industry: state.industry,
      projectType:
        state.projectType === "ecommerce_store"
          ? "Headless E-Commerce Store"
          : state.projectType === "custom_webapp"
          ? "Custom Web Application"
          : "Business & Company Website",
      calculatedEstimate: estimate,
      calculatorState: state,
    });
    setIsInquiryModalOpen(true);
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setInquiryInitialData({
      projectType: pkg.title,
    });
    setIsInquiryModalOpen(true);
  };

  const handleSelectDedicatedService = (service: DedicatedService) => {
    setInquiryInitialData({
      projectType: `${service.title} Service`,
    });
    setIsInquiryModalOpen(true);
  };

  const handleSelectBuildType = (card: { title: string; industryTag: string; matchingFilter?: IndustryType }) => {
    setInquiryInitialData({
      projectType: `${card.title} Project`,
      industry: card.matchingFilter || "All",
    });
    setIsInquiryModalOpen(true);
  };

  const handleFilterPortfolioFromBuildType = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    scrollToElement("work");
  };

  return (
    <>
      {/* 1. HERO */}
      <HeroSection
        onSelectIndustry={(ind) => setSelectedIndustry(ind)}
        onOpenInquiry={handleOpenGeneralInquiry}
        onOpenCalculator={() => scrollToElement("services")}
        onOpenAudit={() => scrollToElement("what-i-build")}
      />
      <CoreStandardsSection />

      {/* 2. What We Build */}
      <WhatIBuildSection
        onSelectBuildType={handleSelectBuildType}
        onFilterPortfolio={handleFilterPortfolioFromBuildType}
      />

      {/* 3. Selected Work */}
      <PortfolioSection
        selectedIndustry={selectedIndustry}
        onSelectIndustry={(ind) => setSelectedIndustry(ind)}
        onRequestProposal={handleOpenInquiryForStudy}
      />

      {/* 4. See What Your Business Could Look Like */}
      <ClientPortalPreview />

      {/* 5. Why Hanzla Web Studio */}
      <WhyHanzlaStudio onOpenInquiry={handleOpenGeneralInquiry} />

      {/* 6. Process */}
      <ProcessSection onStartProject={handleOpenGeneralInquiry} />

      {/* 7. Services & Pricing Scope Estimator */}
      <ServicesSection
        onSelectPackage={handleSelectPackage}
        onLockInEstimate={handleLockInEstimate}
        onSelectDedicatedService={handleSelectDedicatedService}
      />

      {/* 8. Strong CTA */}
      <StrongCTASection
        onOpenInquiry={handleOpenGeneralInquiry}
        onOpenConcept={handleOpenGeneralInquiry}
      />

      {/* 9. Contact */}
      <ContactSection onOpenInquiry={handleOpenGeneralInquiry} />

      {/* Client Intake & Strategy Consultation Modal (Code-split) */}
      <Suspense fallback={null}>
        {isInquiryModalOpen && (
          <InquiryModal
            isOpen={isInquiryModalOpen}
            onClose={() => setIsInquiryModalOpen(false)}
            initialData={inquiryInitialData}
          />
        )}
      </Suspense>
    </>
  );
};
