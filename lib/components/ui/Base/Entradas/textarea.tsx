import React from 'react';
import { cn } from '../../../../utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "w-full min-h-[80px] px-3 py-2 border border-border rounded-md text-sm bg-transparent placeholder:text-text-muted transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
                    "aria-invalid:ring-text-error/20 dark:aria-invalid:ring-text-error/40 aria-invalid:border-text-error",
                    className
                )}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };