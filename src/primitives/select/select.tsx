"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/src/utils/utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      type="button"
      data-size={size}
      className={cn(
        "group bg-background flex w-full items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 shadow-xs cursor-pointer select-none outline-none",
        /* CORREGIDO: Anillo de enfoque (Glow Effect) unificado con los inputs y botones */
        "focus:outline-none focus:border-strong focus:ring-4 focus:ring-border-strong/20 focus:ring-offset-0",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        "data-[size=default]:h-10 data-[size=sm]:h-8 data-[size=sm]:text-xs data-[size=sm]:px-2.5",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:text-text-secondary",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" strokeWidth={1.5} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
SelectTrigger.displayName = "SelectTrigger";

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-background text-text-primary relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border shadow-floating transition-all duration-200",
          /* CORREGIDO: Inyección de la animación oficial acelerada por GPU */
          position === "popper" &&
            "data-[state=open]:animate-fade-in-soft data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            /* CORREGIDO: Se remueve la propiedad restrictiva h-[var(--radix-select-trigger-height)] que colapsaba la vista */
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
SelectContent.displayName = "SelectContent";

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-semibold text-text-secondary label-mono border-b border-border mb-1", className)}
      {...props}
    />
  );
}
SelectLabel.displayName = "SelectLabel";

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors duration-150 font-sans text-text-primary",
        /* CORREGIDO: Limpieza de hover usando la paleta unificada global bg-muted */
        "focus:bg-muted focus:text-text-primary",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center text-accent"
      >
        <SelectPrimitive.ItemIndicator>
          <Check strokeWidth={1.5} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
SelectItem.displayName = "SelectItem";

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      /* CORREGIDO: Línea divisoria basada en bg-default para una óptima integración en modo oscuro */
      className={cn("h-px bg-border my-1 pointer-events-none -mx-1", className)}
      {...props}
    />
  );
}
SelectSeparator.displayName = "SelectSeparator";

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1 text-text-secondary", className)}
      {...props}
    >
      <ChevronUp className="size-4" strokeWidth={1.5} />
    </SelectPrimitive.ScrollUpButton>
  );
}
SelectScrollUpButton.displayName = "SelectScrollUpButton";

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1 text-text-secondary", className)}
      {...props}
    >
      <ChevronDown className="size-4" strokeWidth={1.5} />
    </SelectPrimitive.ScrollDownButton>
  );
}
SelectScrollDownButton.displayName = "SelectScrollDownButton";

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};