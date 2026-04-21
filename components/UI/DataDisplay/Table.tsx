/**
 * Propósito: Componente de tabla reutilizable y configurable via props genéricas.
 * Soporta ordenamiento, selección de filas, estado vacío, skeleton de carga y
 * encabezado sticky. No contiene lógica de negocio.
 */

"use client";

import { useState, ReactNode } from "react";
import { Input } from "../Base/Entradas";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Props de cada columna.
 * @template T - Tipo del objeto de datos de cada fila
 */
export interface Column<T> {
    /** Identificador único de la columna */
    key: keyof T | string;
    /** Texto del encabezado */
    header: string;
    /** Función para renderizar la celda; si se omite, imprime el valor directamente */
    render?: (row: T, index: number) => ReactNode;
    /** Permite al usuario ordenar por esta columna */
    sortable?: boolean;
    /** Alineación del contenido de la celda */
    align?: "left" | "center" | "right";
    /** Ancho fijo opcional (ej. "120px", "10%") */
    width?: string;
    /** Título superior opcional para agrupar columnas */
    group?: string;
}

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
    key: string;
    direction: SortDirection;
}

/**
 * Props principales del componente Table.
 * @template T - Tipo del objeto de datos
 */
export interface TableProps<T> {
    /** Arreglo de datos a mostrar */
    data: T[];
    /** Definición de columnas */
    columns: Column<T>[];
    /** Clave única por fila (keyof T) */
    rowKey: keyof T;
    /** Muestra skeleton de carga */
    loading?: boolean;
    /** Número de filas skeleton durante la carga */
    skeletonRows?: number;
    /** Mensaje o nodo cuando no hay datos */
    emptyState?: ReactNode;
    /** Habilita selección de filas con checkbox */
    selectable?: boolean;
    /** Filas seleccionadas (array de valores de rowKey) */
    selectedRows?: (T[keyof T])[];
    /** Callback al cambiar la selección */
    onSelectionChange?: (selected: (T[keyof T])[]) => void;
    /** Callback al hacer clic en una fila */
    onRowClick?: (row: T) => void;
    /** Encabezado fijo al hacer scroll */
    stickyHeader?: boolean;
    /** Variante visual de la tabla */
    variant?: "default" | "striped" | "bordered";
    /** Tamaño de las celdas */
    size?: "sm" | "md" | "lg";
    /** Clase CSS adicional para el contenedor */
    className?: string;
    /** Callback de ordenamiento externo; si se omite, el ordenamiento es interno */
    onSort?: (sort: SortState) => void;
    // VARIANTES DE ENCABEZADO
    headerVariant?: "default" | "primary" | "accent";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Mapeo de tamaños a padding de celda */
const cellPaddingMap = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
};

/** Mapeo de alineación a clase Tailwind */
const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

const headerVariants = {
    default: "bg-muted text-text-secondary",
    primary: "bg-primary text-background",
    accent: "bg-accent/80 text-white"
};

/** Ícono de orden: muestra la dirección activa o el estado neutro */
function SortIcon({ direction }: { direction: SortDirection }) {
    return (
        <span className="inline-flex flex-col ml-1 gap-[2px] ">
            <svg
                className={`w-2.5 h-2.5 transition-colors ${direction === "asc" ? "text-accent" : "text-text-muted"}`}
                viewBox="0 0 10 6"
                fill="currentColor"
            >
                <path d="M5 0L10 6H0L5 0Z" />
            </svg>
            <svg
                className={`w-2.5 h-2.5 transition-colors ${direction === "desc" ? "text-accent" : "text-text-muted"}`}
                viewBox="0 0 10 6"
                fill="currentColor"
            >
                <path d="M5 6L0 0H10L5 6Z" />
            </svg>
        </span>
    );
}

// ─── Subcomponente: Skeleton Row ───────────────────────────────────────────────

function SkeletonRow({ cols, selectable }: { cols: number; selectable?: boolean }) {
    return (
        <tr className="border-b border-border">
            {selectable && (
                <td className="px-4 py-3">
                    <div className="w-4 h-4 rounded bg-muted animate-pulse" />
                </td>
            )}
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div
                        className="h-3 rounded bg-muted animate-pulse"
                        style={{ width: `${60 + Math.random() * 30}%` }}
                    />
                </td>
            ))}
        </tr>
    );
}

// ─── Subcomponente: Empty State ────────────────────────────────────────────────

function EmptyState({ content }: { content: ReactNode }) {
    return (
        <tr>
            <td colSpan={999}>
                <div className="flex flex-col items-center justify-center py-16 text-text-muted gap-3">
                    {/* Ícono genérico de tabla vacía */}
                    <svg
                        className="w-10 h-10 opacity-40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                    </svg>
                    <span className="text-sm">
                        {content ?? "No hay datos disponibles"}
                    </span>
                </div>
            </td>
        </tr>
    );
}

// ─── Componente Principal ─────────────────────────────────────────────────────

/**
 * Table — Componente de tabla genérica y reutilizable.
 *
 * Lógica clave:
 * - Usa generics `<T>` para tipar filas y columnas sin acoplar a datos específicos.
 * - El ordenamiento puede ser interno (por defecto) o delegado al padre via `onSort`.
 * - La selección múltiple se maneja con un `Set` interno cuando no se pasa `selectedRows`.
 * - `stickyHeader` usa `sticky top-0` con z-index para mantener el header visible.
 */
export function Table<T extends Record<string, unknown>>({
    data,
    columns,
    rowKey,
    loading = false,
    skeletonRows = 5,
    emptyState,
    selectable = false,
    selectedRows,
    onSelectionChange,
    onRowClick,
    stickyHeader = false,
    variant = "default",
    size = "md",
    className = "",
    onSort,
    headerVariant = "default"
}: TableProps<T>) {
    const safeColumns = Array.isArray(columns) ? columns : [];

    // ─── Lógica de Agrupación de Columnas ──────────────────────────────────────
    const groups: { title: string; colSpan: number }[] = [];
    if (safeColumns.length > 0) {
        safeColumns.forEach((col) => {
            const groupTitle = col.group || "";
            const lastGroup = groups[groups.length - 1];

            if (lastGroup && lastGroup.title === groupTitle) {
                lastGroup.colSpan++;
            } else {
                groups.push({ title: groupTitle, colSpan: 1 });
            }
        });
    }
    const hasGroups = groups.some((g) => g.title !== "");
    const safeData = Array.isArray(data) ? data : []

    const allSelected =
        safeData.length > 0 &&
        safeData.every((r) => activeSelected.has(r[rowKey]));
    const someSelected = safeData.some((r) => activeSelected.has(r[rowKey]));

    // ── Estado interno de ordenamiento ──
    const [internalSort, setInternalSort] = useState<SortState>({
        key: "",
        direction: null,
    });

    // ── Estado interno de selección (cuando no se controla externamente) ──
    const [internalSelected, setInternalSelected] = useState<Set<unknown>>(
        new Set(selectedRows ?? [])
    );

    // Lógica clave: usa selección externa si se provee, sino la interna
    const activeSelected =
        selectedRows !== undefined
            ? new Set(selectedRows)
            : internalSelected;

    // ── Ordenamiento interno ──────────────────────────────────────────────────
    const handleSort = (key: string) => {
        const next: SortState = {
            key,
            direction:
                internalSort.key === key
                    ? internalSort.direction === "asc"
                        ? "desc"
                        : internalSort.direction === "desc"
                            ? null
                            : "asc"
                    : "asc",
        };
        setInternalSort(next);
        onSort?.(next);
    };

    /** Lógica clave: ordena internamente solo si no hay callback externo */


    const sortedData =
        !onSort && internalSort.key && internalSort.direction
            ? [...safeData].sort((a, b) => {
                const aVal = a[internalSort.key as keyof T];
                const bVal = b[internalSort.key as keyof T];
                const cmp =
                    typeof aVal === "number" && typeof bVal === "number"
                        ? aVal - bVal
                        : String(aVal).localeCompare(String(bVal));
                return internalSort.direction === "asc" ? cmp : -cmp;
            })
            : safeData;

    // ── Selección ─────────────────────────────────────────────────────────────
    const toggleRow = (id: unknown) => {
        const next = new Set(activeSelected);
        next.has(id) ? next.delete(id) : next.add(id);
        setInternalSelected(next);
        onSelectionChange?.(Array.from(next) as (T[keyof T])[]);
    };

    const toggleAll = () => {
        const allIds = sortedData.map((r) => r[rowKey]);
        const allSelected = allIds.every((id) => activeSelected.has(id));
        const next = allSelected ? new Set<unknown>() : new Set<unknown>(allIds);
        setInternalSelected(next);
        onSelectionChange?.(Array.from(next) as (T[keyof T])[]);
    };

    const SelectAllCheckbox = (
        <Input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
                if (el) el.indeterminate = someSelected && !allSelected;
            }}
            onChange={toggleAll}
            className="accent-accent w-4 h-4 rounded cursor-pointer"
            aria-label="Seleccionar todas las filas"
        />
    );

    // ── Clases por variante ───────────────────────────────────────────────────
    const rowVariantClass = (index: number, isSelected: boolean) => {
        const base =
            "border-b border-border transition-colors";
        const hover = onRowClick ? "cursor-pointer hover:bg-accent-hover" : "";
        const selected = isSelected ? "bg-accent-soft" : "";
        const striped =
            variant === "striped" && index % 2 !== 0 && !isSelected
                ? "bg-muted/40"
                : "";
        return [base, hover, selected, striped].filter(Boolean).join(" ");
    };

    const cellPadding = cellPaddingMap[size];

    return (
        <div
            className={`w-full overflow-visible rounded-md border border-border bg-surface/50 scrollbar-soft ${className}`}
            style={{ boxShadow: "var(--shadow-card)" }}
        >
            <table
                className={`w-full table-fixed border-collapse ${variant === "bordered" ? "border border-border" : ""}`}
            >
                {/* ── Encabezado ─────────────────────────────────────────────────── */}
                <thead
                    className={`${headerVariants[headerVariant ?? "default"]} ${stickyHeader ? "sticky top-0 z-10" : ""
                        }`}
                >
                    {/* Fila de Grupos (Subtítulos de agrupación) */}
                    {hasGroups && (
                        <tr className="border-b border-border/50">
                            {selectable && (
                                <th rowSpan={2} className={`${cellPadding} w-10 border-r border-border/50 align-middle`}>
                                    {SelectAllCheckbox}
                                </th>
                            )}
                            {groups.map((group, idx) => (
                                <th
                                    key={`group-${idx}`}
                                    colSpan={group.colSpan}
                                    className={[
                                        cellPadding,
                                        "text-center font-bold tracking-wider uppercase text-[10px] opacity-70",
                                        variant === "bordered" ? "border border-border" : "",
                                        idx < groups.length - 1 ? "border-r border-border/50" : "",
                                    ].filter(Boolean).join(" ")}
                                >
                                    {group.title}
                                </th>
                            ))}
                        </tr>
                    )}

                    <tr>
                        {/* Checkbox de selección global */}
                        {!hasGroups && selectable && (
                            <th className={`${cellPadding} w-10`}>{SelectAllCheckbox}</th>
                        )}

                        {safeColumns.map((col) => {
                            const key = String(col.key);
                            const isActive = internalSort.key === key;
                            return (
                                <th
                                    key={key}
                                    className={[
                                        cellPadding,
                                        "font-bold tracking-widest uppercase text-xs",
                                        alignMap[col.align ?? "left"],
                                        col.sortable
                                            ? "select-none cursor-pointer hover:text-text-primary transition-colors"
                                            : "",
                                        variant === "bordered" ? "border border-border" : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    style={{ width: col.width }}
                                    onClick={col.sortable ? () => handleSort(key) : undefined}
                                    aria-sort={
                                        isActive
                                            ? internalSort.direction === "asc"
                                                ? "ascending"
                                                : "descending"
                                            : "none"
                                    }
                                >
                                    <span className="inline-flex items-center gap-1">
                                        {col.header}
                                        {col.sortable && (
                                            <SortIcon direction={isActive ? internalSort.direction : null} />
                                        )}
                                    </span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                {/* ── Cuerpo ─────────────────────────────────────────────────────── */}
                <tbody className="overflorw-y-auto scrollbar-soft">
                    {/* Estado de carga */}
                    {loading &&
                        Array.from({ length: skeletonRows }).map((_, i) => (
                            <SkeletonRow key={i} cols={safeColumns.length} selectable={selectable} />
                        ))}

                    {/* Estado vacío */}
                    {!loading && sortedData.length === 0 && (
                        <EmptyState content={emptyState} />
                    )}

                    {/* Filas de datos */}
                    {!loading &&
                        sortedData.map((row, index) => {
                            const id = row[rowKey];
                            const isSelected = activeSelected.has(id);

                            return (
                                <tr
                                    key={String(id)}
                                    className={rowVariantClass(index, isSelected)}
                                    onClick={() => {
                                        onRowClick?.(row);
                                        if (selectable) toggleRow(id);
                                    }}
                                >
                                    {/* Checkbox individual */}
                                    {selectable && (
                                        <td className={cellPadding}>
                                            <Input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleRow(id)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="accent-accent w-4 h-4 rounded cursor-pointer"
                                                aria-label={`Seleccionar fila ${index + 1}`}
                                            />
                                        </td>
                                    )}

                                    {columns.map((col) => {
                                        const key = String(col.key);
                                        const value = col.render
                                            ? col.render(row, index)
                                            : String(row[col.key as keyof T] ?? "—");

                                        return (
                                            <td
                                                key={key}
                                                style={{ width: col.width }}
                                                className={[
                                                    cellPadding,
                                                    "text-text-primary",
                                                    alignMap[col.align ?? "left"],
                                                    variant === "bordered" ? "border border-border" : "",
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                            >
                                                {value}
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