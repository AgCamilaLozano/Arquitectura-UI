// /components/ui/DataTable.tsx
// Propósito: Tabla reutilizable con scroll X/Y, encabezados agrupables y filas configurables via props.

"use client";

import React from "react";

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

const CELL_PADDING: Record<string, string> = {
    sm: "6px 10px",
    md: "10px 12px",
    lg: "14px 16px",
};

const FONT_SIZE: Record<string, string> = {
    sm: "12px",
    md: "13px",
    lg: "14px",
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
    const cellPadding = CELL_PADDING[size] ?? CELL_PADDING.md;
    const fontSize = FONT_SIZE[size] ?? FONT_SIZE.md;

    // Tokens que mapean 1:1 con las variables del globals.css del proyecto
    const headerBg =
        headerVariant === "accent"
            ? "var(--accent)"
            : "var(--bg-muted)";
    const headerText =
        headerVariant === "accent"
            ? "#ffffff"
            : "var(--text-secondary)";

    const groupLabelColor =
        headerVariant === "accent"
            ? "#f7f4f4ff"
            : "var(--accent)";

    const groupBorderColor =
        headerVariant === "accent"
            ? "var(--border-default)"
            : "var(--border-strong)";

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
            className={className}
            style={{
                border: "0.5px solid var(--border-default)",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            <div
                className="scrollbar-soft"
                style={{ overflowX: "auto", overflowY: "auto", maxHeight }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        fontSize,
                        minWidth: "600px",
                        fontFamily: "var(--font-body), sans-serif",
                    }}
                >
                    {/* ── ENCABEZADOS ── */}
                    <thead
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            background: headerBg,
                        }}
                    >
                        {/* Fila de grupos */}
                        {hasGroups && (
                            <tr>
                                {groupedHeaders.map((g, idx) => {
                                    const style = groupStyles.get(g.label);
                                    return g.label ? (
                                        <th
                                            key={`group-${g.label}-${idx}`}
                                            colSpan={g.span}
                                            style={{
                                                padding: "5px 12px",
                                                textAlign: "center",
                                                fontWeight: 600,
                                                fontSize: "10px",
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: groupLabelColor,
                                                borderBottom: `0.5px solid ${style?.border ?? groupBorderColor}`,
                                                background: style?.bg ?? headerBg,
                                                borderLeft:
                                                    idx !== 0
                                                        ? "0.5px solid var(--border-default)"
                                                        : undefined,
                                                borderRight:
                                                    idx === groupedHeaders.length - 1
                                                        ? "2px solid var(--border-default)"
                                                        : "2px solid transparent",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {g.label}
                                        </th>
                                    ) : (
                                        <th
                                            key={`empty-${g.start}`}
                                            style={{
                                                padding: 0,
                                                borderBottom: "0.5px solid var(--border-default)",
                                            }}
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
                                        style={{
                                            padding: cellPadding,
                                            textAlign: col.align ?? "left",
                                            fontWeight: 600,
                                            fontSize: "11px",
                                            letterSpacing: "0.04em",
                                            color: headerText,

                                            background: style?.bg ?? headerBg,

                                            borderBottom:
                                                "0.5px solid var(--border-default)",
                                            borderLeft:
                                                isFirstInGroup && i !== 0
                                                    ? `1px solid ${style?.border ??
                                                    "var(--border-default)"
                                                    }`
                                                    : undefined,

                                            whiteSpace: "nowrap",
                                            width:
                                                col.width !== undefined
                                                    ? typeof col.width === "number"
                                                        ? `${col.width}px`
                                                        : col.width
                                                    : undefined,
                                            minWidth:
                                                col.width !== undefined
                                                    ? typeof col.width === "number"
                                                        ? `${col.width}px`
                                                        : col.width
                                                    : "100px",
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
                                <tr key={`skeleton-${rowIdx}`}>
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            style={{
                                                padding: cellPadding,
                                                borderBottom: "0.5px solid var(--border-default)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    height: "12px",
                                                    borderRadius: "var(--r-sm)",
                                                    background: "var(--bg-muted)",
                                                    width: `${60 + Math.random() * 30}%`,
                                                    animation: "dt-pulse 1.5s ease-in-out infinite",
                                                }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    style={{
                                        padding: "48px 16px",
                                        textAlign: "center",
                                        color: "var(--text-muted)",
                                        fontFamily: "var(--font-body), sans-serif",
                                    }}
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
                                        style={{
                                            background: "var(--bg-base)",
                                        }}
                                    >
                                        {columns.map((col, i) => {
                                            const isFirstInGroup =
                                                col.group &&
                                                (i === 0 || columns[i - 1].group !== col.group);

                                            return (
                                                <td
                                                    key={col.key}
                                                    style={{
                                                        padding: cellPadding,
                                                        textAlign: col.align ?? "left",
                                                        borderBottom:
                                                            "0.5px solid var(--border-default)",
                                                        borderLeft:
                                                            isFirstInGroup && i !== 0
                                                                ? "0.5px solid var(--border-default)"
                                                                : undefined,
                                                        color: "var(--text-primary)",
                                                        whiteSpace: "nowrap",
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