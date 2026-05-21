import React from 'react';
import { cn } from "@/lib/utils"; // Ruta estandarizada
import { X } from 'lucide-react';

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

const colorVariantStyles: Record<LabelColor, Record<LabelVariant, string>> = {
    neutral: {
        filled: "bg-primary text-background border border-transparent",
        soft: "bg-muted text-text-primary border border-border",
        outline: "border border-border text-text-primary bg-transparent",
    },
    accent: {
        filled: "bg-accent text-white border border-transparent",
        soft: "bg-accent-soft text-accent border border-accent/30",
        outline: "border border-accent text-accent bg-transparent",
    },
    success: {
        filled: "bg-text-success text-white border border-transparent",
        soft: "bg-success text-text-success border border-text-success/25",
        outline: "border border-text-success text-text-success bg-transparent",
    },
    error: {
        filled: "bg-text-error text-white border border-transparent",
        soft: "bg-error text-text-error border border-text-error/25",
        outline: "border border-text-error text-text-error bg-transparent",
    },
    warning: {
        filled: "bg-text-warning text-white border border-transparent",
        soft: "bg-warning text-text-warning border border-text-warning/25",
        outline: "border border-text-warning text-text-warning bg-transparent",
    },
    info: {
        filled: "bg-text-info text-white border border-transparent",
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
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
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
                "inline-flex items-center rounded-md font-medium select-none",
                colorVariantStyles[color][variant],
                sizeStyles[size],
                className
            )}
        >
            {icon && (
                <span className={cn("flex-shrink-0 [&_svg]:size-full", iconSizeStyles[size])}>
                    {icon}
                </span>
            )}

            <span className="truncate">{label}</span>

            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className={cn(
                        "flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-all outline-none cursor-pointer",
                        "focus-visible:ring-1 focus-visible:ring-current"
                    )}
                    aria-label={`Eliminar ${label}`}
                >
                    <X className={iconSizeStyles[size]} />
                </button>
            )}
        </span>
    );
}