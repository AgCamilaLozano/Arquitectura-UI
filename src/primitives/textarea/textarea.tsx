"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/utils/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted font-sans transition-all duration-200 shadow-xs resize-y",
  {
    variants: {
      variant: {
        /* Sincronización exacta con el comportamiento óptico de producción en AGUSTIN */
        default: "border-border focus-visible:border-accent focus-visible:ring-border-strong/20",
        destructive: "border-error focus-visible:border-text-error focus-visible:ring-ring-error/20 text-text-error placeholder:text-text-error/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, className }))}
        aria-invalid={variant === "destructive" || undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };