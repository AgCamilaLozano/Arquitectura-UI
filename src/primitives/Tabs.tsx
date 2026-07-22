"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";

/* ==========================================================================
   TIPOS & INTERFACES
   ========================================================================== */

export type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsVariant = "underline" | "pill" | "card";

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: TabsVariant;
  align?: "start" | "center" | "end" | "stretch";
}

/* ==========================================================================
   TOKENS DE SISTEMA Y VARIANTES VISUALES
   ========================================================================== */

/* Anillo de enfoque unificado (Glow Effect) de AGUSTIN */
const triggerBase =
  "inline-flex text-sm items-center gap-2 font-sans text-body-dense font-medium select-none outline-none " +
  "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer " +
  "focus-visible:outline-none focus-visible:border-border-strong focus-visible:ring-3 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:opacity-40";

const variantStyles: Record<
  TabsVariant,
  { list: string; trigger: string; active: string; inactive: string }
> = {
  underline: {
    list: "flex border-b border-border gap-1 bg-transparent w-full",
    trigger: "px-4 py-2.5 border-b-2 -mb-px relative",
    active: "border-accent text-accent font-semibold",
    inactive:
      "border-transparent text-text-secondary hover:text-text-primary hover:border-border",
  },
  pill: {
    list: "flex gap-1 bg-surface p-1 rounded-sm w-fit border border-border shadow-xs",
    trigger: "px-3.5 py-1.5 rounded-sm transition-transform duration-150",
    active:
      "bg-background text-text-primary shadow-xs font-semibold border border-border/80 scale-[1.02]",
    inactive:
      "border border-transparent text-text-secondary hover:text-text-primary hover:bg-background/60",
  },
  /* CARD REFACTORIZADO: Borde base completo en list + superposición de la pestaña activa tapando el borde inferior */
  card: {
    list: "flex gap-1 border-b border-accent w-full items-end",
    trigger: "px-4 py-2 rounded-t-md border border-transparent -mb-px relative",
    active:
      "border-accent border-b-0 bg-background text-text-primary font-semibold shadow-2xs z-10",
    inactive:
      "text-text-secondary border-b-0 hover:text-text-primary",
  },
};

const alignClass: Record<NonNullable<TabsProps["align"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>button]:flex-1 [&>button]:justify-center w-full",
};

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      tabs,
      defaultTab,
      activeTab: controlledTab,
      onChange,
      variant = "underline",
      align = "start",
      ...props
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = React.useState<string>(
      defaultTab ?? tabs[0]?.id ?? ""
    );

    const isControlled = controlledTab !== undefined;
    const active = isControlled ? controlledTab : internalActive;

    const handleSelect = React.useCallback(
      (id: string) => {
        if (!isControlled) setInternalActive(id);
        onChange?.(id);
      },
      [isControlled, onChange]
    );

    /* Navegación por teclado WAI-ARIA */
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const activeTabs = tabs.filter((t) => !t.disabled);
        const currentIndex = activeTabs.findIndex((t) => t.id === active);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % activeTabs.length;
          e.preventDefault();
        } else if (e.key === "ArrowLeft") {
          nextIndex =
            (currentIndex - 1 + activeTabs.length) % activeTabs.length;
          e.preventDefault();
        } else if (e.key === "Home") {
          nextIndex = 0;
          e.preventDefault();
        } else if (e.key === "End") {
          nextIndex = activeTabs.length - 1;
          e.preventDefault();
        }

        if (nextIndex !== currentIndex) {
          const nextTab = activeTabs[nextIndex];
          handleSelect(nextTab.id);
          const nextElement = document.getElementById(
            `tab-trigger-${nextTab.id}`
          );
          nextElement?.focus();
        }
      },
      [tabs, active, handleSelect]
    );

    const styles = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col w-full bg-background text-text-primary font-sans",
          className
        )}
        {...props}
      >
        {/* ── LISTA DE PESTAÑAS (TRIGGER BAR CON LÍNEA BASE CONTINUA) ── */}
        <div
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
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
                tabIndex={isActive ? 0 : -1}
                onClick={() => !tab.disabled && handleSelect(tab.id)}
                className={cn(
                  triggerBase,
                  styles.trigger,
                  isActive ? styles.active : styles.inactive
                )}
              >
                {tab.icon && (
                  <span
                    className="shrink-0 size-4 flex items-center justify-center text-current/80"
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── PANELES DE CONTENIDO ── */}
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          if (!isActive) return null;

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-trigger-${tab.id}`}
              tabIndex={0}
              className="mt-4 text-text-primary animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ease-out outline-none font-sans"
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";