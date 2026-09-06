import { useState } from "react";
import { AuditResult } from "../types";
import { auditService } from "../services";
import { validateAuditUrl } from "../validators";

export function useAudit() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async (url: string, industry: string, primaryGoal?: string) => {
    const validationErrors = validateAuditUrl(url);
    if (validationErrors.length > 0) {
      setError(validationErrors[0].message);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await auditService.runAudit({ url, industry, primaryGoal });
      setResult(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to execute audit");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetAudit = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    result,
    error,
    runAudit,
    resetAudit,
    setResult,
  };
}
