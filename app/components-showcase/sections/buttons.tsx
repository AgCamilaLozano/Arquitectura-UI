"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Button } from "@/lib/components/ui/Base/Entradas";

const variants = ["default", "outline", "secondary", "ghost", "link", "destructive"] as const;
const sizes = ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"] as const;
import { Plus, Trash2 } from "lucide-react";

export function ButtonsSection() {
  return (
    <SectionLayout id="buttons" title="Botones" description="Componente Button con múltiples variantes y tamaños.">
      <ComponentDemo
        name="Variantes"
        description="6 variantes visuales disponibles"
        props={[
          { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive"', default: '"default"', description: "Estilo visual del botón" },
          { name: "size", type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"', default: '"default"', description: "Tamaño del botón" },
          { name: "asChild", type: "boolean", default: "false", description: "Renderiza como Slot child" },
        ]}
        code={`import { Button } from "@agustin/ui/components";

<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Tamaños"
        description="4 tamaños disponibles + 3 tamaños de icono"
        code={`<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>
<Button size="icon-sm"><Plus /></Button>
<Button size="icon-lg"><Plus /></Button>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="default">Default</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="size-4" /></Button>
          <Button size="icon-sm"><Plus className="size-3" /></Button>
          <Button size="icon-lg"><Plus className="size-5" /></Button>
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Con iconos"
        description="Botones con iconos integrados"
        code={`<Button variant="default"><Plus className="size-4" /> Agregar</Button>
<Button variant="destructive"><Trash2 className="size-4" /> Eliminar</Button>`}
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="default"><Plus className="size-4" /> Agregar</Button>
          <Button variant="outline"><Plus className="size-4" /> Nuevo registro</Button>
          <Button variant="destructive"><Trash2 className="size-4" /> Eliminar</Button>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
