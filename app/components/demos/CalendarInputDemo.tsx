"use client";

import { useState } from "react";
import { DatePickerInput } from "@/src/components/date-picker-input";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function CalendarInputDemo() {
  const [value, setValue] = useState<Date | undefined>(undefined);
  const [placeholder, setPlaceholder] = useState("Seleccionar fecha");
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentShowcase title="CalendarInput" description="Selector de fecha con popover y formato localizado">
      <div className="w-[300px]">
        <DatePickerInput
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>

      {value && (
        <span className="rounded-sm bg-accent-soft px-2 py-1 text-xs text-accent font-semibold">
          {value.toLocaleDateString("es-AR")}
        </span>
      )}

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
