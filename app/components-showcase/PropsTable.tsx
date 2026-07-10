"use client";

import React from "react";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props.length) return null;

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface border-b border-border">
              <th className="px-4 py-2.5 text-left font-medium text-text-primary">Prop</th>
              <th className="px-4 py-2.5 text-left font-medium text-text-primary">Tipo</th>
              <th className="px-4 py-2.5 text-left font-medium text-text-primary">Default</th>
              <th className="px-4 py-2.5 text-left font-medium text-text-primary">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {props.map((row) => (
              <tr key={row.name} className="border-b border-border last:border-b-0">
                <td className="px-4 py-2.5 font-mono text-xs font-medium text-accent">
                  {row.name}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-text-secondary">
                  {row.type}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-text-muted">
                  {row.default ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-xs text-text-secondary">
                  {row.description ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
