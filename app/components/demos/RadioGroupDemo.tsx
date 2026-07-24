"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem, Label } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function RadioGroupDemo() {
  const [defaultValue, setDefaultValue] = useState("1");

  return (
    <ComponentShowcase title="RadioGroup" description="Grupo de botones de seleccion unica">
      <RadioGroup defaultValue={defaultValue} onValueChange={setDefaultValue}>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="1" id="rg1" />
          <Label htmlFor="rg1">Opcion A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="2" id="rg2" />
          <Label htmlFor="rg2">Opcion B</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="3" id="rg3" />
          <Label htmlFor="rg3">Opcion C</Label>
        </div>
      </RadioGroup>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">selected</label>
          <span className="block rounded-sm bg-accent-soft px-2 py-1 text-xs text-accent font-semibold">{defaultValue}</span>
        </div>
      </div>
    </ComponentShowcase>
  );
}
