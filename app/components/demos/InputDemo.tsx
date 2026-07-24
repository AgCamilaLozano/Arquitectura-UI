"use client";

import { useState } from "react";
import { Input } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function InputDemo() {
  const [placeholder, setPlaceholder] = useState("Escribe algo...");
  const [disabled, setDisabled] = useState(false);
  const [type, setType] = useState("text");

  return (
    <ComponentShowcase title="Input" description="Campo de entrada de texto">
      <Input placeholder={placeholder} disabled={disabled} type={type} className="w-[280px]" />

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">placeholder</label>
          <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            <option value="text">text</option>
            <option value="email">email</option>
            <option value="number">number</option>
            <option value="password">password</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">disabled</label>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
