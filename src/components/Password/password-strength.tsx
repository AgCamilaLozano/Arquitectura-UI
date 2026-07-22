"use client";

import { cn } from "@/src/utils/utils";
import * as React from "react";

/* ==========================================================================
   TIPOS & REGLAS DE VALIDACIÓN DE CONTRASEÑA
   ========================================================================== */

export interface PasswordRule {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

export const DEFAULT_PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "Mínimo 8 caracteres",
    test: (p: string) => p.length >= 8,
  },
  {
    id: "uppercase",
    label: "Al menos una mayúscula",
    test: (p: string) => /[A-Z]/.test(p),
  },
  {
    id: "number",
    label: "Al menos un número",
    test: (p: string) => /\d/.test(p),
  },
];

export function isPasswordValid(
  password: string,
  rules: PasswordRule[] = DEFAULT_PASSWORD_RULES
): boolean {
  return rules.every((rule) => rule.test(password));
}

export interface PasswordStrengthProps
  extends React.HTMLAttributes<HTMLUListElement> {
  password: string;
  customRules?: PasswordRule[];
}

/* ==========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================== */

export function PasswordStrength({
  password,
  customRules,
  className,
  ...props
}: PasswordStrengthProps) {
  const activeRules = customRules ?? DEFAULT_PASSWORD_RULES;

  return (
    <ul
      className={cn("space-y-1.5 font-sans text-caption", className)}
      aria-live="polite"
      {...props}
    >
      {activeRules.map((rule) => {
        const passes = rule.test(password);

        return (
          <li
            key={rule.id ?? rule.label}
            className={cn(
              "flex items-center gap-2 transition-colors duration-150 font-medium",
              passes ? "text-success" : "text-text-secondary/80"
            )}
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full transition-colors duration-150",
                passes
                  ? "bg-success/15 text-success"
                  : "bg-surface text-text-secondary/60 border border-border"
              )}
              aria-hidden="true"
            >
              {passes ? (
                <span className="text-xs leading-none font-bold w-3.5 text-center">✓</span>
              ) : (
                <span className="text-xs leading-none font-bold w-3.5 text-center">×</span>
              )}
            </span>
            <span>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}


