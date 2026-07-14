"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";
import { Button } from "@/src/primitives/button/button";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 pr-10 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 size-9 text-text-secondary hover:text-text-primary"
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={-1}
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

export { PasswordInput };
