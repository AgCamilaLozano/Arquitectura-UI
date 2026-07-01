"use client";

import * as React from "react";
import { DropdownMenu as DropdownPrimitive } from "radix-ui"; 
import { cn } from "@/lib/utils";

// ─── Tipos (Se mantienen exactamente iguales para no romper tu código) ───────
export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
  separator?: boolean;
}

export interface DropdownGroup {
  groupLabel?: string;
  items: DropdownItem[];
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  groups: DropdownGroup[];
  align?: "start" | "end" | "center"; // Radix usa 'start' (left) y 'end' (right)
  width?: string;
  disabled?: boolean;
  className?: string;
  /**
   * Ícono del disparador. Si no se pasa, usa el de tres puntos por defecto.
   * Pasa `null` explícitamente si no quieres ningún ícono.
   */
  triggerIcon?: React.ReactNode;
}

// Ícono por defecto: tres puntos horizontales
const DefaultTriggerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export function DropdownMenu({
  trigger,
  groups,
  align = "start", // Por defecto a la izquierda
  width = "w-52",
  disabled = false,
  className = "",
  triggerIcon = DefaultTriggerIcon,
}: DropdownMenuProps) {

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
  };

  return (
    // 1. Contenedor Raíz de Radix
    <DropdownPrimitive.Root>
      
      {/* 2. El disparador (Trigger) adaptado a Radix */}
      <DropdownPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          className={cn(
            "group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
            "border border-border bg-background text-text-primary shadow-xs",
            "transition-colors duration-150 outline-none cursor-pointer",
            "focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent",
            "data-[state=open]:ring-[3px] data-[state=open]:ring-accent-soft data-[state=open]:border-accent",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          {trigger}

          {/* Ícono configurable del trigger */}
          {triggerIcon && (
            <span
              className="text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180 [&_svg]:size-full"
              aria-hidden="true"
            >
              {triggerIcon}
            </span>
          )}
        </button>
      </DropdownPrimitive.Trigger>

      {/* 3. El Portal y el Contenido Flotante Inteligente de Radix */}
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          align={align}
          sideOffset={8} // Equivale a mt-2 (8px) de separación
          className={cn(
            // Estilos del panel (Copiados de tu SelectContent para consistencia total)
            "bg-background text-text-primary border border-border rounded-md p-1 z-[9999]",
            "shadow-[var(--shadow-card)] outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            width
          )}
        >
          {groups.map((group, gIdx) => (
            // Agrupador nativo de Radix
            <DropdownPrimitive.Group key={gIdx} className="flex flex-col gap-0.5">
              
              {/* Label de grupo */}
              {group.groupLabel && (
                <DropdownPrimitive.Label className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none">
                  {group.groupLabel}
                </DropdownPrimitive.Label>
              )}

              {/* Ítems del grupo mapeados a DropdownPrimitive.Item */}
              {group.items.map((item, iIdx) => (
                <div key={iIdx}>
                  <DropdownPrimitive.Item
                    disabled={item.disabled}
                    onSelect={() => handleItemClick(item)} // Radix maneja los clics con onSelect
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left rounded-md outline-none select-none transition-colors duration-100",
                      "data-[disabled]:cursor-not-allowed data-[disabled]:text-text-disabled data-[disabled]:pointer-events-none",
                      item.variant === "danger"
                        ? "text-text-error focus:bg-error/20 focus:text-text-error cursor-pointer"
                        : "text-text-primary focus:bg-muted focus:text-text-primary cursor-pointer"
                    )}
                  >
                    {/* Ícono izquierdo */}
                    {item.icon && (
                      <span className="shrink-0 text-current [&_svg]:size-4" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}

                    {/* Label */}
                    <span className="flex-1 truncate">{item.label}</span>

                    {/* Ícono derecho / trailing */}
                    {item.trailingIcon && (
                      <span className="shrink-0 text-text-muted [&_svg]:size-4" aria-hidden="true">
                        {item.trailingIcon}
                      </span>
                    )}
                  </DropdownPrimitive.Item>

                  {/* Separador opcional de ítem */}
                  {item.separator && (
                    <DropdownPrimitive.Separator className="my-1 h-px bg-border-border -mx-1" />
                  )}
                </div>
              ))}

              {/* Separador entre grupos nativo (excepto el último) */}
              {gIdx < groups.length - 1 && (
                <DropdownPrimitive.Separator className="my-1 h-px bg-border-border -mx-1" />
              )}
            </DropdownPrimitive.Group>
          ))}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>

    </DropdownPrimitive.Root>
  );
}