"use client";

import * as React from "react";
import { cn } from "@/src/utils/utils";
import { Skeleton } from "@/src/primitives/skeleton";

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
  sm: "py-2 px-3 text-caption",
  md: "py-3 px-4 text-body-dense",
  lg: "py-4 px-6 text-body-base",
};

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  (
    {
      className,
      data = [],
      columns = [],
      maxHeight = "70vh",
      rowKey,
      emptyState,
      isLoading = false,
      headerVariant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
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
          "relative w-full overflow-hidden rounded-sm border border-border bg-background flex flex-col shadow-xs font-sans",
          className
        )}
        {...props}
      >
        <div
          className="scrollbar-soft overflow-auto w-full h-auto"
          style={{ maxHeight }}
        >
          <table className="w-full text-left border-collapse text-text-primary">
            {/* ── ENCABEZADOS DE TABLA (STICKY) ── */}
            <thead
              className={cn(
                "sticky top-0 z-20 select-none border-b border-border transition-colors duration-150 font-sans",
                isAccent
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-text-secondary"
              )}
            >
              {/* Fila de Grupos Estructurales */}
              {hasGroups && (
                <tr className="border-b border-border/50">
                  {groupedHeaders.map((g, idx) => (
                    <th
                      key={`group-${g.label}-${idx}`}
                      colSpan={g.span}
                      scope="colgroup"
                      className={cn(
                        "py-1.5 px-3 text-center font-bold text-caption tracking-wider uppercase whitespace-nowrap",
                        idx !== 0 && "border-l border-border/40",
                        isAccent ? "text-accent-foreground/90" : "text-accent"
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
                  const isFirstInGroup =
                    col.group && (i === 0 || columns[i - 1].group !== col.group);

                  return (
                    <th
                      key={col.key}
                      scope="col"
                      className={cn(
                        "font-semibold text-body-dense tracking-tight whitespace-nowrap align-middle h-10",
                        isFirstInGroup && i !== 0 && "border-l border-border/40",
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
                /* Fila Animada Automática (Skeleton Progress) */
                Array.from({ length: 5 }).map((_, rowIdx) => (
                  <tr
                    key={`skeleton-row-${rowIdx}`}
                    className="border-b border-border last:border-0"
                  >
                    {columns.map((col) => (
                      <td
                        key={`skeleton-cell-${col.key}`}
                        className={cellPaddingClass}
                      >
                        <Skeleton className="h-4 w-2/3 rounded-sm" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 px-4 text-center text-text-secondary font-sans font-normal text-body-base"
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
                      className="transition-colors duration-150 hover:bg-surface font-sans border-b border-border last:border-0"
                    >
                      {columns.map((col, i) => {
                        const isFirstInGroup =
                          col.group && (i === 0 || columns[i - 1].group !== col.group);

                        return (
                          <td
                            key={col.key}
                            className={cn(
                              "align-middle tracking-tight text-text-primary font-normal",
                              isFirstInGroup && i !== 0 && "border-l border-border/40",
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
) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(DataTable as any).displayName = "DataTable";