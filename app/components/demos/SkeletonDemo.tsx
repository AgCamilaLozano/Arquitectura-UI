"use client";

import { useState } from "react";
import { Skeleton } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function SkeletonDemo() {
  const [lines, setLines] = useState(3);

  return (
    <ComponentShowcase title="Skeleton" description="Placeholder animado de carga">
      <div className="w-[300px] space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-full" style={{ width: `${100 - i * 15}%` }} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">lines: {lines}</label>
          <input type="range" min={1} max={6} value={lines} onChange={(e) => setLines(Number(e.target.value))} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
