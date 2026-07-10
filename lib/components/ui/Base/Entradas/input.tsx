"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-secondary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted font-sans transition-all duration-200 shadow-xs",
  {
    variants: {
      variant: {
        default: "border-default focus-visible:border-accent focus-visible:ring-border-strong/20",
        destructive: "border-error focus-visible:border-text-error focus-visible:ring-ring-error/20 text-text-error placeholder:text-text-error/50",
      },
      withIcon: {
        none: "px-3",
        left: "pl-10 pr-3",
        right: "pl-3 pr-10",
        both: "px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      withIcon: "none",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant, iconLeft, iconRight, containerClassName, ...props }, ref) => {
    
    const iconPosition = iconLeft && iconRight ? "both" : iconLeft ? "left" : iconRight ? "right" : "none";

    return (
      <div className={cn("relative w-full flex items-center text-text-primary", containerClassName)}>
        
        {/* Icono Izquierdo */}
        {iconLeft && (
          <div 
            className={cn(
              "absolute left-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4 transition-colors duration-200",
              variant === "destructive" && "text-text-error"
            )}
            aria-hidden="true"
          >
            {iconLeft}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={inputVariants({ 
            variant, 
            withIcon: iconPosition, 
            className 
          })}
          aria-invalid={variant === "destructive" || undefined}
          {...props}
        />

        {/* Icono Derecho */}
        {iconRight && (
          <div 
            className={cn(
              "absolute right-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4 transition-colors duration-200",
              variant === "destructive" && "text-text-error"
            )}
            aria-hidden="true"
          >
            {iconRight}
          </div>
        )}
        
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };