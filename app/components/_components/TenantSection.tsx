"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  LabelBadge,
  Checkbox,
  Switch,
  Input,
  Skeleton,
  Separator,
} from "@agustin/ui";
import { ComponentShowcase } from "./ComponentShowcase";

const PRESETS = [
  { label: "Default", hue: 265, saturation: 84 },
  { label: "Finanzas", hue: 210, saturation: 84 },
  { label: "Salud", hue: 155, saturation: 70 },
  { label: "E-commerce", hue: 25, saturation: 90 },
  { label: "Educacion", hue: 340, saturation: 80 },
  { label: "Tech", hue: 190, saturation: 80 },
];

const CODE_SNIPPET = `<!-- 1. CSS Variables (globals.css) -->
:root {
  --tenant-hue: 265;
  --tenant-saturation: 84%;
}

/* 2. React hook (dynamic branding) */
useEffect(() => {
  document.documentElement.style.setProperty("--tenant-hue", String(hue));
  document.documentElement.style.setProperty("--tenant-saturation", saturation + "%");
}, [hue, saturation]);

// 3. getTenantThemeStyles() from @agustin/ui/theme
import { getTenantThemeStyles } from "@agustin/ui";
const styles = getTenantThemeStyles(265, "84%");`;

export function TenantSection() {
  const [hue, setHue] = useState(265);
  const [saturation, setSaturation] = useState(84);

  useEffect(() => {
    document.documentElement.style.setProperty("--tenant-hue", String(hue));
    document.documentElement.style.setProperty("--tenant-saturation", `${saturation}%`);
  }, [hue, saturation]);

  return (
    <section id="tenant" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-text-primary tracking-tight">
          Tenant Simulator
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Simula el branding de diferentes tenants y visualiza como los componentes reaccionan en tiempo real.
        </p>
      </div>

      {/* Presets */}
      <ComponentShowcase title="Presets de marca" description="Selecciona un preset o ajusta manualmente">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => { setHue(p.hue); setSaturation(p.saturation); }}
              className="flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs font-medium text-text-primary transition-colors hover:border-border-strong"
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: `hsl(${p.hue} ${p.saturation}% 58%)` }}
              />
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 text-xs">
          <div className="space-y-1 w-48">
            <div className="flex items-center justify-between">
              <label className="text-text-secondary font-medium">Hue</label>
              <span className="tabular-nums text-text-muted">{hue}</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <div className="space-y-1 w-48">
            <div className="flex items-center justify-between">
              <label className="text-text-secondary font-medium">Saturation</label>
              <span className="tabular-nums text-text-muted">{saturation}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        </div>
      </ComponentShowcase>

      {/* Preview en vivo */}
      <ComponentShowcase title="Preview en vivo" description="Estos componentes reaccionan al tenant seleccionado">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Button accent</Button>
          <Button variant="outline">Outline</Button>
          <LabelBadge label="Badge" color="accent" />
          <LabelBadge label="Success" color="success" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox defaultChecked />
            <span className="text-sm text-text-primary">Checkbox</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <span className="text-sm text-text-primary">Switch</span>
          </div>
        </div>
        <Card className="w-[280px]">
          <CardBody className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">Card con accent</span>
              <LabelBadge label="Activo" color="success" />
            </div>
            <Input placeholder="Input con accent..." />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </CardBody>
        </Card>
        <Separator className="w-full" />
      </ComponentShowcase>

      {/* Codigo de integracion */}
      <ComponentShowcase title="Codigo de integracion" description="Como configurar el tenant en tu proyecto">
        <pre className="w-full overflow-x-auto rounded-sm bg-surface p-4 text-xs text-text-primary font-mono leading-relaxed">
          <code>{CODE_SNIPPET}</code>
        </pre>
      </ComponentShowcase>
    </section>
  );
}
