/**
 * Propósito: Componente reutilizable de tabla para mostrar datos tabulares
 * con soporte para estados de carga, vacío, ordenamiento y filas clickeables.
 *
 * Ubicación: /components/ui/Table.tsx
 */

import React from "react";

// ─── Tipos ───────────────────────────────────────────────────────────────────

/**
 * Definición de cada columna de la tabla.
 * @template T - Tipo del objeto de dato que representa cada fila
 */
export interface Column<T> {
    /** Clave del campo en el objeto de datos */
    key: keyof T | string;
    /** Etiqueta visible en el encabezado */
    label: string;
    /** Alineación del contenido de la celda */
    align?: "left" | "center" | "right";
    /** Ancho fijo de la columna (ej. "120px" o "20%") */
    width?: string;
    /** Renderizado personalizado para la celda */
    render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

/**
 * Props del componente Table.
 * @template T - Tipo del objeto de dato que representa cada fila
 */
export interface TableProps<T> {
    /** Definición de las columnas */
    columns: Column<T>[];
    /** Arreglo de datos a mostrar */
    data: T[];
    /** Clave única de cada fila (debe ser un campo del objeto) */
    rowKey: keyof T;
    /** Muestra esqueleto de carga cuando es true */
    loading?: boolean;
    /** Mensaje o nodo cuando no hay datos */
    emptyMessage?: React.ReactNode;
    /** Callback al hacer click en una fila */
    onRowClick?: (row: T, index: number) => void;
    /** Clases adicionales para el contenedor externo */
    className?: string;
}

// ─── Esqueleto de carga ───────────────────────────────────────────────────────

/** Fila de placeholder animada mientras se cargan los datos */
const SkeletonRow = ({ columns }: { columns: number }) => (
    <tr className="border-b border-border animate-pulse">
        {Array.from({ length: columns }).map((_, i) => (
            <td key={i} className="px-4 py-3">
                <div className="h-4 rounded bg-muted" />
            </td>
        ))}
    </tr>
);

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * Tabla genérica y reutilizable.
 *
 * Props:
 *  - columns   → define las columnas (clave, etiqueta, render opcional)
 *  - data      → arreglo de objetos tipados
 *  - rowKey    → campo que actúa como id único por fila
 *  - loading   → muestra filas esqueleto
 *  - emptyMessage → contenido cuando no hay datos
 *  - onRowClick   → callback al seleccionar una fila
 *  - className    → clases extra para el wrapper
 *
 * Lógica clave:
 *  - Usa Column.render para celdas personalizadas; si no existe, muestra el valor plano.
 *  - Cuando `onRowClick` está definido, el cursor cambia a pointer y se aplica hover.
 *  - Los tokens de color provienen del design system (bg-surface, border-border, etc.)
 */
function Table<T extends Record<string, unknown>>({
    columns,
    data,
    rowKey,
    loading = false,
    emptyMessage = "No hay datos para mostrar.",
    onRowClick,
    className = "",
}: TableProps<T>) {
    // Lógica: resuelve el valor de una celda dado la clave y el objeto
    const getCellValue = (row: T, key: keyof T | string): unknown => {
        return (row as Record<string, unknown>)[key as string];
    };

    const isClickable = Boolean(onRowClick);

    return (
        <div
            className={`w-full overflow-x-auto rounded-md border border-border bg-background shadow-[var(--shadow-card)] ${className}`}
        >
            <table className="w-full text-sm text-text-primary border-collapse">
                {/* ── Encabezado ── */}
                <thead>
                    <tr className="border-b border-border bg-muted">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                style={{ width: col.width }}
                                className={`
                                  px-4 py-3 font-semibold text-text-secondary uppercase tracking-wide text-xs
                                  ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}
                                `}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* ── Cuerpo ── */}
                <tbody>
                    {/* Estado: cargando */}
                    {loading &&
                        Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonRow key={i} columns={columns.length} />
                        ))}

                    {/* Estado: sin datos */}
                    {!loading && data.length === 0 && (
                        <tr className="bg-background">
                            <td
                                colSpan={columns.length}
                                className="px-4 py-10 text-center text-text-muted"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}

                    {/* Estado: con datos */}
                    {!loading &&
                        data.map((row, rowIndex) => (
                            <tr
                                key={String(row[rowKey])}
                                onClick={isClickable ? () => onRowClick!(row, rowIndex) : undefined}
                                className={`
                                  border-b border-border last:border-0 transition-colors bg-background
                                  ${isClickable ? "cursor-pointer hover:bg-accent-soft" : ""}
                                `}
                            >
                                {columns.map((col) => {
                                    const rawValue = getCellValue(row, col.key);
                                    return (
                                        <td
                                            key={String(col.key)}
                                            className={`px-4 py-3
                                              ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}
                                            `}
                                        >
                                            {col.render
                                                ? col.render(rawValue, row, rowIndex)
                                                : String(rawValue ?? "—")}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;