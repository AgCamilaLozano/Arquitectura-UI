"use client";

import { useState } from "react";
import { Pagination } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  return (
    <ComponentShowcase title="Pagination" description="Navegacion paginada de registros">
      <div className="w-full">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">page: {page}</label>
        </div>
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">totalPages: {totalPages}</label>
          <input type="range" min={1} max={20} value={totalPages} onChange={(e) => { setTotalPages(Number(e.target.value)); setPage(1); }} className="block accent-accent" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
