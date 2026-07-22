"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/src/utils/utils"
import { Circle } from "lucide-react";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-2 font-sans", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        /* Geometría, límites neutros y transición suave */
        "peer aspect-square size-4 shrink-0 rounded-full border border-border bg-background text-text-primary shadow-xs transition-all duration-200 select-none outline-none cursor-pointer",
        /* Estado Activo (Checked): El borde toma el color de acento del tenant */
        "data-[state=checked]:border-accent",
        /* Física de enfoque unificada (Glow Effect) de AGUSTIN */
        "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
        /* Estado Deshabilitado */
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-surface/50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center text-current"
      >
        {/* Indicador vectorial centrado ópticamente */}
        <Circle className="size-2 fill-accent text-accent" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
