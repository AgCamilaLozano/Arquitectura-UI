"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";

export type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsVariant = "underline" | "pill" | "card";

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void; // Ahora sí puede ser un string de forma segura
  variant?: TabsVariant;
  align?: "start" | "center" | "end" | "stretch";
}

/* CORREGIDO: Alineación del anillo de enfoque perimetral (Glow Effect) unificado */
const triggerBase =
  "inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer select-none outline-none font-sans " +
  "focus-visible:outline-none focus-visible:border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:opacity-40";

/* CORREGIDO: Acoplamiento armónico a las variables e infraestructura de app/globals.css */
const variantStyles: Record<
  TabsVariant,
  { list: string; trigger: string; active: string; inactive: string }
> = {
  underline: {
    list: "flex border-b border-border gap-1 bg-transparent",
    trigger: "px-4 py-2.5 border-b-2 -mb-px relative",
    active: "border-accent text-accent font-semibold",
    inactive: "border-transparent text-text-secondary hover:text-text-primary hover:border-border",
  },
  pill: {
    list: "flex gap-1 bg-muted p-1 rounded-md w-fit border border-border/30",
    trigger: "px-4 py-1.5 rounded-sm",
    active: "bg-background text-text-primary shadow-xs font-semibold border border-border/20",
    inactive: "text-text-muted hover:text-text-primary hover:bg-background/40",
  },
  card: {
    list: "flex gap-1",
    trigger: "px-4 py-2 rounded-t-md border border-b-0 -mb-px",
    active: "border-border bg-background text-text-primary font-semibold",
    inactive: "border-transparent bg-muted/60 text-text-muted hover:text-text-primary hover:bg-muted",
  },
};

const alignClass: Record<NonNullable<TabsProps["align"]>, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>button]:flex-1 [&>button]:justify-center w-full",
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, defaultTab, activeTab: controlledTab, onChange, variant = "underline", align = "start", ...props }, ref) => {
    
    const [internalActive, setInternalActive] = React.useState<string>(
      defaultTab ?? tabs[0]?.id ?? ""
    );

    const isControlled = controlledTab !== undefined;
    const active = isControlled ? controlledTab : internalActive;

    const handleSelect = React.useCallback((id: string) => {
      if (!isControlled) setInternalActive(id);
      onChange?.(id);
    }, [isControlled, onChange]);

    // CORREGIDO: Implementación del control de teclado nativo WAI-ARIA (Arrow Keys Navigation)
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      const activeTabs = tabs.filter(t => !t.disabled);
      const currentIndex = activeTabs.findIndex(t => t.id === active);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % activeTabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + activeTabs.length) % activeTabs.length;
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
        const nextElement = document.getElementById(`tab-trigger-${nextTab.id}`);
        nextElement?.focus();
      }
    }, [tabs, active, handleSelect]);

    const styles = variantStyles[variant];

    return (
      <div 
        ref={ref} 
        className={cn("flex flex-col w-full bg-background text-text-primary font-sans", className)} 
        {...props}
      >
        {/* ── LISTA DE PESTAÑAS (TRIGGER BAR) ── */}
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
                tabIndex={isActive ? 0 : -1} // CORREGIDO: Solo la pestaña activa entra al flujo del tabulado
                onClick={() => !tab.disabled && handleSelect(tab.id)}
                className={cn(
                  triggerBase,
                  styles.trigger,
                  isActive ? styles.active : styles.inactive
                )}
              >
                {tab.icon && (
                  <span className="shrink-0 size-4 flex items-center justify-center text-current/80" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── PANELES DE CONTENIDO (LAZY LOADING CON MICRO-ANIMACIÓN FLUIDA) ── */}
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          if (!isActive) return null;

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-trigger-${tab.id}`}
              className="mt-4 text-text-primary animate-fade-in-soft outline-none font-sans"
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