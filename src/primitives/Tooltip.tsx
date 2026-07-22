"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/src/utils/utils";

/* ==========================================================================
   TIPOS & INTERFACES
   ========================================================================== */

export type TooltipSide = "top" | "bottom" | "left" | "right";
export type TooltipVariant = "default" | "rich";
export type TooltipSize = "small" | "default" | "rich";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  align?: "start" | "center" | "end";
  ariaLabel?: string;
  variant?: TooltipVariant;
  size?: TooltipSize;
  disabled?: boolean;
  delayDuration?: number;
}

/* ==========================================================================
   CONFIGURACIÓN DE VARIANTES Y TOKENS (MANUAL DE MARCA V2.0)
   ========================================================================== */

const variantClasses: Record<TooltipVariant, string> = {
  default:
    "bg-primary !text-accent-foreground dark:!text-background/90 border border-transparent font-sans shadow-xs",
  rich: "bg-surface text-text-primary border border-border shadow-card font-sans",
};

const sizeClasses: Record<TooltipSize, string> = {
  small: "max-w-[160px] px-2 py-1 text-caption font-medium",
  default: "max-w-[220px] px-3 py-1.5 text-caption font-medium",
  rich: "max-w-[280px] px-4 py-3 text-body-dense leading-relaxed",
};

/* ==========================================================================
   COMPONENTE DECLARATIVO AUTÓNOMO & RESILIENTE
   ========================================================================== */

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  ariaLabel,
  variant = "default",
  size,
  disabled = false,
  delayDuration = 200,
}: TooltipProps) {
  const resolvedSize = size ?? (variant === "rich" ? "rich" : "default");

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 w-max break-words pointer-events-none select-none rounded-sm outline-none",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150",
              variantClasses[variant],
              sizeClasses[resolvedSize]
            )}
            aria-label={
              ariaLabel ?? (typeof content === "string" ? content : undefined)
            }
          >
            {content}
            <TooltipPrimitive.Arrow
              className={cn(
                "fill-current",
                variant === "default" ? "text-primary" : "text-surface"
              )}
              width={10}
              height={5}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

/* ==========================================================================
   PRIMITIVAS EXPORTADAS PARA COMPOSICIÓN MANUAL AVANZADA
   ========================================================================== */

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = TooltipPrimitive.Content;