"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/Base/Selects/select";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Switch } from "@/lib/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/lib/components/ui/Groups/radio-group";
import { Label } from "@/lib/components/ui/Compuesto/Badges";

export function SelectorsSection() {
  const [selectValue, setSelectValue] = useState("opcion-2");
  const [switchOn, setSwitchOn] = useState(false);
  const [radioValue, setRadioValue] = useState("option-1");
  const [checked, setChecked] = useState(false);

  return (
    <SectionLayout id="selectors" title="Selectores" description="Select, RadioGroup, Switch y Checkbox.">
      <ComponentDemo
        name="Select"
        description="Selector desplegable basado en Radix UI"
        props={[
          { name: "SelectTrigger.size", type: '"sm" | "default"', default: '"default"' },
        ]}
        code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@agustin/ui/components";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona una opción" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="op1">Opción 1</SelectItem>
    <SelectItem value="op2">Opción 2</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opcion-1">Opción 1</SelectItem>
                <SelectItem value="opcion-2">Opción 2</SelectItem>
                <SelectItem value="opcion-3">Opción 3</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-text-muted">Valor: {selectValue}</p>
          </div>
          <div className="space-y-2">
            <Select>
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="Tamaño sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opción A</SelectItem>
                <SelectItem value="b">Opción B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="RadioGroup"
        description="Grupo de opciones radio basado en Radix UI"
        code={`import { RadioGroup, RadioGroupItem } from "@/lib/components/ui/Groups/radio-group";

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Opción 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Opción 2</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1">Opción 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2">Opción 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="r3" />
            <Label htmlFor="r3">Opción 3</Label>
          </div>
        </RadioGroup>
        <p className="text-xs text-text-muted mt-2">Seleccionado: {radioValue}</p>
      </ComponentDemo>

      <ComponentDemo
        name="Switch"
        description="Toggle de encendido/apagado"
        props={[
          { name: "size", type: '"sm" | "default"', default: '"default"' },
        ]}
        code={`import { Switch } from "@/lib/components/ui/switch";

<Switch checked={on} onCheckedChange={setOn} />
<Switch size="sm" checked={on} onCheckedChange={setOn} />`}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            <Label>Default ({switchOn ? "ON" : "OFF"})</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch size="sm" checked={switchOn} onCheckedChange={setSwitchOn} />
            <Label>Small</Label>
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Checkbox"
        description="Casilla de verificación basada en Radix UI"
        code={`import { Checkbox } from "@/lib/components/ui/checkbox";

<Checkbox checked={checked} onCheckedChange={setChecked} />`}
      >
        <div className="flex items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} id="demo-cb" />
          <Label htmlFor="demo-cb">Acepto los términos ({checked ? "Marcado" : "Sin marcar"})</Label>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
