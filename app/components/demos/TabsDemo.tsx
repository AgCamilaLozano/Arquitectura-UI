"use client";

import { useState } from "react";
import { Tabs } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const VARIANTS = ["underline", "pill", "card"] as const;

export function TabsDemo() {
  const [variant, setVariant] = useState<string>("pill");

  return (
    <ComponentShowcase title="Tabs" description="Navegacion por pestanas con variantes configurables">
      <div className="w-full space-y-4">
        <Tabs
          variant={variant as never}
          defaultTab="overview"
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: <p className="p-2 text-sm text-text-secondary">Vista general del componente con metricas clave y resumen de funcionalidades.</p>,
            },
            {
              id: "code",
              label: "Code",
              content: <p className="p-2 text-sm text-text-secondary">Codigo fuente del componente con ejemplos de uso y snippets listos para copiar.</p>,
            },
            {
              id: "props",
              label: "Props",
              content: <p className="p-2 text-sm text-text-secondary">Documentacion completa de propiedades, tipos de datos y valores por defecto.</p>,
            },
            {
              id: "a11y",
              label: "Accessibility",
              content: <p className="p-2 text-sm text-text-secondary">Guia de accesibilidad: navegacion por teclado, ARIA roles y soporte para lectores de pantalla.</p>,
            },
          ]}
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
