// /components/ui/Tabs.tsx
"use client";

import { useState, ReactNode } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

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

// ─── Estilos por variante ─────────────────────────────────────────────────────

const triggerBase =
    "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const variantStyles: Record<
    TabsVariant,
    { list: string; trigger: string; active: string; inactive: string }
> = {
    underline: {
        list: "flex border-b border-border gap-1",
        trigger: "px-4 py-2.5 border-b-2 -mb-px",
        active: "border-accent text-accent",
        inactive: "border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong",
    },
    pill: {
        list: "flex gap-1 bg-muted p-1 rounded-xl",
        trigger: "px-4 py-2 rounded-lg",
        active: "bg-surface text-text-primary shadow-[var(--shadow-surface)]",
        inactive: "text-text-muted hover:text-text-primary hover:bg-accent-hover",
    },
    card: {
        list: "flex gap-2",
        trigger: "px-4 py-2.5 rounded-t-lg border border-b-0",
        active: "border-border bg-surface text-text-primary",
        inactive: "border-transparent bg-muted text-text-muted hover:text-text-primary hover:bg-accent-soft",
    },
};

const alignClass: Record<NonNullable<TabsProps["align"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    stretch: "[&>button]:flex-1 [&>button]:justify-center",
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
        <div className={`flex flex-col w-full ${className}`}>
            {/* ── Lista de tabs ── */}
            <div
                role="tablist"
                className={`${styles.list} ${alignClass[align]}`}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === active;
                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${tab.id}`}
                            disabled={tab.disabled}
                            onClick={() => !tab.disabled && handleSelect(tab.id)}
                            className={[
                                triggerBase,
                                styles.trigger,
                                isActive ? styles.active : styles.inactive,
                            ].join(" ")}
                        >
                            {tab.icon && (
                                <span className="shrink-0 size-4">{tab.icon}</span>
                            )}
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Paneles de contenido: todos montados, solo el activo visible ── */}
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`tabpanel-${tab.id}`}
                    aria-labelledby={tab.id}
                    hidden={tab.id !== active}
                    className="mt-4 text-text-primary"
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}