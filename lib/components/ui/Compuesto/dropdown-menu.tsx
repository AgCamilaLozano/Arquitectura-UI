"use client";

import * as React from "react";
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu"; 
import { cn } from "@/lib/utils";

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
  align?: "start" | "end" | "center";
  width?: string;
  disabled?: boolean;
  className?: string;
  triggerIcon?: React.ReactNode;
}

// Ícono corporativo por defecto de tres puntos horizontales (Lucide React Geometry)
const DefaultTriggerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
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
  align = "start",
  width = "w-52",
  disabled = false,
  className = "",
  triggerIcon = DefaultTriggerIcon,
}: DropdownMenuProps) {

  const handleItemClick = React.useCallback((item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
  }, []);

  return (
    <DropdownPrimitive.Root>
      
      <DropdownPrimitive.Trigger asChild disabled={disabled}>
        <button
          type="button"
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 h-10 text-sm font-medium text-text-primary shadow-xs cursor-pointer select-none transition-all duration-200 outline-none",
            "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
            "data-[state=open]:border-accent data-[state=open]:ring-4 data-[state=open]:ring-border-strong/20 data-[state=open]:ring-offset-0",
            disabled && "cursor-not-allowed opacity-50 bg-muted text-text-disabled",
            className
          )}
        >
          {trigger}

          {triggerIcon && (
            <span
              className="text-text-muted/70 transition-transform duration-200 group-data-[state=open]:rotate-180 flex items-center justify-center"
              aria-hidden="true"
            >
              {triggerIcon}
            </span>
          )}
        </button>
      </DropdownPrimitive.Trigger>

      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          align={align}
          sideOffset={6}
          className={cn(
            "bg-background text-text-primary border border-border rounded-md p-1 z-50 overflow-hidden font-sans",
            "shadow-floating outline-none",
            "data-[state=open]:animate-fade-in-soft",
            width
          )}
        >
          {groups.map((group, gIdx) => (
            <DropdownPrimitive.Group key={gIdx} className="flex flex-col gap-0.5">
              
              {/* Label de grupo formateado con la clase oficial .label-mono */}
              {group.groupLabel && (
                <DropdownPrimitive.Label className="px-3 pt-2 pb-1 text-text-muted select-none label-mono tracking-wider">
                  {group.groupLabel}
                </DropdownPrimitive.Label>
              )}

              {group.items.map((item, iIdx) => (
                <div key={iIdx}>
                  <DropdownPrimitive.Item
                    disabled={item.disabled}
                    onSelect={() => handleItemClick(item)}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-1.5 text-sm text-left rounded-sm outline-none select-none transition-colors duration-150 cursor-pointer font-sans",
                      "data-[disabled]:cursor-not-allowed data-[disabled]:text-text-disabled data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
                      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
                      item.variant === "danger"
                        ? "text-text-error focus:bg-error focus:text-text-error font-medium"
                        : "text-text-primary focus:bg-muted focus:text-text-primary"
                    )}
                  >
                    {/* Ícono izquierdo contextual */}
                    {item.icon && (
                      <span className="shrink-0 text-current flex items-center justify-center" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}

                    <span className="flex-1 truncate">{item.label}</span>

                    {/* Ícono derecho de asistencia o atajo */}
                    {item.trailingIcon && (
                      <span className="shrink-0 text-text-muted/60 flex items-center justify-center" aria-hidden="true">
                        {item.trailingIcon}
                      </span>
                    )}
                  </DropdownPrimitive.Item>

                  {/* Separador atómico interno con degradado .rule-holo */}
                  {item.separator && (
                    <DropdownPrimitive.Separator className="h-px bg-muted rule-holo my-1 -mx-1 pointer-events-none" />
                  )}
                </div>
              ))}

              {/* Separador inter-grupal con degradado .rule-holo */}
              {gIdx < groups.length - 1 && (
                <DropdownPrimitive.Separator className="h-px bg-muted rule-holo my-1 -mx-1 pointer-events-none" />
              )}
            </DropdownPrimitive.Group>
          ))}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>

    </DropdownPrimitive.Root>
  );
}