import React from "react";

interface LogoProps {
  variant?: "full" | "mark";
  theme?: "light" | "dark"; // "light" = dark text for off-white canvas, "dark" = light text for deep navy backgrounds
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  theme = "light",
  className = "",
  size = "md",
}) => {
  const isDarkCanvas = theme === "dark";

  const markSizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const titleSizes = {
    sm: "text-sm tracking-[0.14em]",
    md: "text-base sm:text-lg tracking-[0.16em]",
    lg: "text-xl sm:text-2xl tracking-[0.18em]",
  };

  const subSizes = {
    sm: "text-[9px] tracking-[0.2em]",
    md: "text-[10px] sm:text-[11px] tracking-[0.22em]",
    lg: "text-xs tracking-[0.24em]",
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Studio Monogram Vector Emblem - Faithful to official mark */}
      <div
        className={`${markSizes[size]} relative rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
          isDarkCanvas
            ? "bg-[#0B1726] border border-[#D4A72C]/30 shadow-xs"
            : "bg-transparent"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Outer Dynamic Swoosh Arc (Gold & Navy) */}
          <path
            d="M86 28 C92 48, 76 80, 48 84 C26 87, 14 72, 17 52 C19 40, 26 28, 38 21 C33 26, 28 36, 28 47 C28 62, 38 72, 53 71 C69 70, 81 53, 76 34 C74 27, 70 21, 64 16 C73 17, 81 22, 86 28 Z"
            fill="#D4A72C"
            opacity="0.95"
          />

          {/* Left Arc Accent Swirl */}
          <path
            d="M34 22 C22 30, 16 44, 18 58 C16 47, 19 35, 27 26 C30 23, 33 21, 37 19 C35 20, 34 21, 34 22 Z"
            fill={isDarkCanvas ? "#F7F7F5" : "#0B1726"}
            opacity="0.75"
          />

          {/* Navy Letter 'H' */}
          {/* Left Vertical Stem with Angled Beveled Top */}
          <path
            d="M32 15 L43 23 L43 65 L32 65 Z"
            fill={isDarkCanvas ? "#F7F7F5" : "#0B1726"}
          />
          {/* Right Vertical Stem with Angled Beveled Top */}
          <path
            d="M57 16 L68 24 L68 65 L57 65 Z"
            fill={isDarkCanvas ? "#F7F7F5" : "#0B1726"}
          />
          {/* Crossbar connecting H */}
          <path
            d="M42 37 L58 37 L58 46 L42 46 Z"
            fill={isDarkCanvas ? "#F7F7F5" : "#0B1726"}
          />

          {/* Interlocking Gold 'W' Chevron Overlay */}
          <path
            d="M31 65 L50 42 L65 59 L78 39 C80 43, 79 48, 77 52 L65 67 L50 51 L36 67 Z"
            fill="#D4A72C"
          />
          {/* Gold W Dimension shading */}
          <path
            d="M50 42 L65 59 L62 62 L50 47 L38 61 L36 67 L50 51 L65 67 L77 52 L73 54 L64 64 L50 48 Z"
            fill="#B88D22"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Logotype */}
      {variant === "full" && (
        <div className="flex flex-col justify-center">
          {/* Primary Name: HANZLA */}
          <span
            className={`font-display font-extrabold uppercase leading-none ${titleSizes[size]} ${
              isDarkCanvas ? "text-[#F7F7F5]" : "text-[#0B1726]"
            }`}
          >
            Hanzla
          </span>

          {/* Subtitle with Gold Flanking Dashes: — WEB STUDIO — */}
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 sm:w-2.5 h-[1.5px] bg-[#D4A72C] shrink-0" />
            <span
              className={`font-display font-bold uppercase text-[#D4A72C] leading-none whitespace-nowrap ${subSizes[size]}`}
            >
              Web Studio
            </span>
            <span className="w-2 sm:w-2.5 h-[1.5px] bg-[#D4A72C] shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
};
