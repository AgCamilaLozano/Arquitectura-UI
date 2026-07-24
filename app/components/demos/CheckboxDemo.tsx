"use client";

import { useState } from "react";
import { Checkbox, Label } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function CheckboxDemo() {
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentShowcase title="Checkbox" description="Casilla de verificacion">
      <div className="flex items-center gap-3">
        <Checkbox id="cb1" disabled={disabled} />
        <Label htmlFor="cb1">Recordarme</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="cb2" disabled={disabled} defaultChecked />
        <Label htmlFor="cb2">Acepto terminos</Label>
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">disabled</label>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
