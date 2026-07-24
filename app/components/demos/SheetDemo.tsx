"use client";

import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Button,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const SIDES = ["top", "right", "bottom", "left"] as const;

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<string>("right");

  return (
    <ComponentShowcase title="Sheet" description="Panel lateral deslizante desde un borde">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">Abrir Sheet</Button>
        </SheetTrigger>
        <SheetContent side={side as never}>
          <SheetHeader>
            <SheetTitle>Panel lateral</SheetTitle>
            <SheetDescription>
              Este panel se desliza desde el borde seleccionado. Puede contener cualquier tipo de contenido.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 px-5 py-4">
            <p className="text-sm text-text-secondary">Contenido del panel...</p>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" size="sm">Cerrar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">side</label>
          <select value={side} onChange={(e) => setSide(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {SIDES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
