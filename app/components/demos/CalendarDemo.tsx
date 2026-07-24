"use client";

import { useState } from "react";
import { Calendar } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function CalendarDemo() {
  const [variant, setVariant] = useState<"full" | "input">("input");
  const [selectionMode, setSelectionMode] = useState<"date" | "month" | "year">("date");

  return (
    <ComponentShowcase title="Calendar" description="Calendario con seleccion de fecha, mes o anio">
      <div className="w-full">
        <Calendar
          variant={variant}
          selectionMode={selectionMode}
          placeholder="Seleccionar fecha"
          label="Fecha"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value as "full" | "input")} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            <option value="full">full</option>
            <option value="input">input</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">selectionMode</label>
          <select value={selectionMode} onChange={(e) => setSelectionMode(e.target.value as "date" | "month" | "year")} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            <option value="date">date</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
