"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

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

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPages(page, totalPages);

  return (
    <div className={cn("flex items-center justify-center gap-0.5 py-4", className)}>
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Página anterior"
        className={cn(
          "h-8 px-2.5 text-sm rounded-md transition-colors duration-150",
          "text-text-secondary hover:text-text-primary hover:bg-muted",
          "disabled:opacity-30 disabled:pointer-events-none",
        )}
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-8 text-center text-sm text-text-muted select-none"
          >
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-label={`Página ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "h-8 w-8 text-sm rounded-md transition-colors duration-150",
              p === page
                ? "bg-accent text-white font-medium"
                : "text-text-secondary hover:text-text-primary hover:bg-muted",
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Página siguiente"
        className={cn(
          "h-8 px-2.5 text-sm rounded-md transition-colors duration-150",
          "text-text-secondary hover:text-text-primary hover:bg-muted",
          "disabled:opacity-30 disabled:pointer-events-none",
        )}
      >
        →
      </button>
    </div>
  );
}
