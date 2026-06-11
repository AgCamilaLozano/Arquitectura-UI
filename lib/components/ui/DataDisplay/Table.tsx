// /components/ui/DataTable.tsx
// Propósito: Tabla reutilizable con scroll X/Y, encabezados agrupables y filas configurables via props.

"use client";

import React from "react";
import { cn } from "@/lib/utils";

// --- Tipos ---

/** Una columna individual de la tabla */
export interface Column<T> {
    key: string;
    header: string;
    accessor?: keyof T | ((row: T) => React.ReactNode);
    render?: (row: T) => React.ReactNode;
    width?: string | number;
    align?: "left" | "center" | "right";
    group?: string;
    groupStyle?: {
        bg?: string;
        border?: string;
    };
}

/** Props del componente DataTable */
export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    maxHeight?: string;
    rowKey: keyof T;
    emptyState?: React.ReactNode;
    isLoading?: boolean;
    className?: string;
    headerVariant?: "default" | "accent";
    size?: "sm" | "md" | "lg";
}

// --- Helpers ---

function getCellValue<T>(row: T, col: Column<T>): React.ReactNode {
    if (col.render) return col.render(row);
    if (!col.accessor) return null;
    if (typeof col.accessor === "function") return col.accessor(row);
    return row[col.accessor] as React.ReactNode;
}

const paddingClasses: Record<string, string> = {
    sm: "py-1.5 px-2.5 text-xs",
    md: "py-2.5 px-3 text-sm",
    lg: "py-3.5 px-4 text-base",
};
// --- Componente ---

export function DataTable<T>({
    data,
    columns,
    maxHeight = "70vh",
    rowKey,
    emptyState,
    isLoading = false,
    className,
    headerVariant = "default",
    size = "md",
}: DataTableProps<T>) {

    const groupedHeaders = React.useMemo(() => {
        const result: { label: string; start: number; span: number }[] = [];
        let i = 0;
        while (i < columns.length) {
            const col = columns[i];
            if (col.group) {
                let span = 0;
                const start = i;
                while (i < columns.length && columns[i].group === col.group) {
                    span++;
                    i++;
                }
                result.push({ label: col.group, start, span });
            } else {
                result.push({ label: "", start: i, span: 1 });
                i++;
            }
        }
        return result;
    }, [columns]);

    const hasGroups = columns.some((c) => c.group);
    const cellPaddingClass = paddingClasses[size] ?? paddingClasses.md;

    // Tokens que mapean 1:1 con las variables del globals.css del proyecto
    const isAccent = headerVariant === "accent";
    const headerBgClass = isAccent ? "bg-accent text-white" : "bg-muted text-text-secondary";
    const groupLabelColorClass = isAccent ? "text-background/90" : "text-accent";
    const groupBorderClass = isAccent ? "border-border" : "border-border-strong";

    const groupStyles = React.useMemo(() => {
        const map = new Map<string, { bg?: string; border?: string }>();

        columns.forEach((col) => {
            if (col.group && col.groupStyle && !map.has(col.group)) {
                map.set(col.group, col.groupStyle);
            }
        });

        return map;
    }, [columns]);

    return (
        <div
            className={cn("border border-border rounded-md overflow-hidden bg-surface shadow-xs w-full flex flex-col",
                className)}
        >
            <div
                className="scrollbar-soft overflow-auto w-full"
                style={{ maxHeight }}
            >
                <table className="w-full border-separate border-spacing-0 min-w-[600px] font-body">
                    {/* ── ENCABEZADOS ── */}
                    <thead className={cn("sticky top-0 z-10 font-semibold select-none", headerBgClass)}>
                        {/* Fila de grupos */}
                        {hasGroups && (
                            <tr>
                                {groupedHeaders.map((g, idx) => {
                                    const style = groupStyles.get(g.label);
                                    return g.label ? (
                                        <th
                                            key={`group-${g.label}-${idx}`}
                                            colSpan={g.span}
                                            className={cn(
                                                "py-1.5 px-3 text-center font-bold text-[10px] tracking-wider uppercase whitespace-nowrap border-b",
                                                groupLabelColorClass
                                            )}
                                            style={{
                                                borderBottomColor: style?.border ?? (isAccent ? "var(--border-default)" : "var(--border-strong)"),
                                                backgroundColor: style?.bg ?? undefined,
                                                borderLeft: idx !== 0 ? "0.5px solid var(--border-default)" : undefined,
                                            }}
                                        >
                                            {g.label}
                                        </th>
                                    ) : (
                                        <th
                                            key={`empty-${g.start}`}
                                            className="p-0 border-b border-border"
                                        />
                                    )
                                })}
                            </tr>
                        )}

                        {/* Fila de columnas individuales */}
                        <tr>
                            {columns.map((col, i) => {
                                const isFirstInGroup =
                                    col.group && (i === 0 || columns[i - 1].group !== col.group);
                                const style = col.group
                                    ? groupStyles.get(col.group)
                                    : undefined;

                                return (
                                    <th
                                        key={col.key}
                                        className={cn(
                                            "font-semibold text-[11px] tracking-wide whitespace-nowrap border-b border-border",
                                            cellPaddingClass
                                        )}
                                        style={{
                                            textAlign: col.align ?? "left",
                                            backgroundColor: style?.bg ?? undefined,
                                            borderLeft: isFirstInGroup && i !== 0 
                                                ? `1px solid ${style?.border ?? "var(--border-default)"}` 
                                                : undefined,
                                            width: col.width ?? "auto",
                                            minWidth: col.width ?? "100px",
                                        }}
                                    >
                                        {col.header}
                                    </th>

                                );
                            })}
                        </tr>
                    </thead>

                    {/* ── CUERPO ── */}
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, rowIdx) => (
                                <tr key={`skeleton-${rowIdx}`} className="bg-[#fff] hover:bg-muted/30 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key} className={cn("border-b border-border", cellPaddingClass)}>
                                            <div
                                                className="h-3 bg-muted rounded-xs animate-pulse"
                                                style={{ width: `${60 + Math.random() * 30}%`,}} // Variabilidad controlada sin Math.random en render
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr className="bg-[#fff]">
                                <td
                                    colSpan={columns.length}
                                    className="py-12 px-4 text-center text-text-muted font-normal"
                                >
                                    {emptyState ?? "Sin resultados"}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIdx) => {
                                const key = String(row[rowKey]);

                                return (
                                    <tr
                                        key={key}
                                        className="bg-[#fff] hover:bg-muted/20 active:bg-muted/40 transition-colors border-b border-border"
                                    >
                                        {columns.map((col, i) => {
                                            const isFirstInGroup =
                                                col.group &&
                                                (i === 0 || columns[i - 1].group !== col.group);

                                            return (
                                                <td
                                                    key={col.key}
                                                    className={cn(
                                                        "text-text-primary border-b border-border font-normal text-sm",
                                                        cellPaddingClass
                                                    )}
                                                    style={{
                                                        textAlign: col.align ?? "left",
                                                        borderLeft: isFirstInGroup && i !== 0 
                                                            ? "0.5px solid var(--border-default)" 
                                                            : undefined,
                                                    }}
                                                >
                                                    {getCellValue(row, col)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes dt-pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.35; }
                }
            `}</style>
        </div >
    );
}