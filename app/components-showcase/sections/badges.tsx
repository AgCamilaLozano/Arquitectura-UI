"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { LabelBadge } from "@/lib/components/ui/Compuesto/Badges";

const colors = ["neutral", "accent", "success", "error", "warning", "info"] as const;
const variants = ["filled", "soft", "outline"] as const;

export function BadgesSection() {
  return (
    <SectionLayout id="badges" title="Badges & Labels" description="LabelBadge con 6 colores × 3 variantes, y Label de Radix.">
      <ComponentDemo
        name="LabelBadge"
        description="Badges con colores y variantes configurables"
        props={[
          { name: "label", type: "string", description: "Texto del badge (requerido)" },
          { name: "color", type: '"neutral" | "accent" | "success" | "error" | "warning" | "info"', default: '"neutral"', description: "Color del badge" },
          { name: "variant", type: '"filled" | "soft" | "outline"', default: '"soft"', description: "Estilo visual" },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"sm"', description: "Tamaño" },
          { name: "icon", type: "ReactNode", description: "Icono opcional" },
          { name: "onRemove", type: "() => void", description: "Muestra botón de cerrar" },
        ]}
        code={`import { LabelBadge } from "@agustin/ui/components";

<LabelBadge label="Nuevo" color="accent" variant="filled" />
<LabelBadge label="Revisión" color="warning" variant="soft" />
<LabelBadge label="Activo" color="success" variant="outline" />
<LabelBadge label="Error" color="error" variant="filled" />
<LabelBadge label="Info" color="info" variant="soft" />`}
      >
        <div className="space-y-4">
          {variants.map((v) => (
            <div key={v} className="space-y-2">
              <p className="text-xs font-medium text-text-muted uppercase">{v}</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <LabelBadge key={c} label={c} color={c} variant={v} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Tamaños"
        description="3 tamaños disponibles para LabelBadge"
        code={`<LabelBadge label="Small" size="sm" />
<LabelBadge label="Medium" size="md" />
<LabelBadge label="Large" size="lg" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <LabelBadge label="Small" size="sm" color="accent" />
          <LabelBadge label="Medium" size="md" color="accent" />
          <LabelBadge label="Large" size="lg" color="accent" />
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Con onRemove"
        description="Badge con botón de eliminación"
        code={`<LabelBadge label="Cerrar" color="error" onRemove={() => alert("Removido")} />`}
      >
        <div className="flex flex-wrap gap-2">
          <LabelBadge label="Cerrable" color="error" onRemove={() => alert("Removido")} />
          <LabelBadge label="También" color="warning" variant="filled" onRemove={() => alert("Removido")} />
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
