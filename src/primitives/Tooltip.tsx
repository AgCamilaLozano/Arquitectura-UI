"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/src/utils/utils";

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "rich";
type TooltipSize = "small" | "default" | "rich";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  ariaLabel?: string;
  align?: "start" | "center" | "end";
  variant?: TooltipVariant;
  size?: TooltipSize;
  disabled?: boolean;
}

/* CORREGIDO: Mapeo de superficies y contraste con soporte HSL para evitar bloques vacíos */
const variantClasses: Record<TooltipVariant, string> = {
  default: "bg-primary text-white border border-transparent font-sans dark:bg-primary dark:text-primary-foreground",
  rich: "bg-surface text-text-primary border border-border shadow-floating font-sans",
};
const sizeClasses: Record<TooltipSize, string> = {
  small: "max-w-[160px] px-2 py-1 text-xs font-medium",
  default: "max-w-[200px] px-3 py-1.5 text-xs font-medium",
  rich: "max-w-[280px] px-4 py-3 text-sm leading-relaxed",
};

export function Tooltip({
  content,
  children,
  side = "top",
  ariaLabel,
  align = "center",
  variant = "default",
  size,
  disabled = false,
}: TooltipProps) {
  
  const resolvedSize = size ?? (variant === "rich" ? "rich" : "default");

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        
        {/* CORREGIDO: Eliminado el span intermedio. asChild delega el trigger directamente al componente hijo */}
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          {!disabled && (
            <TooltipPrimitive.Content
              side={side}
              align={align}
              sideOffset={6}
              className={cn(
                "z-50 w-max break-words pointer-events-none select-none rounded-md shadow-card transition-all animate-fade-in-soft",
                variantClasses[variant],
                sizeClasses[resolvedSize]
              )}
              aria-label={ariaLabel ?? (typeof content === "string" ? content : undefined)}
            >
              {/* Contenedor explícito de renderizado de contenido */}
              {content}
              
              <TooltipPrimitive.Arrow 
                className={cn(
                  "fill-current",
                  variant === "default" ? "text-primary" : "text-default"
                )} 
                width={10} 
                height={5} 
              />
            </TooltipPrimitive.Content>
          )}
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}