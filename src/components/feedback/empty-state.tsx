"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";

/* ==========================================================================
   TIPOS & INTERFACES
   ========================================================================== */

export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: EmptyStateSize;
}

/* ==========================================================================
   CONFIGURACIÓN DE TAMAÑOS & PADDING OPERATIVO
   ========================================================================== */

const sizeStyles: Record<
  EmptyStateSize,
  { container: string; iconWrapper: string; icon: string; title: string }
> = {
  sm: {
    container: "py-6 px-4",
    iconWrapper: "p-2 mb-2",
    icon: "size-5",
    title: "text-body-dense font-semibold",
  },
  md: {
    container: "py-12 px-6",
    iconWrapper: "p-3 mb-3",
    icon: "size-6",
    title: "text-body-base font-semibold",
  },
  lg: {
    container: "py-16 px-8",
    iconWrapper: "p-4 mb-4",
    icon: "size-8",
    title: "text-heading-lg font-semibold",
  },
};

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = "md",
  className,
  ...props
}: EmptyStateProps) {
  const styles = sizeStyles[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center font-sans",
        styles.container,
        className
      )}
      {...props}
    >
      {/* ── EMBLEMA E ICONO ENMARCADO EN SUPERFICIE NEUTRA ── */}
      {Icon && (
        <div
          className={cn(
            "rounded-full bg-surface border border-border/60 text-text-secondary flex items-center justify-center shadow-2xs",
            styles.iconWrapper
          )}
        >
          <Icon className={cn(styles.icon, "text-text-secondary")} aria-hidden="true" />
        </div>
      )}

      {/* ── TÍTULO CON FUENTE HEADING (MONTSERRAT) ── */}
      <h3 className={cn("font-heading text-text-primary tracking-tight", styles.title)}>
        {title}
      </h3>

      {/* ── DESCRIPCIÓN EN FUENTE SANS (LATO) ── */}
      {description && (
        <p className="mt-1.5 text-body-dense text-text-secondary max-w-sm font-sans leading-relaxed">
          {description}
        </p>
      )}

      {/* ── ACCIÓN PRINCIPAL ── */}
      {action && <div className="mt-5 flex items-center justify-center gap-2">{action}</div>}
    </div>
  );
}