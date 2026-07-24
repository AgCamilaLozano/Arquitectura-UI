"use client";

import { useState } from "react";
import { Button } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const VARIANTS = ["default", "outline", "secondary", "ghost", "link", "destructive"] as const;
const SIZES = ["default", "sm", "lg", "icon"] as const;

export function ButtonDemo() {
  const [variant, setVariant] = useState<string>("default");
  const [size, setSize] = useState<string>("default");
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState("Button");

  return (
    <ComponentShowcase title="Button" description="Botones con variantes y tamanios">
      <Button variant={variant as never} size={size as never} disabled={disabled}>
        {text}
      </Button>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">disabled</label>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="block accent-accent" />
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
