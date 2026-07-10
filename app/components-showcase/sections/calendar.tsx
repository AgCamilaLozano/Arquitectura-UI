"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Calendar } from "@/lib/components/ui/Compuesto/Calendario";

export function CalendarSection() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [month, setMonth] = useState<Date | null>(null);
  const [year, setYear] = useState<Date | null>(null);

  return (
    <SectionLayout id="calendar" title="Calendario" description="Calendar con modos full e input, y DateRangePicker.">
      <ComponentDemo
        name="Calendar - Full"
        description="Calendario inline con selección de fecha"
        props={[
          { name: "variant", type: '"full" | "input"', default: '"full"' },
          { name: "selectionMode", type: '"date" | "month" | "year"', default: '"date"' },
          { name: "value", type: "Date | null" },
          { name: "onChange", type: "(date: Date | null) => void" },
          { name: "minDate", type: "Date" },
          { name: "maxDate", type: "Date" },
        ]}
        code={`import { Calendar } from "@agustin/ui/components";

<Calendar
  variant="full"
  value={date}
  onChange={setDate}
  selectionMode="date"
  minDate={new Date(2023, 0, 1)}
  maxDate={new Date(2026, 11, 31)}
/>`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase">Modo fecha</p>
            <Calendar
              variant="full"
              value={date}
              onChange={setDate}
              selectionMode="date"
              minDate={new Date(2023, 0, 1)}
              maxDate={new Date(2026, 11, 31)}
            />
            <p className="text-xs text-text-muted">
              Seleccionado: {date ? date.toLocaleDateString("es-CO") : "Ninguna"}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-text-muted uppercase">Modo mes</p>
              <Calendar
                variant="full"
                value={month}
                onChange={setMonth}
                selectionMode="month"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-text-muted uppercase">Modo año</p>
              <Calendar
                variant="full"
                value={year}
                onChange={setYear}
                selectionMode="year"
              />
            </div>
          </div>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
