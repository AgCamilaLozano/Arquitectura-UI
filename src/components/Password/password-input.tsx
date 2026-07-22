"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";
import { Button } from "@/src/primitives/button/button";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, disabled, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full rounded-sm border border-border bg-transparent px-3 py-1 pr-10",
          "font-sans text-body-dense text-sm text-text-primary placeholder:text-text-secondary/70 transition-all duration-150 outline-none",
          /* Física de Enfoque Unificada (Glow Effect de AGUSTIN) */
          "focus-visible:outline-none focus-visible:border-border-strong focus-visible:ring-3 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
          /* Estados Deshabilitados */
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface/50",
          className
        )}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={showPassword}
        className={cn(
          "absolute right-0 top-0 size-9 text-text-secondary hover:text-text-primary hover:bg-transparent",
          "focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-0 rounded-r-sm",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        {showPassword ? (
          <span className="text-xs leading-none">○</span>
        ) : (
          <span className="text-xs leading-none">◉</span>
        )}
        <span className="sr-only">
          {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        </span>
      </Button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";