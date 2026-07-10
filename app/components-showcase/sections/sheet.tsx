"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/lib/components/ui/DataDisplay/Sheet";
import { Button } from "@/lib/components/ui/Base/Entradas";
import { Input } from "@/lib/components/ui/Base/Entradas";

export function SheetSection() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("right");

  return (
    <SectionLayout id="sheet" title="Sheet" description="Panel lateral/panel deslizante con 4 posiciones.">
      <ComponentDemo
        name="Sheet"
        description="Panel deslizante desde cualquier lado de la pantalla"
        props={[
          { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"' },
          { name: "showCloseButton", type: "boolean", default: "true" },
        ]}
        code={`import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/lib/components/ui/DataDisplay/Sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button>Abrir sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Título</SheetTitle>
      <SheetDescription>Descripción</SheetDescription>
    </SheetHeader>
    <div className="p-4">Contenido</div>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Cerrar</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["top", "right", "bottom", "left"] as const).map((s) => (
              <Sheet key={s}>
                <SheetTrigger asChild>
                  <Button
                    variant={side === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSide(s)}
                  >
                    {s}
                  </Button>
                </SheetTrigger>
                <SheetContent side={s}>
                  <SheetHeader>
                    <SheetTitle>Sheet {s}</SheetTitle>
                    <SheetDescription>
                      Este panel se desliza desde el lado &quot;{s}&quot;.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-text-secondary">
                      Contenido del sheet. Puedes poner formularios, listas, o cualquier cosa aquí.
                    </p>
                    <Input placeholder="Escribe algo..." />
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button>Guardar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
