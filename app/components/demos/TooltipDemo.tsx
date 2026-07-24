"use client";

import { useState } from "react";
import { Tooltip, Button } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const SIDES = ["top", "bottom", "left", "right"] as const;

export function TooltipDemo() {
  const [side, setSide] = useState<string>("top");
  const [content, setContent] = useState("Este es un tooltip");

  return (
    <ComponentShowcase title="Tooltip" description="Informacion contextual al hacer hover">
      <div className="flex h-20 items-center justify-center">
        <Tooltip content={content} side={side as never}>
          <Button variant="outline" size="sm">Hover me</Button>
        </Tooltip>
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">side</label>
          <select value={side} onChange={(e) => setSide(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {SIDES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">content</label>
          <input value={content} onChange={(e) => setContent(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
