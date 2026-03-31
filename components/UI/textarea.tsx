"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "w-full px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-3 focus:ring-border-strong/50 focus:border-transparent resize-none transition-all duration-200",
                    className
                )}
                {...props}
            />
        )
    }
)

Textarea.displayName = "Textarea"

export { Textarea }