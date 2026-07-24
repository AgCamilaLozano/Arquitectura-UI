"use client";

import { GraficaBar } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const BAR_DATA = [
  { label: "Ene", value: 40 },
  { label: "Feb", value: 65 },
  { label: "Mar", value: 50 },
  { label: "Abr", value: 80 },
  { label: "May", value: 70 },
  { label: "Jun", value: 90 },
];

export function GraficaBarDemo() {
  return (
    <ComponentShowcase title="GraficaBar" description="Grafica de barras vertical para comparar valores">
      <div className="w-full">
        <GraficaBar
          data={BAR_DATA}
          title="Ventas mensuales"
          description="Comparativa de ingresos por mes"
          height={200}
        />
      </div>
    </ComponentShowcase>
  );
}
