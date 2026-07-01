'use client'
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity disabled:cursor-not-allowed rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-accent-soft/50 focus-visible:ring-[3px] aria-invalid:ring-text-error/20 dark:aria-invalid:ring-text-error/40 aria-invalid:border-text-error",
    {
        variants: {
            variant: {
                default: "bg-accent text-white",
                outline:
                    "border bg-background border-border shadow-xs hover:bg-text-muted/10",
                secondary:
                    "bg-muted/90 text-secondary dark:text-primary shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)]",
                ghost:
                    "hover:bg-text-muted/10 hover:text-text-primary text-text-secondary",
                link:
                    "text-text-secondary hover:text-accent dark:hover:text-accent underline-offset-6 decoration-accent hover:underline",
                destructive: 
                    "bg-text-error text-white hover:bg-text-error/90",
            },
            size: {
                default: "h-9 px-4 py-1 text-[12.5px]",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-sm",
                icon: "size-9",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
            },

        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },

    });

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, className })}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };