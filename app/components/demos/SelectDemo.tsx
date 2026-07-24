"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const OPTIONS = [
  { value: "1", label: "Argentina" },
  { value: "2", label: "Brasil" },
  { value: "3", label: "Chile" },
  { value: "4", label: "Colombia" },
  { value: "5", label: "Mexico" },
];

export function SelectDemo() {
  const [placeholder, setPlaceholder] = useState("Seleccionar pais");

  return (
    <ComponentShowcase title="Select" description="Selector desplegable de opciones">
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">placeholder</label>
          <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
