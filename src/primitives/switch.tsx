"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/src/utils/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        /* Estructura base, geometría circular y cursor */
        "peer group/switch inline-flex shrink-0 items-center rounded-full border transition-all duration-200 select-none outline-none cursor-pointer shadow-xs",
        /* Estado Unchecked: Superficie neutra con borde sutil */
        "data-[state=unchecked]:bg-surface data-[state=unchecked]:border-border",
        /* Estado Checked: Color de acento del tenant */
        "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
        /* Anillo de enfoque unificado (Glow Effect) de AGUSTIN */
        "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
        /* Estado Deshabilitado */
        "disabled:cursor-not-allowed disabled:opacity-40 data-[disabled]:opacity-40",
        /* Escala de dimensiones de la pista */
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          /* Geometría de la perilla y sombras */
          "pointer-events-none block rounded-full bg-accent-foreground/90 shadow-xs ring-0 transition-transform duration-200",
          /* Dimensiones de la perilla según el tamaño */
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          /* Posición inactiva (Unchecked) */
          "data-[state=unchecked]:translate-x-0.5",
          /* Posición activa (Checked) según tamaño */
          "group-data-[size=default]/switch:data-[state=checked]:translate-x-[16px]",
          "group-data-[size=sm]/switch:data-[state=checked]:translate-x-[12px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };