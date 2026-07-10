"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Tabs } from "@/lib/components/ui/DataDisplay/Tabs";
import type { TabItem } from "@/lib/components/ui/DataDisplay/Tabs";

const simpleTabs: TabItem[] = [
  { id: "tab1", label: "General", content: <p className="text-sm text-text-secondary">Contenido de la pestaña General.</p> },
  { id: "tab2", label: "Detalles", content: <p className="text-sm text-text-secondary">Información detallada aquí.</p> },
  { id: "tab3", label: "Configuración", content: <p className="text-sm text-text-secondary">Opciones de configuración.</p> },
];

export function TabsSection() {
  return (
    <SectionLayout id="tabs" title="Tabs" description="Navegación por pestañas con 3 variantes visuales.">
      <ComponentDemo
        name="Variantes de Tabs"
        description="underline (default), pill y card"
        props={[
          { name: "tabs", type: "TabItem[]", description: "Items de las pestañas (requerido)" },
          { name: "defaultTab", type: "string", description: "ID de la pestaña activa por defecto" },
          { name: "variant", type: '"underline" | "pill" | "card"', default: '"underline"' },
          { name: "align", type: '"start" | "center" | "end" | "stretch"', default: '"start"' },
        ]}
        code={`import { Tabs } from "@agustin/ui/components";

<Tabs
  variant="underline"
  tabs={[
    { id: "tab1", label: "General", content: <p>Contenido</p> },
    { id: "tab2", label: "Detalles", content: <p>Otro contenido</p> },
  ]}
/>`}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase">Underline</p>
            <Tabs tabs={simpleTabs} defaultTab="tab1" variant="underline" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase">Pill</p>
            <Tabs tabs={simpleTabs} defaultTab="tab1" variant="pill" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase">Card</p>
            <Tabs tabs={simpleTabs} defaultTab="tab1" variant="card" />
          </div>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
