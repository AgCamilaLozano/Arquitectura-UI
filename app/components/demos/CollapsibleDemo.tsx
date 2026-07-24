"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentShowcase title="Collapsible" description="Contenido expandible y colapsable">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            {open ? "Ocultar detalles" : "Mostrar detalles"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 rounded-sm border border-border bg-surface/50 p-4">
          <p className="text-sm text-text-secondary">
            Este es el contenido colapsable. Puede contener cualquier tipo de elemento,
            incluyendo formularios, textos, imagenes o incluso otros componentes.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-wrap gap-4 text-xs">
        <span className="rounded-sm bg-accent-soft px-2 py-1 text-xs text-accent font-semibold">
          state: {open ? "open" : "closed"}
        </span>
      </div>
    </ComponentShowcase>
  );
}
