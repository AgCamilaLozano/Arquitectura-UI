"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import GraficaBar from "@/lib/components/ui/DataDisplay/Graficas/GraficaBar";
import GraficaDonut from "@/lib/components/ui/DataDisplay/Graficas/GraficaDonut";
import GraficaLine from "@/lib/components/ui/DataDisplay/Graficas/GraficaLine";

const barData = [
  { label: "Ene", value: 420 },
  { label: "Feb", value: 310 },
  { label: "Mar", value: 520 },
  { label: "Abr", value: 410 },
  { label: "May", value: 590 },
];

const donutData = [
  { label: "Ventas", value: 35 },
  { label: "Marketing", value: 25 },
  { label: "Soporte", value: 20 },
  { label: "Infra", value: 20 },
];

const lineData = [
  { label: "Lun", value: 30 },
  { label: "Mar", value: 70 },
  { label: "Mié", value: 45 },
  { label: "Jue", value: 90 },
  { label: "Vie", value: 60 },
];

export function ChartsSection() {
  return (
    <SectionLayout id="charts" title="Gráficas" description="Gráficas SVG puras: barra, donut y línea.">
      <ComponentDemo
        name="GraficaBar"
        description="Gráfica de barras vertical con labels y eje Y"
        props={[
          { name: "data", type: '{ label: string; value: number }[]', description: "Datos (requerido)" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "height", type: "number", default: "240" },
          { name: "barRadius", type: "number", default: "4" },
        ]}
        code={`import GraficaBar from "@agustin/ui/components";

<GraficaBar
  title="Ventas mensuales"
  description="Valores en miles"
  data={[
    { label: "Ene", value: 420 },
    { label: "Feb", value: 310 },
  ]}
/>`}
      >
        <GraficaBar title="Ventas mensuales" description="Valores en miles" data={barData} />
      </ComponentDemo>

      <ComponentDemo
        name="GraficaDonut"
        description="Gráfica de dona con tooltip hover y total central"
        props={[
          { name: "data", type: '{ value: number; label: string; color?: string }[]', description: "Datos (requerido)" },
          { name: "size", type: "number", default: "300" },
          { name: "strokeWidth", type: "number", default: "40" },
          { name: "showTotal", type: "boolean", default: "true" },
        ]}
        code={`import GraficaDonut from "@agustin/ui/components";

<GraficaDonut
  title="Distribución"
  description="Porcentaje por categoría"
  data={[
    { label: "Ventas", value: 35 },
    { label: "Marketing", value: 25 },
  ]}
/>`}
      >
        <GraficaDonut
          title="Distribución"
          description="Porcentaje por categoría"
          data={donutData}
        />
      </ComponentDemo>

      <ComponentDemo
        name="GraficaLine"
        description="Gráfica de línea con área opcional"
        props={[
          { name: "data", type: '{ label: string; value: number }[]', description: "Datos (requerido)" },
          { name: "height", type: "number", default: "240" },
          { name: "showArea", type: "boolean", default: "true" },
          { name: "legendLabel", type: "string" },
        ]}
        code={`import GraficaLine from "@agustin/ui/components";

<GraficaLine
  title="Tendencia semanal"
  data={lineData}
  showArea
  legendLabel="Usuarios"
/>`}
      >
        <GraficaLine
          title="Tendencia semanal"
          description="Interacción por día"
          data={lineData}
          showArea
          legendLabel="Usuarios"
        />
      </ComponentDemo>
    </SectionLayout>
  );
}
