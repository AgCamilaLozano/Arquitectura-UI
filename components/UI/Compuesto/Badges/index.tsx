/**
 * Propósito: Badge de estado semántico con punto de indicador animado opcional.
 * Comunica el estado de una entidad (activo, error, advertencia, info, inactivo).
 *
 * Props:
 * - status: variante semántica del badge
 * - label: texto visible del badge
 * - withDot: muestra el punto indicador (por defecto true)
 * - animated: el punto pulsa con animación (solo cuando withDot=true)
 * - size: tamaño del badge (sm | md)
 * - className: clases adicionales
 */

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Tipos permitidos de estado
export type StatusVariant = "success" | "error" | "warning" | "info" | "idle";

interface StatusBadgeProps {
    status: StatusVariant;
    label: string;
    withDot?: boolean;
    animated?: boolean;
    size?: "sm" | "md";
    className?: string;
}

// Mapa de estilos por variante usando tokens del design system
const variantStyles: Record<
    StatusVariant,
    { container: string; dot: string }
> = {
    success: {
        container:
            "bg-success text-text-success border border-text-success/20",
        dot: "bg-text-success",
    },
    error: {
        container:
            "bg-error text-text-error border border-text-error/20",
        dot: "bg-text-error",
    },
    warning: {
        container:
            "bg-warning text-text-warning border border-text-warning/20",
        dot: "bg-text-warning",
    },
    info: {
        container:
            "bg-info text-text-info border border-text-info/20",
        dot: "bg-text-info",
    },
    idle: {
        container:
            "bg-muted text-text-muted border border-border",
        dot: "bg-text-muted",
    },
};

// Tamaños disponibles
const sizeStylesStatus = {
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-sm px-2.5 py-1 gap-2",
};

const dotSizeStyles = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
};

export function StatusBadge({
    status,
    label,
    withDot = true,
    animated = false,
    size = "sm",
    className,
}: StatusBadgeProps) {
    const { container, dot } = variantStyles[status];

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md font-medium",
                container,
                sizeStylesStatus[size],
                className
            )}
        >
            {/* Punto indicador de estado */}
            {withDot && (
                <span className="relative flex items-center justify-center">
                    {/* Pulso animado */}
                    {animated && (
                        <span
                            className={cn(
                                "absolute inline-flex rounded-full opacity-75 animate-ping",
                                dot,
                                dotSizeStyles[size]
                            )}
                        />
                    )}
                    <span
                        className={cn(
                            "relative inline-flex rounded-full",
                            dot,
                            dotSizeStyles[size]
                        )}
                    />
                </span>
            )}
            {label}
        </span>
    );
}

/**
 * Propósito: Badge de etiqueta/categoría configurable.
 * Sirve para clasificar, etiquetar o destacar contenido con estilos visuales distintos.
 *
 * Props:
 * - label: texto del badge
 * - variant: estilo visual (filled | soft | outline | accent)
 * - color: color base semántico o de marca (neutral | accent | success | error | warning | info)
 * - size: tamaño del badge (sm | md | lg)
 * - icon: icono React a mostrar a la izquierda (opcional)
 * - onRemove: callback para mostrar botón de eliminar (opcional)
 * - className: clases adicionales
 */



export type LabelColor =
    | "neutral"
    | "accent"
    | "success"
    | "error"
    | "warning"
    | "info";

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

// Lógica clave: cada combinación color × variante produce una clase diferente
// usando los tokens del design system globales
const colorVariantStyles: Record<
    LabelColor,
    Record<LabelVariant, string>
> = {
    neutral: {
        filled: "bg-primary text-background",
        soft: "bg-muted text-text-primary border border-border",
        outline: "border border-border text-text-primary bg-transparent",
    },
    accent: {
        filled: "bg-accent text-white",
        soft: "bg-accent-soft text-accent border border-accent/30",
        outline: "border border-accent text-accent bg-transparent",
    },
    success: {
        filled: "bg-text-success text-white",
        soft: "bg-success text-text-success border border-text-success/25",
        outline: "border border-text-success text-text-success bg-transparent",
    },
    error: {
        filled: "bg-text-error text-white",
        soft: "bg-error text-text-error border border-text-error/25",
        outline: "border border-text-error text-text-error bg-transparent",
    },
    warning: {
        filled: "bg-text-warning text-white",
        soft: "bg-warning text-text-warning border border-text-warning/25",
        outline: "border border-text-warning text-text-warning bg-transparent",
    },
    info: {
        filled: "bg-text-info text-white",
        soft: "bg-info text-text-info border border-text-info/25",
        outline: "border border-text-info text-text-info bg-transparent",
    },
};

const sizeStyles = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
};

const iconSizeStyles = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
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
                "inline-flex items-center rounded-md font-medium",
                colorVariantStyles[color][variant],
                sizeStyles[size],
                className
            )}
        >
            {/* Icono izquierdo opcional */}
            {icon && (
                <span className={cn("flex-shrink-0", iconSizeStyles[size])}>
                    {icon}
                </span>
            )}

            {label}

            {/* Botón de eliminar opcional */}
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-0.5 flex-shrink-0 rounded-full opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
                    aria-label={`Eliminar ${label}`}
                >
                    <X className={iconSizeStyles[size]} />
                </button>
            )}
        </span>
    );
}