"use client";

import { useState, ReactNode } from "react";
import { Input } from "../Base/Entradas";

// ─── Tipos ─────────────────────────────────────────────

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (row: T, index: number) => ReactNode;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    width?: string; // 🔥 IMPORTANTE: siempre definir
    group?: string;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
    key: string;
    direction: SortDirection;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T;
    selectable?: boolean;
    selectedRows?: (T[keyof T])[];
    onSelectionChange?: (selected: (T[keyof T])[]) => void;
    onRowClick?: (row: T) => void;
    stickyHeader?: boolean;
    className?: string;
}

// ─── Helpers ───────────────────────────────────────────

const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

// ─── Componente ─────────────────────────────────────────

export function Table<T extends Record<string, unknown>>({
    data,
    columns,
    rowKey,
    selectable = false,
    selectedRows,
    onSelectionChange,
    onRowClick,
    stickyHeader = false,
    className = "",
}: TableProps<T>) {
    const safeColumns = columns ?? [];
    const safeData = data ?? [];

    const [internalSelected, setInternalSelected] = useState<Set<unknown>>(
        new Set(selectedRows ?? [])
    );

    const activeSelected =
        selectedRows !== undefined ? new Set(selectedRows) : internalSelected;

    const toggleRow = (id: unknown) => {
        const next = new Set(activeSelected);
        next.has(id) ? next.delete(id) : next.add(id);
        setInternalSelected(next);
        onSelectionChange?.(Array.from(next) as any);
    };

    // ─── Agrupación ──────────────────────────────────────

    const groups: { title: string; colSpan: number }[] = [];

    safeColumns.forEach((col) => {
        const title = col.group || "";
        const last = groups[groups.length - 1];

        if (last && last.title === title) last.colSpan++;
        else groups.push({ title, colSpan: 1 });
    });

    const hasGroups = groups.some((g) => g.title !== "");

    // ─── Render ──────────────────────────────────────────

    return (
        <div className={`w-full overflow-x-auto ${className}`}>
            <table className="min-w-[2200px] table-fixed border-collapse">

                {/* 🔥 CONTROL REAL DE WIDTH */}
                <colgroup>
                    {selectable && <col style={{ width: "40px" }} />}
                    {safeColumns.map((col, i) => (
                        <col key={i} style={{ width: col.width || "180px" }} />
                    ))}
                </colgroup>

                <thead
                    className={`bg-accent/80 text-white ${stickyHeader ? "sticky top-0 z-10" : ""
                        }`}
                >
                    {/* ── Fila de grupos ── */}
                    {hasGroups && (
                        <tr>
                            {selectable && <th rowSpan={2} className="px-3 py-2"></th>}
                            {groups.map((g, i) => (
                                <th
                                    key={i}
                                    colSpan={g.colSpan}
                                    className="px-3 py-2 text-[10px] uppercase text-center opacity-70 whitespace-nowrap"
                                >
                                    {g.title}
                                </th>
                            ))}
                        </tr>
                    )}

                    {/* ── Fila headers ── */}
                    <tr>
                        {!hasGroups && selectable && <th className="px-3 py-2"></th>}

                        {safeColumns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={`px-3 py-2 text-xs font-bold uppercase whitespace-nowrap ${alignMap[col.align ?? "left"]
                                    }`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {safeData.map((row, i) => {
                        const id = row[rowKey];
                        const isSelected = activeSelected.has(id);

                        return (
                            <tr
                                key={String(id)}
                                className="border-b border-border hover:bg-muted/30"
                                onClick={() => {
                                    onRowClick?.(row);
                                    if (selectable) toggleRow(id);
                                }}
                            >
                                {selectable && (
                                    <td className="px-3 py-2">
                                        <Input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleRow(id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                )}

                                {safeColumns.map((col) => {
                                    const value = col.render
                                        ? col.render(row, i)
                                        : String(row[col.key as keyof T] ?? "—");

                                    return (
                                        <td
                                            key={String(col.key)}
                                            className={`px-3 py-2 ${alignMap[col.align ?? "left"]}`}
                                        >
                                            {/* 🔥 evita romper layout */}
                                            <div className="w-full min-w-0 overflow-hidden truncate">
                                                {value}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;