import React, { useState, useEffect, Suspense, lazy } from "react";
import { MainLayout } from "./layouts";
import { HomePage } from "./pages";
import { scrollToElement } from "./utils";

// Code splitting: Lazy-load modal overlays to drastically reduce initial bundle size
const InquiryModal = lazy(() =>
  import("./components/InquiryModal").then((mod) => ({ default: mod.InquiryModal }))
);
const DesignSystemModal = lazy(() =>
  import("./components/DesignSystemModal").then((mod) => ({ default: mod.DesignSystemModal }))
);
const AdminPortalModal = lazy(() =>
  import("./components/admin").then((mod) => ({ default: mod.AdminPortalModal }))
);

export default function App() {
  const [isGeneralInquiryOpen, setIsGeneralInquiryOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Support direct hash navigation (/#admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#admin") {
        setIsAdminOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === "#admin") {
      history.replaceState(null, "", " ");
    }
  };

  return (
    <MainLayout
      onOpenInquiry={() => setIsGeneralInquiryOpen(true)}
      onOpenAudit={() => scrollToElement("what-i-build")}
      onOpenCalculator={() => scrollToElement("services")}
      onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      onOpenAdmin={() => setIsAdminOpen(true)}
    >
      <HomePage />

      <Suspense fallback={null}>
        {isGeneralInquiryOpen && (
          <InquiryModal
            isOpen={isGeneralInquiryOpen}
            onClose={() => setIsGeneralInquiryOpen(false)}
          />
        )}

        {isDesignSystemOpen && (
          <DesignSystemModal
            isOpen={isDesignSystemOpen}
            onClose={() => setIsDesignSystemOpen(false)}
          />
        )}

        {isAdminOpen && (
          <AdminPortalModal
            isOpen={isAdminOpen}
            onClose={handleCloseAdmin}
          />
        )}
      </Suspense>
    </MainLayout>
  );
}

