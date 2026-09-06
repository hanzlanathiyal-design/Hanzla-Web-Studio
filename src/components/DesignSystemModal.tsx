import React, { useState } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Layers,
  Type,
  Palette,
  Layout,
  MousePointer,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Checkbox,
  Badge,
  Alert,
  Spinner,
  Skeleton,
  Container,
} from "./ui";
import { colorTokens, typographyTokens, breakpoints } from "../design-system/tokens";

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "colors" | "typography" | "buttons" | "forms" | "cards" | "responsive"
  >("overview");

  // Interactive playground state
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const [textValue, setTextValue] = useState("hello@example.com");
  const [selectedRadio, setSelectedRadio] = useState("standard");
  const [activeBreakpoint, setActiveBreakpoint] = useState<number | "fluid">("fluid");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ds-title"
    >
      <div className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl w-full max-w-5xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E5E7EB] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B1726] text-[#D4A72C] flex items-center justify-center font-bold text-xs">
              HWS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="ds-title" className="font-display text-base sm:text-lg font-bold text-[#0B1726]">
                  Global Design System
                </h2>
                <Badge variant="navy" size="sm">Hanzla Web Studio</Badge>
              </div>
              <p className="text-xs text-[#111827]/70 hidden sm:block">
                Architectural tokens, brand palette, typography, accessibility & responsive breakpoints
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] p-2 rounded-full flex items-center justify-center"
              aria-label="Close Design System"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#F7F7F5] border-b border-[#E5E7EB] overflow-x-auto text-xs shrink-0">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "colors", label: "Colors & Tokens", icon: Palette },
            { id: "typography", label: "Typography", icon: Type },
            { id: "buttons", label: "Buttons & States", icon: MousePointer },
            { id: "forms", label: "Form Controls", icon: CheckCircle2 },
            { id: "cards", label: "Cards & Surfaces", icon: Layout },
            { id: "responsive", label: "Responsive Rulers", icon: Smartphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap min-h-[36px] ${
                  isActive
                    ? "bg-[#0B1726] text-white shadow-xs font-semibold"
                    : "text-[#111827]/70 hover:text-[#0B1726] hover:bg-[#E5E7EB]/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default">
                  <CardHeader>
                    <CardTitle className="text-base text-[#0B1726]">Intentional Responsive</CardTitle>
                    <CardDescription>
                      Tested specifically at 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, and 1440px+.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="emerald" size="sm" dot>Fluid Container Gutters</Badge>
                  </CardContent>
                </Card>

                <Card variant="default">
                  <CardHeader>
                    <CardTitle className="text-base text-[#0B1726]">Rigorous State Handling</CardTitle>
                    <CardDescription>
                      Every control supports Default, Hover, Focus-Visible, Loading, and Error states.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="navy" size="sm">WCAG AAA Focus Rings</Badge>
                  </CardContent>
                </Card>

                <Card variant="default">
                  <CardHeader>
                    <CardTitle className="text-base text-[#0B1726]">Premium Typography</CardTitle>
                    <CardDescription>
                      Manrope Display paired with Inter for clean, legible body text.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="gold" size="sm">Manrope + Inter Hierarchy</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Status Banner */}
              <Alert variant="info" title="System Specification">
                Hanzla Web Studio Design System uses strictly the defined 5-color palette: Deep Navy (#0B1726), Gold (#D4A72C), Off White (#F7F7F5), Dark Text (#111827), and Soft Gray (#E5E7EB).
              </Alert>
            </div>
          )}

          {/* TAB 2: COLORS */}
          {activeTab === "colors" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1726] mb-3">
                  Primary Brand Palette (Hanzla Web Studio)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                    <div className="w-full h-12 rounded-lg bg-[#0B1726] mb-2" />
                    <p className="text-xs font-bold text-[#0B1726]">Deep Navy</p>
                    <p className="text-[10px] font-mono text-[#111827]/60">#0B1726</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                    <div className="w-full h-12 rounded-lg bg-[#D4A72C] mb-2" />
                    <p className="text-xs font-bold text-[#0B1726]">Gold</p>
                    <p className="text-[10px] font-mono text-[#111827]/60">#D4A72C</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                    <div className="w-full h-12 rounded-lg bg-[#F7F7F5] border border-[#E5E7EB] mb-2" />
                    <p className="text-xs font-bold text-[#0B1726]">Off White</p>
                    <p className="text-[10px] font-mono text-[#111827]/60">#F7F7F5</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                    <div className="w-full h-12 rounded-lg bg-[#111827] mb-2" />
                    <p className="text-xs font-bold text-[#0B1726]">Dark Text</p>
                    <p className="text-[10px] font-mono text-[#111827]/60">#111827</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E5E7EB]">
                    <div className="w-full h-12 rounded-lg bg-[#E5E7EB] mb-2" />
                    <p className="text-xs font-bold text-[#0B1726]">Soft Gray</p>
                    <p className="text-[10px] font-mono text-[#111827]/60">#E5E7EB</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1726] mb-3">
                  Semantic Feedback Tokens
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
                    <div className="w-4 h-4 rounded-full bg-[#10B981] mb-2" />
                    <p className="text-xs font-bold text-[#047857]">Success State</p>
                    <p className="text-[10px] font-mono text-[#047857]/80">#047857 / #ECFDF5</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                    <div className="w-4 h-4 rounded-full bg-[#F59E0B] mb-2" />
                    <p className="text-xs font-bold text-[#B45309]">Warning State</p>
                    <p className="text-[10px] font-mono text-[#B45309]/80">#B45309 / #FFFBEB</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
                    <div className="w-4 h-4 rounded-full bg-[#EF4444] mb-2" />
                    <p className="text-xs font-bold text-[#B91C1C]">Error State</p>
                    <p className="text-[10px] font-mono text-[#B91C1C]/80">#B91C1C / #FEF2F2</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY */}
          {activeTab === "typography" && (
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-xl border border-[#E5E7EB] space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#111827]/50">Heading (Manrope Display)</span>
                  <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
                    We Build Websites That Make Businesses Look Better Online
                  </h1>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#111827]/50">Body (Inter, 16px, 1.6 line height)</span>
                  <p className="text-base text-[#111827]/80 leading-relaxed max-w-prose">
                    Modern, fast and responsive websites designed to help businesses build credibility, showcase their services and turn visitors into customers.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#111827]/50">Accent / Metric Text (JetBrains Mono)</span>
                  <p className="font-mono text-sm text-[#0B1726] font-semibold">
                    100/100 Lighthouse • 0.38s LCP • 0.00 CLS • React 19 • Next.js 15
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BUTTONS & STATES */}
          {activeTab === "buttons" && (
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-xl border border-zinc-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Interactive State Playground
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setButtonLoading(!buttonLoading)}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Toggle Loading: {buttonLoading ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 mb-2">Variants (Size: md, Touch: 44px)</p>
                    <div className="flex flex-wrap gap-2.5 items-center">
                      <Button variant="primary" isLoading={buttonLoading}>
                        Primary Action
                      </Button>
                      <Button variant="accent" isLoading={buttonLoading}>
                        Electric Accent
                      </Button>
                      <Button variant="secondary" isLoading={buttonLoading}>
                        Secondary
                      </Button>
                      <Button variant="outline" isLoading={buttonLoading}>
                        Outline
                      </Button>
                      <Button variant="subtle" isLoading={buttonLoading}>
                        Subtle Tint
                      </Button>
                      <Button variant="ghost" isLoading={buttonLoading}>
                        Ghost Action
                      </Button>
                      <Button variant="danger" isLoading={buttonLoading}>
                        Danger State
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-zinc-500 mb-2">Sizes Scale (sm: 36px, md: 44px, lg: 48px)</p>
                    <div className="flex flex-wrap gap-2.5 items-center">
                      <Button size="sm" variant="primary">Small (36px)</Button>
                      <Button size="md" variant="primary">Medium (44px min)</Button>
                      <Button size="lg" variant="primary">Large Hero (48px+)</Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-zinc-500 mb-2">Disabled State (Accessible opacity & aria)</p>
                    <div className="flex flex-wrap gap-2.5 items-center">
                      <Button variant="primary" disabled>Primary Disabled</Button>
                      <Button variant="secondary" disabled>Secondary Disabled</Button>
                      <Button variant="outline" disabled>Outline Disabled</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FORMS & STATES */}
          {activeTab === "forms" && (
            <div className="space-y-6">
              <div className="p-4 bg-white rounded-xl border border-zinc-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Form Controls, Errors & Focus Rings
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setInputError(!inputError)}
                    >
                      Toggle Error: {inputError ? "ON" : "OFF"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setInputLoading(!inputLoading)}
                    >
                      Loading: {inputLoading ? "ON" : "OFF"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    required
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    error={inputError ? "Please enter a valid business email address" : undefined}
                    helperText={!inputError ? "We will send your project quote to this address" : undefined}
                    isLoading={inputLoading}
                  />

                  <Select
                    label="Target Industry"
                    required
                    error={inputError ? "Industry selection is required" : undefined}
                    options={[
                      { value: "saas", label: "B2B SaaS & Tech" },
                      { value: "real-estate", label: "Luxury Real Estate" },
                      { value: "ecommerce", label: "E-Commerce & Retail" },
                      { value: "healthcare", label: "Healthcare & MedTech" },
                    ]}
                  />

                  <div className="md:col-span-2">
                    <Textarea
                      label="Project Description"
                      placeholder="Outline key goals, technical requirements, or conversion pain points..."
                      maxLength={500}
                      currentLength={128}
                      error={inputError ? "Project description cannot be blank" : undefined}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Checkbox
                      label="I agree to receive the interactive architectural proposal"
                      description="Zero spam. Strictly confidential analysis by lead engineer Hanzla Nathiyal."
                      checked={true}
                    />
                    {inputError && (
                      <Checkbox
                        label="Terms & conditions acceptance"
                        error="You must agree to the project sprint terms to continue"
                        checked={false}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Alerts Demonstration */}
              <div className="space-y-3">
                <Alert variant="error" title="Critical Validation Error">
                  API request failed: Invalid URL parameter provided for website diagnostic crawler.
                </Alert>
                <Alert variant="success" title="Booking Confirmed">
                  Your strategy call has been reserved with Hanzla Nathiyal. Check your inbox for Google Meet details.
                </Alert>
              </div>
            </div>
          )}

          {/* TAB 6: CARDS */}
          {activeTab === "cards" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="default">
                <CardHeader>
                  <CardTitle className="text-base">Default Card</CardTitle>
                  <CardDescription>Clean border with subtle 1px zinc-200 line and slight elevation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-600">Standard surface for project metrics, reviews, and specs.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">Action</Button>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="text-base">Elevated Card</CardTitle>
                  <CardDescription>Features a smooth shadow-md drop for standout pricing tiers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-600">Perfect for featured service packages or primary offers.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="accent">Primary Tier</Button>
                </CardFooter>
              </Card>

              <Card variant="subtle">
                <CardHeader>
                  <CardTitle className="text-base">Subtle Card</CardTitle>
                  <CardDescription>Zinc-50 soft surface for technical details or secondary data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-600">Reduces visual noise in dense interfaces.</p>
                </CardContent>
              </Card>

              <Card variant="accent" isInteractive>
                <CardHeader>
                  <CardTitle className="text-base">Interactive Accent Card</CardTitle>
                  <CardDescription>Clickable card with smooth hover scale and blue border.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-600">Try hovering or focusing via keyboard tab key.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 7: RESPONSIVE RULERS */}
          {activeTab === "responsive" && (
            <div className="space-y-4">
              <Alert variant="info" title="Intentional Responsive Viewport Matrix">
                Select any breakpoint below to verify the exact layout behavior across mobile, tablet, and wide desktop.
              </Alert>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { width: 320, label: "320px (Compact Mobile)", icon: Smartphone },
                  { width: 375, label: "375px (iPhone SE)", icon: Smartphone },
                  { width: 390, label: "390px (iPhone 14/15)", icon: Smartphone },
                  { width: 430, label: "430px (Pro Max)", icon: Smartphone },
                  { width: 768, label: "768px (iPad / Tablet)", icon: Tablet },
                  { width: 1024, label: "1024px (Small Desktop)", icon: Monitor },
                  { width: 1280, label: "1280px (Standard Desktop)", icon: Monitor },
                  { width: 1440, label: "1440px+ (Wide Screen)", icon: Maximize2 },
                ].map((bp) => (
                  <button
                    key={bp.width}
                    onClick={() => setActiveBreakpoint(bp.width)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      activeBreakpoint === bp.width
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    <bp.icon className="w-3 h-3" />
                    <span>{bp.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => setActiveBreakpoint("fluid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    activeBreakpoint === "fluid"
                      ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                      : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  Full Fluid Mode
                </button>
              </div>

              {/* Rulers preview container */}
              <div className="p-4 bg-zinc-200 rounded-xl overflow-x-auto flex justify-center">
                <div
                  style={{
                    width: activeBreakpoint === "fluid" ? "100%" : `${activeBreakpoint}px`,
                    maxWidth: "100%",
                    transition: "width 0.3s ease-in-out",
                  }}
                  className="bg-white border-2 border-dashed border-zinc-400 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-100 text-xs text-zinc-500 font-mono">
                    <span>Width: {activeBreakpoint === "fluid" ? "100% Fluid" : `${activeBreakpoint}px`}</span>
                    <span>Touch targets: &ge;44px</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-sm text-zinc-900 truncate">Hanzla Web Studio</div>
                      <Button size="sm" variant="primary">CTA Button</Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                        <span className="font-semibold block">Grid Item 1</span>
                        <span className="text-zinc-500 text-[11px]">Adapts from 1 col on 320px to 2 cols</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                        <span className="font-semibold block">Grid Item 2</span>
                        <span className="text-zinc-500 text-[11px]">Consistent padding</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
          <span>Design System Spec for Hanzla Web Studio</span>
          <Button size="sm" variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
