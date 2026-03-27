"use client";

import { useState, useEffect, useRef } from "react";

type TooltipSide = "top" | "bottom" | "left" | "right";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    side?: TooltipSide;
    ariaLabel?: string;
    align?: "start" | "center" | "end";
}

const sideClasses: Record<TooltipSide, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const alignClasses: Record<"start" | "center" | "end", string> = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0 translate-x-1/2",
};

export const Tooltip = ({
    text,
    children,
    side = "top",
    ariaLabel,
    align = "center",
}: TooltipProps) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = () => {
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

    return (
        <div
            className="relative inline-flex items-center"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-label={ariaLabel ?? text}
        >
            {children}

            {visible && (
                <div
                    role="tooltip"
                    className={`
                       absolute ${sideClasses[side]}
                       max-w-[200px] px-3 py-1.5
                       text-xs font-normal leading-relaxed
                       text-background bg-primary
                       rounded-md shadow-lg
                       whitespace-nowrap z-50
                       animate-in fade-in duration-150
                       pointer-events-none
                       ${alignClasses[align]}
                    `}
                >
                    {text}
                </div>
            )}
        </div>
    );
};