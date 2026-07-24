"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function PopoverDemo() {
  return (
    <ComponentShowcase title="Popover" description="Contenido flotante contextual anclado a un trigger">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Abrir Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-primary">Configuracion rapida</p>
            <p className="text-xs text-text-secondary">
              Este popover puede contener cualquier tipo de contenido: formularios, listas, botones, etc.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </ComponentShowcase>
  );
}
