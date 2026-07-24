"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const VARIANTS = ["default", "destructive", "warning", "info"] as const;
const SIZES = ["sm", "md", "lg", "xl"] as const;

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<string>("default");
  const [size, setSize] = useState<string>("md");

  return (
    <ComponentShowcase title="Dialog" description="Modal de dialogo con variantes y tamanios">
      <Button onClick={() => setOpen(true)}>Abrir Dialog</Button>

      <Dialog open={open} onClose={() => setOpen(false)} variant={variant as never} size={size as never}>
        <DialogHeader
          title="Confirmar accion"
          description="Esta seguro que desea realizar esta accion? Esta operacion no se puede deshacer."
        />
        <DialogBody>
          <p className="text-sm text-text-secondary">
            El registro sera eliminado permanentemente del sistema. Toda la informacion asociada sera removida.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button size="sm" onClick={() => setOpen(false)}>Confirmar</Button>
        </DialogFooter>
      </Dialog>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
