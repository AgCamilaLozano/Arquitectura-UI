"use client";

import { cn } from "@/src/utils/utils";

interface PasswordStrengthProps {
  password: string;
}

const rules = [
  { label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Al menos una mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Al menos un número", test: (p: string) => /\d/.test(p) },
];

export function isPasswordValid(password: string): boolean {
  return rules.every((rule) => rule.test(password));
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  return (
    <ul className="space-y-1 text-sm">
      {rules.map((rule) => {
        const passes = rule.test(password);
        return (
          <li
            key={rule.label}
            className={cn(
              "flex items-center gap-2 transition-colors",
              passes ? "text-text-success" : "text-text-secondary"
            )}
          >
            {passes ? (
              <span className="text-xs leading-none font-bold w-3.5 text-center">✓</span>
            ) : (
              <span className="text-xs leading-none font-bold w-3.5 text-center">×</span>
            )}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
