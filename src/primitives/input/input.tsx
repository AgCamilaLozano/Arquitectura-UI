"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/utils/utils";

const inputVariants = cva(
  /* Alineación con la tipografía Lato, altura densa ERP y física de enfoque unificada AGUSTIN */
  "flex w-full rounded-[var(--radius-sm)] border bg-background text-body-dense text-text-primary font-sans transition-all duration-200 shadow-xs " +
  "file:border-0 file:bg-transparent file:text-body-dense file:font-medium file:text-text-secondary " +
  "placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface/50",
  {
    variants: {
      variant: {
        /* CORREGIDO: Uso de border-border-default y Glow Effect oficial de AGUSTIN */
        default:
          "border-border-default focus-visible:border-border-strong focus-visible:ring-border-strong/20",
        
        /* CORREGIDO: Uso de tokens de estado destructivo/error acordes a globals.css */
        destructive:
          "border-destructive text-text-error placeholder:text-text-error/50 focus-visible:border-text-error focus-visible:ring-ring-error/20",
      },
      inputSize: {
        default: "h-9 py-1.5", // Calibrado a 36px (estándar de densidad ERP)
        sm: "h-8 py-1 text-caption",
        lg: "h-10 py-2 text-body-base",
      },
      withIcon: {
        none: "px-3",
        left: "pl-9 pr-3",
        right: "pl-3 pr-9",
        both: "px-9",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
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
  (
    {
      className,
      type = "text",
      variant,
      inputSize,
      iconLeft,
      iconRight,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const iconPosition =
      iconLeft && iconRight
        ? "both"
        : iconLeft
        ? "left"
        : iconRight
        ? "right"
        : "none";

    return (
      <div
        className={cn(
          "relative w-full flex items-center text-text-primary",
          containerClassName
        )}
      >
        {/* Icono Izquierdo */}
        {iconLeft && (
          <div
            className={cn(
              "absolute left-2.5 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4 transition-colors duration-200",
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
          className={cn(
            inputVariants({
              variant,
              inputSize,
              withIcon: iconPosition,
              className,
            })
          )}
          aria-invalid={variant === "destructive" || undefined}
          {...props}
        />

        {/* Icono Derecho */}
        {iconRight && (
          <div
            className={cn(
              "absolute right-2.5 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4 transition-colors duration-200",
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