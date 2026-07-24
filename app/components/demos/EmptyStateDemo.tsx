"use client";

import { useState } from "react";
import { EmptyState, Button } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

const SIZES = ["sm", "md", "lg"] as const;

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}

export function EmptyStateDemo() {
  const [size, setSize] = useState<string>("md");

  return (
    <ComponentShowcase title="EmptyState" description="Estado vacio con icono, titulo y accion">
      <div className="w-full">
        <EmptyState
          size={size as never}
          icon={InboxIcon}
          title="Sin resultados"
          description="No se encontraron registros que coincidan con tu busqueda."
          action={<Button size="sm">Crear nuevo</Button>}
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
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
