"use client";

import { useState } from "react";
import { Textarea } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function TextareaDemo() {
  const [placeholder, setPlaceholder] = useState("Escribe un mensaje...");
  const [rows, setRows] = useState(3);
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentShowcase title="Textarea" description="Area de texto multilinea">
      <Textarea placeholder={placeholder} rows={rows} disabled={disabled} className="w-[280px]" />

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">placeholder</label>
          <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">rows: {rows}</label>
          <input type="range" min={1} max={8} value={rows} onChange={(e) => setRows(Number(e.target.value))} className="block accent-accent" />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">disabled</label>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
