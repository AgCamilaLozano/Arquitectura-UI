"use client";

import { GraficaDonut } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const DONUT_DATA = [
  { label: "Ventas", value: 400 },
  { label: "Marketing", value: 300 },
  { label: "IT", value: 200 },
  { label: "RRHH", value: 100 },
];

export function GraficaDonutDemo() {
  return (
    <ComponentShowcase title="GraficaDonut" description="Grafica circular tipo donut para distribuciones">
      <div className="w-full">
        <GraficaDonut
          data={DONUT_DATA}
          title="Distribucion por area"
          description="Porcentaje de presupuesto asignado"
          size={300}
          showTotal
        />
      </div>
    </ComponentShowcase>
  );
}
