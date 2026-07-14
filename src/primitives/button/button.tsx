"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/utils/utils";

const buttonVariants = cva(
  /* CORREGIDO: Implementación de la física de enfoque unificada (Glow Effect) de AGUSTIN */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 select-none outline-none " +
  "focus-visible:outline-none focus-visible:border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0 " +
  "disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        /* CORREGIDO: default consume el acento dinámico de la empresa y se adapta automáticamente */
        default: "bg-accent text-white hover:bg-accent/90 shadow-xs active:scale-[0.98]",
        
        /* CORREGIDO: outline utiliza el delimitador semántico border-border */
        outline: "border border-border bg-background text-text-primary hover:bg-muted/50 hover:text-text-primary shadow-xs active:scale-[0.98]",
        
        secondary: "bg-muted text-text-primary hover:bg-muted/80 shadow-xs active:scale-[0.98]",
        
        ghost: "text-text-secondary hover:bg-muted hover:text-text-primary",
        
        link: "text-accent hover:text-accent/90 underline-offset-4 hover:underline decoration-accent",
        
        destructive: "bg-text-error text-white hover:bg-text-error/95 shadow-xs focus-visible:ring-ring-error/20 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs gap-1.5",
        lg: "h-11 rounded-md px-6 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };