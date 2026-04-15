'use client'
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../../../../lib/utils'


// Textarea Reutilizable
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "w-full px-3 py-1 border border-border rounded-md text-sm",
                    "focus:outline-none focus:shadow-[0_0_0_3px_var(--accent-soft)] focus:border-accent resize-none transition-all duration-200",
                    className
                )}
                {...props}
            />
        )
    }
)

Textarea.displayName = "Textarea"

export { Textarea }