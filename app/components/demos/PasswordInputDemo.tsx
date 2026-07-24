"use client";

import { useState } from "react";
import { PasswordInput } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function PasswordInputDemo() {
  const [placeholder, setPlaceholder] = useState("Ingresa tu contrasena");
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentShowcase title="PasswordInput" description="Campo de contrasena con toggle de visibilidad">
      <PasswordInput placeholder={placeholder} disabled={disabled} className="w-[280px]" />

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">placeholder</label>
          <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">disabled</label>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
