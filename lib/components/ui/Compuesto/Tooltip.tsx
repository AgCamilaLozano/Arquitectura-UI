"use client";

import * as React from "react";
// Importamos los primitivos del Tooltip de Radix
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "rich";
type TooltipSize = "small" | "default" | "rich";

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: TooltipSide;
    ariaLabel?: string;
    align?: "start" | "center" | "end";
    variant?: TooltipVariant;
    size?: TooltipSize;
    disabled?: boolean;
}

// ─── Variantes visuales (Tus mismos tokens limpios) ───────────────────────────

const variantClasses: Record<TooltipVariant, string> = {
    default: "bg-background text-text-primary rounded-md shadow-lg",
    rich: "bg-surface text-text-primary border border-border rounded-md shadow-md",
};

// ─── Tamaños (Tus mismos límites de empaquetado) ──────────────────────────────

const sizeClasses: Record<TooltipSize, string> = {
    small: "max-w-[160px] px-2 py-1 text-xs",
    default: "max-w-[200px] px-3 py-1.5 text-xs",
    rich: "max-w-[280px] px-4 py-3 text-sm",
};

export const Tooltip = ({
    content,
    children,
    side = "top",
    ariaLabel,
    align = "center",
    variant = "default",
    size,
    disabled = false,
}: TooltipProps) => {
    
    // Si no definen el tamaño, adoptamos el default del tipo de variante
    const resolvedSize = size ?? (variant === "rich" ? "rich" : "default");

    return (
        // Provider global de Radix para controlar el delay (300ms como tenías en tu timeout)
        <TooltipPrimitive.Provider delayDuration={300}>
            <TooltipPrimitive.Root>
                
                {/* El trigger que envuelve el botón o texto. asChild evita divs extra */}
                <TooltipPrimitive.Trigger asChild>
                    <span 
                        className="inline-flex items-center"
                        aria-label={ariaLabel ?? (typeof content === "string" ? content : undefined)}
                    >
                        {children}
                    </span>
                </TooltipPrimitive.Trigger>

                {/* El Portal saca el Tooltip al body para evitar que tablas o modales lo corten */}
                <TooltipPrimitive.Portal>
                    {!disabled && (
                        <TooltipPrimitive.Content
                            side={side}
                            align={align}
                            sideOffset={8} // Margen de separación (mb-2 o mt-2 equivalente)
                            className={cn(
                                "z-[9999] w-max font-normal leading-relaxed break-words pointer-events-none select-none",
                                // Animaciones nativas de Radix acopladas a Tailwind v4
                                "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in",
                                "data-[state=closed]:animate-out data-[state=closed]:fade-out",
                                variantClasses[variant],
                                sizeClasses[resolvedSize]
                            )}
                        >
                            {content}
                            
                            {/* Opcional: Radix te regala una flechita estética que apunta al botón si quieres */}
                            <TooltipPrimitive.Arrow 
                                className={cn(
                                    "fill-current",
                                    variant === "default" ? "text-primary" : "text-surface"
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
};