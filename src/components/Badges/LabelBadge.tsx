"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";
import { X } from "lucide-react";

export type LabelColor = "neutral" | "accent" | "success" | "error" | "warning" | "info";
export type LabelVariant = "filled" | "soft" | "outline";

interface LabelBadgeProps {
  label: string;
  variant?: LabelVariant;
  color?: LabelColor;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

/* MAPEO CORREGIDO: Tokens HSL semánticos alineados estrictamente con globals.css y Tailwind v4 */
const colorVariantStyles: Record<LabelColor, Record<LabelVariant, string>> = {
  neutral: {
    filled: "bg-primary !text-accent-foreground border border-transparent",
    soft: "bg-surface text-text-primary border border-border",
    outline: "border border-border text-text-primary bg-transparent",
  },
  accent: {
    filled: "bg-accent !text-accent-foreground border border-transparent",
    soft: "bg-accent-soft !text-accent border border-accent/20",
    outline: "border border-accent !text-accent bg-transparent",
  },
  success: {
    filled: "bg-text-success !text-accent-foreground border-transparent",
    soft: "bg-alert-success !text-text-success border border-text-success/20",
    outline: "border border-text-success !text-text-success bg-transparent",
  },
  error: {
    filled: "bg-destructive  !text-accent-foreground border border-transparent",
    soft: "bg-alert-error !text-text-error border border-text-error/20",
    outline: "border border-text-error !text-text-error bg-transparent",
  },
  warning: {
    filled: "bg-text-warning  !text-accent-foreground border border-transparent",
    soft: "bg-alert-warning !text-text-warning border border-text-warning/20",
    outline: "border border-text-warning !text-text-warning bg-transparent",
  },
  info: {
    filled: "bg-text-info  !text-accent-foreground border border-transparent",
    soft: "bg-alert-info !text-text-info border border-text-info/20",
    outline: "border border-text-info !text-text-info bg-transparent",
  },
};

const sizeStyles = {
  sm: "text-caption px-2 py-0.5 gap-1 rounded-sm",
  md: "text-body-dense px-2.5 py-1 gap-1.5 rounded-md",
  lg: "text-body-dense px-3 py-1.5 gap-2 rounded-md",
};

const iconSizeStyles = {
  sm: "[&_svg]:size-3",
  md: "[&_svg]:size-3.5",
  lg: "[&_svg]:size-4",
};

export function LabelBadge({
  label,
  variant = "soft",
  color = "neutral",
  size = "sm",
  icon,
  onRemove,
  className,
}: LabelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium select-none tracking-tight font-sans transition-all duration-200",
        colorVariantStyles[color][variant],
        sizeStyles[size],
        className
      )}
    >
      {/* Icono Contextual de Acompañamiento */}
      {icon && (
        <span
          className={cn("flex-shrink-0 flex items-center justify-center !text-current", iconSizeStyles[size])}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      {/* Contenedor de Texto con elipsis de seguridad */}
      <span className="truncate max-w-[140px] md:max-w-[200px]">{label}</span>

      {/* Botón de Remoción / Desasignación de Filtro */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-all outline-none cursor-pointer p-0.5 hover:bg-current/10 -mr-1",
            "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-current",
            iconSizeStyles[size]
          )}
          aria-label={`Eliminar etiqueta ${label}`}
        >
          <X strokeWidth={2} />
        </button>
      )}
    </span>
  );
}