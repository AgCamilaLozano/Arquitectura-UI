"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/lib/components/ui/skeleton";

export interface Column<T> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  render?: (row: T) => React.ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
  group?: string;
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: Column<T>[];
  maxHeight?: string;
  rowKey: keyof T;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  headerVariant?: "default" | "accent";
  size?: "sm" | "md" | "lg";
}

function getCellValue<T>(row: T, col: Column<T>): React.ReactNode {
  if (col.render) return col.render(row);
  if (!col.accessor) return null;
  if (typeof col.accessor === "function") return col.accessor(row);
  return row[col.accessor] as React.ReactNode;
}

const paddingClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "py-2 px-3 text-xs",
  md: "p-4 text-sm",
  lg: "py-5 px-6 text-base",
};

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  ({ className, data = [], columns = [], maxHeight = "70vh", rowKey, emptyState, isLoading = false, headerVariant = "default", size = "md", ...props }, ref) => {

    // Procesamiento optimizado del agrupamiento lineal de cabeceras macro
    const groupedHeaders = React.useMemo(() => {
      const result: { label: string; start: number; span: number }[] = [];
      let i = 0;
      while (i < columns.length) {
        const col = columns[i];
        if (col.group) {
          let span = 0;
          while (i < columns.length && columns[i].group === col.group) {
            span++;
            i++;
          }
          result.push({ label: col.group, start: i - span, span });
        } else {
          result.push({ label: "", start: i, span: 1 });
          i++;
        }
      }
      return result;
    }, [columns]);

    const hasGroups = React.useMemo(() => columns.some((c) => c.group), [columns]);
    const cellPaddingClass = paddingClasses[size] ?? paddingClasses.md;
    const isAccent = headerVariant === "accent";

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-md border border-border bg-background flex flex-col shadow-xs",
          className
        )}
        {...props}
      >
        <div
          className="scrollbar-soft overflow-auto w-full h-auto"
          style={{ maxHeight }}
        >
          <table className="w-full text-sm text-left border-collapse font-sans text-text-primary">
            
            {/* ── ENCABEZADOS DE TABLA (STICKY) ── */}
            <thead 
              className={cn(
                "sticky top-0 z-20 font-heading select-none border-b border-border transition-colors duration-150",
                isAccent ? "bg-accent text-white" : "bg-surface text-text-secondary"
              )}
            >
              {/* Fila de Grupos Estructurales (ej: Datos del Contratista, Montos Totales) */}
              {hasGroups && (
                <tr className="border-b border-border/50">
                  {groupedHeaders.map((g, idx) => (
                    <th
                      key={`group-${g.label}-${idx}`}
                      colSpan={g.span}
                      className={cn(
                        "py-2 px-4 text-center font-bold text-[10px] tracking-wider uppercase whitespace-nowrap",
                        idx !== 0 && "border-l border-border/30",
                        isAccent ? "text-white/90" : "text-accent label-mono"
                      )}
                    >
                      {g.label}
                    </th>
                  ))}
                </tr>
              )}

              {/* Fila de Columnas Individuales */}
              <tr className="border-b border-border">
                {columns.map((col, i) => {
                  const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);
                  
                  return (
                    <th
                      key={col.key}
                      className={cn(
                        "font-semibold text-xs tracking-tight whitespace-nowrap align-middle h-10",
                        isFirstInGroup && i !== 0 && "border-l border-border/30",
                        cellPaddingClass
                      )}
                      style={{
                        textAlign: col.align ?? "left",
                        width: col.width ?? "auto",
                        minWidth: col.width ?? "110px",
                      }}
                    >
                      {col.header}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* ── CUERPO DE DATOS TRANSPARENTE ── */}
            <tbody className="divide-y divide-border bg-background">
              {isLoading ? (
                /* Fila Animada Automática (Skeleton Progress) sin saltos visuales de CLS [cite: 1754, 1755] */
                Array.from({ length: 5 }).map((_, rowIdx) => (
                  <tr key={`skeleton-row-${rowIdx}`} className="border-b border-border last:border-0">
                    {columns.map((col) => (
                      <td key={`skeleton-cell-${col.key}`} className={cellPaddingClass}>
                        <Skeleton className="h-4 w-2/3 rounded-sm" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 px-4 text-center text-text-muted font-sans font-normal"
                  >
                    {emptyState ?? "No se encontraron registros en este módulo."}
                  </td>
                </tr>
              ) : (
                data.map((row) => {
                  const key = String(row[rowKey]);

                  return (
                    <tr
                      key={key}
                      className="transition-colors duration-150 hover:bg-muted/30 font-sans border-b border-border last:border-0"
                    >
                      {columns.map((col, i) => {
                        const isFirstInGroup = col.group && (i === 0 || columns[i - 1].group !== col.group);

                        return (
                          <td
                            key={col.key}
                            className={cn(
                              "align-middle tracking-tight text-text-primary font-normal",
                              isFirstInGroup && i !== 0 && "border-l border-border/30",
                              cellPaddingClass
                            )}
                            style={{ textAlign: col.align ?? "left" }}
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
      </div>
    );
  }
) as <T>(props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) => React.ReactElement;

(DataTable as any).displayName = "DataTable";