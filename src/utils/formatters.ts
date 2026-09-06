export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatScoreGrade(score: number): { grade: string; color: string; bg: string } {
  if (score >= 90) return { grade: "Optimal (A+)", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
  if (score >= 75) return { grade: "Acceptable (B)", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" };
  if (score >= 60) return { grade: "Sub-Optimal (C)", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
  return { grade: "Critical Friction (D)", color: "text-rose-700", bg: "bg-rose-50 border-rose-200" };
}
