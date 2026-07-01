"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";

export interface CardProps {
    variant?: CardVariant;
    clickable?: boolean;
    onClick?: () => void;
    fullWidth?: boolean;
    className?: string;
    children: React.ReactNode;
}

// ─── Mapas de clases (Corregido border-1 a border) ────────────────────────────

const variantClasses: Record<CardVariant, string> = {
    default: "bg-background dark:bg-surface border border-border hover:border-accent/30",
    outlined: "bg-background border border-accent/40",
    elevated: "bg-background border border-border shadow-md", // Ajustado para dar sensación de elevación
    accent: "bg-background border border-border border-l-4 border-l-accent shadow-xs",
    ghost: "bg-surface border border-border shadow-none",
};

// ─── Componente Card Principal (Ahora Accesible) ──────────────────────────────

export function Card({
    variant = "default",
    clickable = false,
    onClick,
    fullWidth = false,
    className = "",
    children,
}: CardProps) {
    const isInteractive = clickable || Boolean(onClick);
    
    // Si es interactivo usamos un elemento 'button', si no, un 'div' estructural neutro
    const Component = isInteractive ? "button" : "div";

    return (
        <Component
            onClick={onClick}
            // Propiedades de accesibilidad automáticas si actúa como botón
            type={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            className={cn(
                "rounded-md overflow-hidden transition-all duration-200 text-left block flex flex-col w-fit",
                variantClasses[variant],
                fullWidth && "w-full",
                isInteractive && [
                    "cursor-pointer focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent",
                    "hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
                ],
                className
            )}
        >
            {children}
        </Component>
    );
}

// ─── Subcomponente: CardHeader (Ahora maneja su propio padding) ───────────────

export interface CardHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    action?: React.ReactNode;
    withDivider?: boolean;
    className?: string;
}

export function CardHeader({
    title,
    subtitle,
    action,
    withDivider = false,
    className = "",
}: CardHeaderProps) {
    return (
        <div className={cn("p-5 pb-3", withDivider && "border-b border-border mb-3", className)}>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    {/* CORREGIDO: Eliminado text-base duplicado */}
                    <h3 className="font-semibold text-lg leading-snug text-text-primary truncate">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="mt-0.5 text-sm text-text-secondary truncate">{subtitle}</p>
                    )}
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>
        </div>
    );
}

// ─── Subcomponente: CardBody (Ahora maneja su propio padding) ──────────────────

export interface CardBodyProps {
    className?: string;
    children: React.ReactNode;
}

export function CardBody({ className = "", children }: CardBodyProps) {
    return (
        // Se añade el padding nativo aquí para aislarlo de CardImage
        <div className={cn("px-5 py-3 text-sm text-text-primary flex-1", className)}>
            {children}
        </div>
    );
}

// ─── Subcomponente: CardFooter (Ahora maneja su propio padding) ────────────────

export interface CardFooterProps {
    align?: "left" | "center" | "right" | "between";
    withDivider?: boolean;
    className?: string;
    children: React.ReactNode;
}

const footerAlignClasses: Record<NonNullable<CardFooterProps["align"]>, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
};

export function CardFooter({
    align = "right",
    withDivider = false,
    className = "",
    children,
}: CardFooterProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 p-5 pt-3 mt-auto",
                withDivider && "border-t border-border",
                footerAlignClasses[align],
                className
            )}
        >
            {children}
        </div>
    );
}

// ─── Subcomponente: CardImage (Inmune al padding) ─────────────────────────────

export interface CardImageProps {
    src: string;
    alt: string;
    height?: string;
    className?: string;
}

export function CardImage({
    src,
    alt,
    height = "200px",
    className = "",
}: CardImageProps) {
    return (
        <div
            className={cn("w-full overflow-hidden bg-muted shrink-0", className)}
            style={{ height }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy" // Optimización nativa para Next.js
            />
        </div>
    );
}

export default Card;