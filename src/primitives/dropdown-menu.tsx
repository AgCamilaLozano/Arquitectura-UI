"use client";

import * as React from "react";
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/src/utils/utils";

/* ==========================================================================
   TIPOS & INTERFACES (DECLARATIVO DE CONVENIENCIA)
   ========================================================================== */

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

// Ícono corporativo por defecto de tres puntos horizontales
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

/* ==========================================================================
   SUB-COMPONENTES ATÓMICOS (EXPORTE COMPUESTO)
   ========================================================================== */

const DropdownMenuRoot = DropdownPrimitive.Root;
const DropdownMenuTrigger = DropdownPrimitive.Trigger;
const DropdownMenuGroup = DropdownPrimitive.Group;
const DropdownMenuPortal = DropdownPrimitive.Portal;

function DropdownMenuContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Content>) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        data-slot="dropdown-menu-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          /* Elevación, superficie sólida y tipografía */
          "z-50 min-w-[8rem] overflow-hidden rounded-sm border border-border bg-background p-1 text-text-primary shadow-floating outline-none font-sans text-body-dense",
          /* Animaciones de entrada/salida aceleradas por GPU */
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Item> & {
  variant?: "default" | "danger";
}) {
  return (
    <DropdownPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        /* Geometría e interacción base */
        "relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-sm px-3 py-1.5 font-sans text-body-dense outline-none transition-colors duration-150",
        /* Estado Deshabilitado */
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
        /* Normalización de SVGs internos */
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        /* Variantes de Color Semántico */
        variant === "danger"
          ? "text-destructive focus:bg-destructive/10 focus:text-destructive font-medium"
          : "text-text-primary focus:bg-surface focus:text-text-primary",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Label>) {
  return (
    <DropdownPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn(
        "px-3 pt-2 pb-1 text-caption font-medium text-text-secondary select-none label-mono tracking-wider",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Separator>) {
  return (
    <DropdownPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(
        "-mx-1 my-1 h-px bg-border rule-holo pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

/* ==========================================================================
   WRAPPER COMPUESTO DE CONVENIENCIA
   ========================================================================== */

function DropdownMenu({
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
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          type="button"
          className={cn(
            /* Estructura del botón disparador neutro */
            "group inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-border-default bg-background px-3 font-sans text-body-dense font-medium text-text-primary shadow-xs cursor-pointer select-none transition-all duration-200 outline-none",
            /* Física del Anillo de Enfoque Unificado (Glow Effect) */
            "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
            "data-[state=open]:border-border-strong data-[state=open]:ring-4 data-[state=open]:ring-border-strong/20",
            /* Estado Deshabilitado */
            disabled && "cursor-not-allowed opacity-40 bg-surface/50 text-text-secondary",
            className
          )}
        >
          {trigger}

          {triggerIcon && (
            <span
              className="text-text-secondary transition-transform duration-200 group-data-[state=open]:rotate-180 flex items-center justify-center"
              aria-hidden="true"
            >
              {triggerIcon}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className={width}>
        {groups.map((group, gIdx) => (
          <DropdownMenuGroup key={gIdx} className="flex flex-col gap-0.5">
            {group.groupLabel && (
              <DropdownMenuLabel>{group.groupLabel}</DropdownMenuLabel>
            )}

            {group.items.map((item, iIdx) => (
              <React.Fragment key={iIdx}>
                <DropdownMenuItem
                  disabled={item.disabled}
                  variant={item.variant}
                  onSelect={() => handleItemClick(item)}
                >
                  {item.icon && (
                    <span
                      className="shrink-0 text-current flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                  )}

                  <span className="flex-1 truncate">{item.label}</span>

                  {item.trailingIcon && (
                    <span
                      className="shrink-0 text-text-secondary flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {item.trailingIcon}
                    </span>
                  )}
                </DropdownMenuItem>

                {item.separator && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}

            {gIdx < groups.length - 1 && <DropdownMenuSeparator />}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export {
  DropdownMenu,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPortal,
};