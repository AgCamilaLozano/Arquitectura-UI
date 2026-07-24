"use client";

import { useState } from "react";
import { Separator } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function SeparatorDemo() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  return (
    <ComponentShowcase title="Separator" description="Linea divisoria visual entre contenidos">
      {orientation === "horizontal" ? (
        <div className="w-full space-y-3">
          <p className="text-sm text-text-secondary">Contenido arriba</p>
          <Separator orientation="horizontal" />
          <p className="text-sm text-text-secondary">Contenido abajo</p>
        </div>
      ) : (
        <div className="flex items-center gap-4 h-16">
          <p className="text-sm text-text-secondary">Izquierda</p>
          <Separator orientation="vertical" />
          <p className="text-sm text-text-secondary">Derecha</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">orientation</label>
          <select value={orientation} onChange={(e) => setOrientation(e.target.value as "horizontal" | "vertical")} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
