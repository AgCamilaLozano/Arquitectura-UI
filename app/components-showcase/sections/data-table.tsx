"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { DataTable } from "@/lib/components/ui/DataDisplay/Table";

const sampleData = [
  { id: "1", name: "Alicia García", role: "Diseñadora", status: "Activo" },
  { id: "2", name: "Bruno López", role: "Desarrollador", status: "Revisión" },
  { id: "3", name: "Carolina Ruiz", role: "PM", status: "Completado" },
  { id: "4", name: "Diego Martínez", role: "DevOps", status: "Activo" },
  { id: "5", name: "Elena Torres", role: "QA", status: "Revisión" },
];

const columns = [
  { key: "name", header: "Nombre", accessor: "name" as const },
  { key: "role", header: "Rol", accessor: "role" as const },
  { key: "status", header: "Estado", accessor: "status" as const },
];

export function DataTableSection() {
  return (
    <SectionLayout id="data-table" title="Tabla de Datos" description="DataTable con columnas, loading state y empty state.">
      <ComponentDemo
        name="DataTable"
        description="Tabla genérica con soporte para columnas, loading y empty state"
        props={[
          { name: "data", type: "T[]", description: "Datos a mostrar (requerido)" },
          { name: "columns", type: "Column<T>[]", description: "Definición de columnas (requerido)" },
          { name: "rowKey", type: "keyof T", description: "Clave única de fila (requerido)" },
          { name: "maxHeight", type: "string", default: '"70vh"' },
          { name: "headerVariant", type: '"default" | "accent"', default: '"default"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "isLoading", type: "boolean", default: "false" },
          { name: "emptyState", type: "ReactNode" },
        ]}
        code={`import { DataTable } from "@agustin/ui/components";

<DataTable
  data={data}
  columns={[
    { key: "name", header: "Nombre", accessor: "name" },
    { key: "role", header: "Rol", accessor: "role" },
  ]}
  rowKey="id"
  headerVariant="accent"
  size="md"
/>`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase">Default</p>
            <DataTable data={sampleData} columns={columns} rowKey="id" maxHeight="300px" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase">Accent header + Small</p>
            <DataTable data={sampleData} columns={columns} rowKey="id" maxHeight="300px" headerVariant="accent" size="sm" />
          </div>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
