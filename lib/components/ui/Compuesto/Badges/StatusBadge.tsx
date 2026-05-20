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
