"use client";

import { useState } from "react";
import { LabelBadge } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const COLORS = ["neutral", "accent", "success", "error", "warning", "info"] as const;
const VARIANTS = ["filled", "soft", "outline"] as const;

export function LabelBadgeDemo() {
  const [color, setColor] = useState<string>("accent");
  const [variant, setVariant] = useState<string>("soft");
  const [label, setLabel] = useState("Badge");

  return (
    <ComponentShowcase title="LabelBadge" description="Etiqueta con color para clasificar estados">
      <div className="flex items-center gap-2">
        {COLORS.map((c) => (
          <LabelBadge key={c} label={c} color={c} variant={variant as never} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">label</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">color</label>
          <select value={color} onChange={(e) => setColor(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
