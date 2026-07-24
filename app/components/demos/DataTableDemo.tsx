"use client";

import { useState } from "react";
import { DataTable, type Column } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const DATA: User[] = [
  { id: 1, name: "Agustin Garcia", email: "agustin@example.com", role: "Admin", status: "Activo" },
  { id: 2, name: "Camila Lopez", email: "camila@example.com", role: "Editor", status: "Activo" },
  { id: 3, name: "Martin Ruiz", email: "martin@example.com", role: "Viewer", status: "Inactivo" },
  { id: 4, name: "Laura Fernandez", email: "laura@example.com", role: "Editor", status: "Activo" },
];

const COLUMNS: Column<User>[] = [
  { key: "name", header: "Nombre", accessor: "name" },
  { key: "email", header: "Email", accessor: "email" },
  { key: "role", header: "Rol", accessor: "role" },
  { key: "status", header: "Estado", accessor: "status" },
];

const SIZES = ["sm", "md", "lg"] as const;

export function DataTableDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [headerVariant, setHeaderVariant] = useState<"default" | "accent">("default");

  return (
    <ComponentShowcase title="DataTable" description="Tabla de datos con columnas, agrupamiento y estados de carga">
      <div className="w-full">
        <DataTable
          data={DATA}
          columns={COLUMNS}
          rowKey="id"
          size={size}
          headerVariant={headerVariant}
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">size</label>
          <select value={size} onChange={(e) => setSize(e.target.value as "sm" | "md" | "lg")} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">headerVariant</label>
          <select value={headerVariant} onChange={(e) => setHeaderVariant(e.target.value as "default" | "accent")} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary">
            <option value="default">default</option>
            <option value="accent">accent</option>
          </select>
        </div>
      </div>
    </ComponentShowcase>
  );
}
