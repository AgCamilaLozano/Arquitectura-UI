"use client";

import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Tipos (Se mantienen estables) ────────────────────────────────────────────

export type TabItem = {
    id: string;
    label: string;
    icon?: ReactNode;
    content: ReactNode;
    disabled?: boolean;
};

export type TabsVariant = "underline" | "pill" | "card";

export type TabsProps = {
    tabs: TabItem[];
    defaultTab?: string;
    activeTab?: string;
    onChange?: (id: string) => void;
    variant?: TabsVariant;
    className?: string;
    align?: "start" | "center" | "end" | "stretch";
};

// ─── Estilos por variante (Adaptados con tus tokens exactos) ──────────────────

const triggerBase =
    "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent";

const variantStyles: Record<
    TabsVariant,
    { list: string; trigger: string; active: string; inactive: string }
> = {
    underline: {
        list: "flex border-b border-border gap-1",
        trigger: "px-4 py-2.5 border-b-2 -mb-px outline-none",
        active: "border-accent text-accent",
        inactive: "border-transparent text-text-secondary hover:text-text-primary hover:border-accent",
    },
    pill: {
        list: "flex gap-1 bg-muted p-1 rounded-xl w-fit", 
        trigger: "px-4 py-2 rounded-lg outline-none",
        active: "bg-surface text-text-primary shadow-xs",
        inactive: "text-text-muted hover:text-text-primary hover:bg-muted/60",
    },
    card: {
        list: "flex gap-1.5",
        trigger: "px-4 py-2.5 rounded-t-xl border border-b-0 outline-none",
        active: "border-border bg-surface text-text-primary",
        inactive: "border-transparent bg-muted/50 text-text-muted hover:text-text-primary hover:bg-accent-soft",
    },
};

const alignClass: Record<NonNullable<TabsProps["align"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    stretch: "[&>button]:flex-1 [&>button]:justify-center w-full",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function Tabs({
    tabs,
    defaultTab,
    activeTab: controlledTab,
    onChange,
    variant = "underline",
    className = "",
    align = "start",
}: TabsProps) {
    const [internalActive, setInternalActive] = useState<string>(
        defaultTab ?? tabs[0]?.id ?? ""
    );

    const isControlled = controlledTab !== undefined;
    const active = isControlled ? controlledTab : internalActive;

    const handleSelect = (id: string) => {
        if (!isControlled) setInternalActive(id);
        onChange?.(id);
    };

    const styles = variantStyles[variant];

    return (
        <div className={cn("flex flex-col w-full", className)}>
            {/* ── Lista de pestañas (Trigger Bar) ── */}
            <div
                role="tablist"
                aria-orientation="horizontal"
                className={cn(styles.list, alignClass[align])}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === active;
                    return (
                        <button
                            key={tab.id}
                            id={`tab-trigger-${tab.id}`} 
                            role="tab"
                            type="button"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${tab.id}`}
                            disabled={tab.disabled}
                            onClick={() => !tab.disabled && handleSelect(tab.id)}
                            className={cn(
                                triggerBase,
                                styles.trigger,
                                isActive ? styles.active : styles.inactive
                            )}
                        >
                            {tab.icon && (
                                <span className="shrink-0 size-4 [&_svg]:size-full">{tab.icon}</span>
                            )}
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* ── Paneles de Contenido (Optimizado con Lazy Loading) ── */}
            {tabs.map((tab) => {
                const isActive = tab.id === active;
                
                if (!isActive) return null;

                return (
                    <div
                        key={tab.id}
                        role="tabpanel"
                        id={`tabpanel-${tab.id}`}
                        aria-labelledby={`tab-trigger-${tab.id}`} 
                        className="mt-4 text-text-primary animate-in fade-in duration-200 outline-none"
                    >
                        {tab.content}
                    </div>
                );
            })}
        </div>
    );
}