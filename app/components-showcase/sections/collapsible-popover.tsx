"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/lib/components/ui/collapsible";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/lib/components/ui/popover";
import { Button } from "@/lib/components/ui/Base/Entradas";
import { ChevronDown } from "lucide-react";

export function CollapsiblePopoverSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionLayout id="collapsible-popover" title="Collapsible & Popover" description="Contenido colapsable y popover flotante.">
      <ComponentDemo
        name="Collapsible"
        description="Contenido que se expande/contrae"
        code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@agustin/ui/components";

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Contenido colapsable aquí</p>
  </CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="gap-2">
              Toggle contenido
              <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 rounded-lg border border-border p-4 text-sm text-text-secondary">
            Este es el contenido colapsable. Se muestra u oculta al hacer clic en el botón.
            <br /><br />
            Puedes poner cualquier contenido aquí: texto, formularios, etc.
          </CollapsibleContent>
        </Collapsible>
      </ComponentDemo>

      <ComponentDemo
        name="Popover"
        description="Panel flotante anclado a un trigger"
        code={`import { Popover, PopoverTrigger, PopoverContent } from "@agustin/ui/components";

<Popover>
  <PopoverTrigger asChild>
    <Button>Abrir popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Contenido del popover</p>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button>Abrir popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-primary">Configuración rápida</p>
              <p className="text-xs text-text-secondary">
                Este es un popover con contenido arbitrario. Se cierra al hacer clic fuera.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentDemo>
    </SectionLayout>
  );
}
