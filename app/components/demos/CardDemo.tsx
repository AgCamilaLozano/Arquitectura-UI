"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@agustin/ui";
import { Button } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const VARIANTS = ["default", "outlined", "elevated", "accent", "ghost"] as const;

export function CardDemo() {
  const [variant, setVariant] = useState<string>("default");
  const [clickable, setClickable] = useState(false);

  return (
    <ComponentShowcase title="Card" description="Contenedor flexible con variantes visuales">
      <Card variant={variant as never} clickable={clickable} className="w-[300px]">
        <CardHeader title="Titulo de Card" subtitle="Descripcion breve" withDivider />
        <CardBody>
          <p className="text-sm text-text-secondary">Contenido de ejemplo de la card.</p>
        </CardBody>
        <CardFooter withDivider align="between">
          <span className="text-xs text-text-muted">Footer</span>
          <Button size="sm">Accion</Button>
        </CardFooter>
      </Card>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">variant</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {VARIANTS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">clickable</label>
          <input type="checkbox" checked={clickable} onChange={(e) => setClickable(e.target.checked)} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
