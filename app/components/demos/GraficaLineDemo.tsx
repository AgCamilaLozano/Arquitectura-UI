"use client";

import { GraficaLine } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const LINE_DATA = [
  { label: "Lun", value: 12 },
  { label: "Mar", value: 19 },
  { label: "Mie", value: 15 },
  { label: "Jue", value: 25 },
  { label: "Vie", value: 22 },
  { label: "Sab", value: 30 },
  { label: "Dom", value: 18 },
];

export function GraficaLineDemo() {
  return (
    <ComponentShowcase title="GraficaLine" description="Grafica de lineas para tendencias temporales">
      <div className="w-full">
        <GraficaLine
          data={LINE_DATA}
          title="Visitas diarias"
          description="Trafico de la ultima semana"
          height={200}
          showArea
        />
      </div>
    </ComponentShowcase>
  );
}
