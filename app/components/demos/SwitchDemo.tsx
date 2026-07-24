"use client";

import { useState } from "react";
import { Switch, Label } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function SwitchDemo() {
  const [disabled, setDisabled] = useState(false);

  return (
    <ComponentShowcase title="Switch" description="Interruptor de toggle on/off">
      <div className="flex items-center gap-3">
        <Switch id="sw1" disabled={disabled} />
        <Label htmlFor="sw1">Notificaciones</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="sw2" disabled={disabled} defaultChecked />
        <Label htmlFor="sw2">Modo oscuro</Label>
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
