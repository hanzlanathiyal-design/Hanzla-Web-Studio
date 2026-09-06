/**
 * Global Design System Tokens & Constants
 * High-performance, accessible tokens for Hanzla Web Studio.
 *
 * Core Palette:
 * - Deep Navy: #0B1726
 * - Gold: #D4A72C
 * - Off White: #F7F7F5
 * - Dark Text: #111827
 * - Soft Gray: #E5E7EB
 */

export const colorTokens = {
  // Brand Core Palette
  primary: {
    deepNavy: "#0B1726",
    gold: "#D4A72C",
    goldHover: "#C49622",
    goldSubtle: "rgba(212, 167, 44, 0.12)",
    offWhite: "#F7F7F5",
    darkText: "#111827",
    softGray: "#E5E7EB",
  },
  // Neutrals derived from core brand
  neutral: {
    50: "#F7F7F5",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#0B1726",
  },
  // Semantic Accessibility States (Error, Success, Warning)
  semantic: {
    success: {
      text: "#065F46",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      dot: "#10B981",
    },
    warning: {
      text: "#92400E",
      bg: "#FFFBEB",
      border: "#FDE68A",
      dot: "#F59E0B",
    },
    error: {
      text: "#991B1B",
      bg: "#FEF2F2",
      border: "#FECACA",
      dot: "#EF4444",
    },
  },
  // Surfaces
  surface: {
    canvas: "#F7F7F5",
    card: "#FFFFFF",
    cardElevated: "#FFFFFF",
    cardSubtle: "#F3F4F6",
    navyCard: "#0B1726",
    border: "#E5E7EB",
    borderHover: "#D1D5DB",
    borderFocus: "#0B1726",
  },
} as const;

export const typographyTokens = {
  fontFamilies: {
    display: "'Manrope', 'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  scale: {
    xs: { fontSize: "0.75rem", lineHeight: "1rem" }, // 12px
    sm: { fontSize: "0.875rem", lineHeight: "1.25rem" }, // 14px
    base: { fontSize: "1rem", lineHeight: "1.5rem" }, // 16px
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" }, // 18px
    xl: { fontSize: "1.25rem", lineHeight: "1.75rem" }, // 20px
    "2xl": { fontSize: "1.5rem", lineHeight: "2rem" }, // 24px
    "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" }, // 30px
    "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" }, // 36px
    "5xl": { fontSize: "3rem", lineHeight: "1.15" }, // 48px
    "6xl": { fontSize: "3.75rem", lineHeight: "1.08" }, // 60px
    "7xl": { fontSize: "4.5rem", lineHeight: "1.02" }, // 72px
  },
} as const;

export const spacingTokens = {
  // Mobile gutters & responsive container padding
  containerPadding: {
    mobile: "1rem", // 16px for 320px - 430px
    tablet: "1.5rem", // 24px for 768px
    desktop: "2rem", // 32px for 1024px+
    desktopLg: "2.5rem", // 40px for 1440px+
  },
  // Touch Target Minimum for WCAG AAA
  minTouchTarget: "44px",
} as const;

export const breakpoints = {
  mobileSmall: 320, // Smallest mobile (iPhone SE 1st gen, etc.)
  mobileStd: 375, // Standard compact mobile
  mobileMedium: 390, // Modern iPhone (iPhone 12/13/14/15)
  mobileLarge: 430, // Pro Max / large mobile
  tablet: 768, // iPad & tablets
  desktopSm: 1024, // Small laptops / iPad Pro horizontal
  desktopMd: 1280, // Standard desktop monitor
  desktopLg: 1440, // Wide desktop monitor (1440px+)
} as const;

export const containerWidths = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
} as const;
