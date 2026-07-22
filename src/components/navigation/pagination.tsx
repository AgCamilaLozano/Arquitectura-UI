"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/src/utils/utils";
import { Button } from "@/src/primitives";

/* ==========================================================================
   TIPOS & INTERFACES
   ========================================================================== */

export interface PaginationProps extends React.ComponentProps<"nav"> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
}

/* ==========================================================================
   HELPER DE CÁLCULO DE PÁGINAS
   ========================================================================== */

function getPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const result: (number | "…")[] = [1];
  if (current > 3) result.push("…");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) result.push(i);
  if (current < total - 2) result.push("…");
  result.push(total);
  return result;
}

/* ==========================================================================
   COMPONENTE PRINCIPAL: PAGINATION
   ========================================================================== */

export function Pagination({
  page,
  totalPages,
  onPageChange,
  showFirstLast = false,
  className,
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPages(page, totalPages);

  return (
    <nav
      role="navigation"
      aria-label="Paginación"
      className={cn(
        "flex items-center justify-center gap-1 py-4 font-sans text-body-dense",
        className
      )}
      {...props}
    >
      {/* ── BOTÓN: PRIMERA PÁGINA (OPCIONAL) ── */}
      {showFirstLast && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
          aria-label="Ir a la primera página"
          className="size-9 text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-30"
        >
           ←
        </Button>
      )}

      {/* ── BOTÓN: PÁGINA ANTERIOR ── */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Ir a la página anterior"
        className="size-9 text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-30"
      >
         ←
      </Button>

      {/* ── LISTADO DE NÚMEROS Y PUNTOS DE SUSPENSIÓN ── */}
      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex size-9 items-center justify-center text-text-secondary/60 select-none"
              aria-hidden="true"
            >
              <MoreHorizontal className="size-4" />
            </span>
          ) : (
            <button
              type="button"
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Página ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "inline-flex size-8 text-xs items-center justify-center rounded-sm font-medium text-body-dense transition-all duration-150 outline-none select-none",
                /* Física de Enfoque Unificada (Glow Effect) */
                "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
                p === page
                  ? "bg-accent text-accent-foreground font-semibold shadow-2xs"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              )}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* ── BOTÓN: PÁGINA SIGUIENTE ── */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Ir a la página siguiente"
        className="size-9 text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-30"
      >
        →
      </Button>

      {/* ── BOTÓN: ÚLTIMA PÁGINA (OPCIONAL) ── */}
      {showFirstLast && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="Ir a la última página"
          className="size-9 text-text-secondary hover:text-text-primary hover:bg-surface disabled:opacity-30"
        >
          <ChevronsRight className="size-4" aria-hidden="true" />
        </Button>
      )}
    </nav>
  );
}
