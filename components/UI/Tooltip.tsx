
"use client";

import { useState, useEffect, useRef } from "react";

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

// ─── Posición ────────────────────────────────────────────────────────────────

const sideClasses: Record<TooltipSide, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const alignClasses: Record<"start" | "center" | "end", string> = {
    start: "left-0 -translate-x-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0 translate-x-0",
};

// ─── Variantes visuales ───────────────────────────────────────────────────────

const variantClasses: Record<TooltipVariant, string> = {
    default: `
        bg-primary text-background
        rounded-md
        px-3 py-1.5
        text-xs
        shadow-lg
    `,
    rich: `
        bg-surface text-primary
        border border-border
        rounded-lg
        px-4 py-3
        text-sm
        shadow-card
    `,
};

// ─── Tamaños ──────────────────────────────────────────────────────────────────

const sizeClasses: Record<TooltipSize, string> = {
    small: "max-w-[160px] px-2 py-1 text-xs",
    default: "max-w-[200px] px-3 py-1.5 text-xs",
    rich: "max-w-[280px] px-4 py-3 text-sm",
};

// ─── Componente ───────────────────────────────────────────────────────────────

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
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = () => {
        if (disabled) return;
        timerRef.current = setTimeout(() => setVisible(true), 300);
    };

    const hide = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setVisible(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") hide();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const resolvedSizeClass = size ? sizeClasses[size] : "";

    const accessibleLabel =
        ariaLabel ?? (typeof content === "string" ? content : undefined);

    return (
        <div
            className="relative inline-flex items-center"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-label={accessibleLabel}
        >
            {children}

            {visible && !disabled && (
                <div
                    role="tooltip"
                    className={`
                        absolute ${sideClasses[side]} ${alignClasses[align]}
                        w-max
                        font-normal leading-relaxed
                        z-50
                        transition-opacity duration-150
                        animate-in fade-in
                        pointer-events-none
                        break-words
                        ${variantClasses[variant]}
                        ${resolvedSizeClass}
                    `}
                >
                    {content}
                </div>
            )}
        </div>
    );
};