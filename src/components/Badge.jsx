import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Simple className joiner to avoid external deps
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Color tokens for "ghost" style (border + soft background + colored text)
const colorTokens = {
  gray: {
    text: "text-gray-700",
    border: "border-gray-200",
    bg: "bg-gray-50",
    hoverBg: "hover:bg-gray-100",
  },
  blue: {
    text: "text-blue-600",
    border: "border-blue-300",
    bg: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
  },
  orange: {
    text: "text-orange-600",
    border: "border-orange-300",
    bg: "bg-orange-50",
    hoverBg: "hover:bg-orange-100",
  },
  green: {
    text: "text-green-600",
    border: "border-green-300",
    bg: "bg-green-50",
    hoverBg: "hover:bg-green-100",
  },
  yellow: {
    text: "text-amber-600",
    border: "border-amber-300",
    bg: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
  },
  red: {
    text: "text-red-600",
    border: "border-red-300",
    bg: "bg-red-50",
    hoverBg: "hover:bg-red-100",
  },
};

// Backwards-compatibility mapping for old variants
const legacyToColor = {
  primary: "blue",
  secondary: "blue",
  tertiary: "gray",
  success: "green",
  error: "red",
  disable: "gray",
  ghost: "gray",
};

// Size tokens
const sizeTokens = {
  s: "h-6 px-2 text-xs rounded-md",
  l: "h-8 px-3 text-sm rounded-lg",
  small: "h-6 px-2 text-xs rounded-md", // legacy alias
  large: "h-8 px-3 text-sm rounded-md", // legacy alias
};

/**
 * Badge component
 *
 * Props:
 * - type: 'ghost' | 'solid' (default 'ghost')
 * - hover: boolean (adds hover background tint) default false
 * - size: 's' | 'l' | 'small' | 'large'
 * - color: 'gray' | 'blue' | 'orange' | 'green' | 'yellow' | 'red'
 * - variant: legacy alias ('primary'|'secondary'|'tertiary'|'success'|'error'|'disable'|'ghost')
 * - leadingIcon / trailingIcon: ReactNode (optional)
 * - dropdown: boolean to show chevron
 * - chevron: 'down' | 'up' (default 'down')
 * - showText: boolean to render label text (default true)
 * - className: extra class names
 * - children: label text if provided
 */
const Badge = ({
  type = "ghost",
  hover = false,
  size = "s",
  color,
  variant,
  leadingIcon,
  trailingIcon,
  dropdown = false,
  chevron = "down",
  showText = true,
  className = "",
  disabled = false,
  children,
  ...rest
}) => {
  // Resolve color from either `color` or legacy `variant`
  const resolvedColor = color || legacyToColor[variant] || "gray";
  const t = colorTokens[resolvedColor] || colorTokens.gray;
  const sizeCls = sizeTokens[size] || sizeTokens.s;

  // Style by type
  const base =
    "inline-flex items-center gap-1 border font-medium select-none transition-colors";
  const ghost = cn(
    t.text,
    "border-transparent",
    `hover:${t.border}`,
    t.bg,
    hover ? t.hoverBg : ""
  );
  const solid = cn(
    "text-white",
    resolvedColor === "blue" && "bg-blue-600 border-blue-600 hover:bg-blue-700",
    resolvedColor === "green" &&
      "bg-green-600 border-green-600 hover:bg-green-700",
    resolvedColor === "orange" &&
      "bg-orange-600 border-orange-600 hover:bg-orange-700",
    resolvedColor === "yellow" &&
      "bg-amber-500 border-amber-500 hover:bg-amber-600",
    resolvedColor === "red" && "bg-red-600 border-red-600 hover:bg-red-700",
    resolvedColor === "gray" && "bg-gray-600 border-gray-600 hover:bg-gray-700",
    hover ? "" : ""
  );

  const appearance = type === "solid" ? solid : ghost;

  const ChevronIcon = chevron === "up" ? ChevronUp : ChevronDown;
  const Component = rest.onClick ? "button" : "span";

  return (
    <Component
      className={cn(
        base,
        sizeCls,
        appearance,
        disabled ? "opacity-60 pointer-events-none cursor-not-allowed" : "",
        className
      )}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {leadingIcon ? (
        <span className="inline-flex items-center">{leadingIcon}</span>
      ) : null}
      {showText ? <span>{children || "Badge"}</span> : null}
      {trailingIcon ? (
        <span className="inline-flex items-center">{trailingIcon}</span>
      ) : null}
      {dropdown ? <ChevronIcon className="w-3.5 h-3.5" /> : null}
    </Component>
  );
};

export default Badge;
