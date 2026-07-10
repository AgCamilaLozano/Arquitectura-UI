"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Tooltip } from "@/lib/components/ui/Compuesto/Tooltip";
import { Button } from "@/lib/components/ui/Base/Entradas";
import { Info } from "lucide-react";

export function TooltipSection() {
  return (
    <SectionLayout id="tooltip" title="Tooltip" description="Tooltip flotante con 2 variantes y 4 posiciones.">
      <ComponentDemo
        name="Tooltip"
        description="Tooltip default y rich, con 4 posiciones"
        props={[
          { name: "content", type: "ReactNode", description: "Contenido del tooltip (requerido)" },
          { name: "children", type: "ReactNode", description: "Elemento trigger (requerido)" },
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"top"' },
          { name: "variant", type: '"default" | "rich"', default: '"default"' },
          { name: "disabled", type: "boolean", default: "false" },
        ]}
        code={`import { Tooltip } from "@agustin/ui/components";

<Tooltip content="Tooltip simple" side="bottom">
  <Button>Hover me</Button>
</Tooltip>

<Tooltip content={<div><strong>Rich</strong><p>Con contenido complejo</p></div>} variant="rich">
  <Button>Rich tooltip</Button>
</Tooltip>`}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            {(["top", "bottom", "left", "right"] as const).map((side) => (
              <Tooltip key={side} content={`Tooltip en ${side}`} side={side}>
                <Button variant="outline" size="sm">{side}</Button>
              </Tooltip>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Tooltip default con texto largo para ver el wrapping" variant="default">
              <Button variant="secondary" size="sm">Default</Button>
            </Tooltip>
            <Tooltip
              content={
                <div className="space-y-1">
                  <p className="font-semibold">Tooltip Rich</p>
                  <p className="text-xs opacity-80">Con contenido más complejo y estilizado.</p>
                </div>
              }
              variant="rich"
            >
              <Button variant="secondary" size="sm">Rich</Button>
            </Tooltip>
            <Tooltip content="Con icono" side="right">
              <Button variant="ghost" size="icon-sm"><Info className="size-4" /></Button>
            </Tooltip>
          </div>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
