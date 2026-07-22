"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/utils/utils";

const buttonVariants = cva(
  /* Implementación de la física de enfoque unificada (Glow Effect) de AGUSTIN y tipografía Lato */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-body-dense font-sans font-medium transition-all duration-200 select-none outline-none " +
  "focus-visible:outline-none focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0 " +
  "disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        /* CORREGIDO: default consume los tokens semánticos de marca (accent y accent-foreground) */
        default:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-xs active:scale-[0.98]",

        /* CORREGIDO: outline utiliza el delimitador semántico border-border-default */
        outline:
          "border border-border bg-background text-text-primary hover:bg-surface shadow-xs active:scale-[0.98]",

        secondary:
          "bg-surface text-text-primary hover:bg-surface/80 border border-border shadow-xs active:scale-[0.98]",

        ghost:
          "text-text-secondary hover:bg-surface hover:text-text-primary",

        link:
          "text-accent hover:text-accent/90 underline-offset-4 hover:underline decoration-accent p-0 h-auto font-normal",

        /* CORREGIDO: destructive usa tokens semánticos de alerta/estado destructivo */
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs focus-visible:ring-ring-error/20 active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2 text-[14px]", 
        sm: "h-8 rounded-sm px-3 gap-1.5 text-[12.5px]",
        lg: "h-11 rounded-md px-6 text-[16px]",
        icon: "h-9 w-9 p-0",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };