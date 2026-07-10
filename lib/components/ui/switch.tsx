"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-colors duration-200 outline-none cursor-pointer",
        "data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted",
        "focus-visible:ring-[3px] focus-visible:ring-accent-soft focus-visible:border-accent",
        "disabled:cursor-not-allowed disabled:opacity-30 data-[disabled]:opacity-30",
        "data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white  pointer-events-none block rounded-full shadow-xs ring-0 transition-transform duration-200 math-rendering-fallback",
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "data-[state=unchecked]:translate-x-0.5",
          "group-data-[size=default]/switch:data-[state=checked]:translate-x-[16px]",
          "group-data-[size=sm]/switch:data-[state=checked]:translate-x-[12px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }