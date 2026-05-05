/**
 * Propósito: Componente reutilizable de tarjeta (Card) con múltiples variantes
 * visuales y subcomponentes para estructurar el contenido interno.
 *
 * Ubicación: /components/ui/Card.tsx
 */

import React from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Variantes visuales disponibles para la tarjeta:
 * - default   → superficie blanca con borde sutil
 * - outlined  → borde más marcado, sin sombra
 * - elevated  → sombra prominente, sin borde
 * - accent    → borde izquierdo de color accent
 * - ghost     → sin borde ni sombra, fondo muted
 */
export type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";

/**
 * Tamaños de padding interno disponibles
 */
export type CardPadding = "none" | "sm" | "md" | "lg";

/**
 * Props del componente Card principal
 */
export interface CardProps {
    /** Variante visual de la tarjeta */
    variant?: CardVariant;
    /** Padding interno de la tarjeta */
    padding?: CardPadding;
    /** Hace la tarjeta interactiva (hover + cursor pointer) */
    clickable?: boolean;
    /** Callback al hacer click (activa modo clickable automáticamente) */
    onClick?: () => void;
    /** Ancho completo del contenedor padre */
    fullWidth?: boolean;
    /** Clases adicionales */
    className?: string;
    children: React.ReactNode;
}

// ─── Mapas de clases ──────────────────────────────────────────────────────────

/** Lógica clave: mapeo de variante → clases Tailwind usando tokens del sistema */
const variantClasses: Record<CardVariant, string> = {
    default:
        "bg-background border border-border",
    outlined:
        "bg-background border border-border-accent",
    elevated:
        "bg-background border-1 ",
    accent:
        "bg-background border border-border border-l-2 border-l-accent shadow-[var(--shadow-surface)]",
    ghost:
        "bg-surface border-0 shadow-none",
};

const paddingClasses: Record<CardPadding, string> = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
};

// ─── Componente Card ──────────────────────────────────────────────────────────

export function Card({
    variant = "default",
    padding = "md",
    clickable = false,
    onClick,
    fullWidth = false,
    className = "",
    children,
}: CardProps) {
    const isInteractive = clickable || Boolean(onClick);

    return (
        <div
            onClick={onClick}
            className={`
        rounded-xl overflow-hidden transition-all duration-200 shadow-sm
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${fullWidth ? "w-full" : ""}
        ${isInteractive
                    ? "cursor-pointer hover:border-accent hover:shadow-accent hover:-translate-y-0.5 active:scale-[0.99]"
                    : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// ─── Subcomponente: CardHeader ────────────────────────────────────────────────

/**
 * Propósito: Sección de encabezado de la tarjeta.
 *
 * Props:
 *  - title        → texto principal del encabezado
 *  - subtitle     → texto secundario debajo del título
 *  - action       → nodo opcional alineado a la derecha (botón, badge, etc.)
 *  - withDivider  → agrega línea separadora debajo
 */
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
        <div className={`${withDivider ? "pb-4 mb-4 border-b border-border" : "mb-3"} ${className}`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-base text-lg font-semibold leading-snug">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="mt-0.5 text-sm text-text-secondary">{subtitle}</p>
                    )}
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>
        </div>
    );
}

// ─── Subcomponente: CardBody ──────────────────────────────────────────────────

/**
 * Propósito: Área de contenido principal de la tarjeta.
 * Acepta cualquier nodo como children.
 */
export interface CardBodyProps {
    className?: string;
    children: React.ReactNode;
}

export function CardBody({ className = "", children }: CardBodyProps) {
    return (
        <div className={`text-sm text-text-primary ${className}`}>
            {children}
        </div>
    );
}

// ─── Subcomponente: CardFooter ────────────────────────────────────────────────

/**
 * Propósito: Sección de pie de la tarjeta, alineación configurable.
 *
 * Props:
 *  - align      → alineación horizontal del contenido
 *  - withDivider → agrega línea separadora arriba
 */
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
            className={`
        flex items-center gap-2 mt-4
        ${withDivider ? "pt-4 border-t border-border" : ""}
        ${footerAlignClasses[align]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// ─── Subcomponente: CardImage ─────────────────────────────────────────────────

/**
 * Propósito: Imagen de cabecera de la tarjeta, diseñada para salir
 * de los márgenes del padding (uso recomendado: Card con padding="none").
 *
 * Props:
 *  - src    → URL de la imagen
 *  - alt    → texto alternativo
 *  - height → altura fija del contenedor de imagen
 */
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
            className={`w-full overflow-hidden bg-muted ${className}`}
            style={{ height }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

// ─── Export por defecto ───────────────────────────────────────────────────────

export default Card;