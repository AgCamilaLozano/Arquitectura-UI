import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../../utils";

// 1. Definimos las variantes del Input con CVA
const inputVariants = cva(
    "file:text-text-secondary placeholder:text-text-muted selection:bg-accent-soft selection:text-accent h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    {
        variants: {
            variant: {
                default: "border-border focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
                destructive: "border-text-error focus:border-text-error focus:shadow-[0_0_0_3px_rgba(231,0,11,0.15)] text-text-error placeholder:text-text-error/50",
            },
            withIcon: {
                none: "px-3",
                left: "pl-10 pr-3",
                right: "pl-3 pr-10",
                both: "px-10",
            }
        },
        defaultVariants: {
            variant: "default",
            withIcon: "none",
        },
    }
);

// 2. Añadimos containerClassName para controlar el div exterior desde fuera
export interface InputProps
    extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    containerClassName?: string; // <-- Prop clave añadido
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", variant, iconLeft, iconRight, containerClassName, ...props }, ref) => {
        
        const iconPosition = iconLeft && iconRight ? "both" : iconLeft ? "left" : iconRight ? "right" : "none";

        return (
            /* CAMBIO CLAVE: Usamos cn() para fusionar estilos. 
              Por defecto es w-full, pero si le pasas otra medida por containerClassName, se adaptará.
            */
            <div className={cn("relative RussoOne-Normal w-full flex items-center", containerClassName)}>
                
                {/* Icono Izquierdo */}
                {iconLeft && (
                    <div className={cn(
                        "absolute left-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4",
                        variant === "destructive" && "text-text-error"
                    )}>
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
                        className // Aplica las clases solo al tag <input> nativo
                    })}
                    aria-invalid={variant === "destructive" || undefined}
                    {...props}
                />

                {/* Icono Derecho */}
                {iconRight && (
                    <div className={cn(
                        "absolute right-3 flex items-center justify-center pointer-events-none text-text-muted [&_svg]:size-4",
                        variant === "destructive" && "text-text-error"
                    )}>
                        {iconRight}
                    </div>
                )}
                
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input, inputVariants };