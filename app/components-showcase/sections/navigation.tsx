"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";
import { Pagination } from "@/lib/components/ui/Groups/pagination";

export function NavigationSection() {
  const [page, setPage] = useState(1);

  return (
    <SectionLayout id="navigation" title="Navegación" description="Breadcrumb y Pagination.">
      <ComponentDemo
        name="Breadcrumb"
        description="Navegación de migas de pan con separadores"
        code={`import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@agustin/ui/components";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/proyectos">Proyectos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Detalle</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/proyectos">Proyectos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detalle del proyecto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentDemo>

      <ComponentDemo
        name="Pagination"
        description="Paginador con lógica de ellipsis para muchas páginas"
        props={[
          { name: "page", type: "number", description: "Página actual (requerido)" },
          { name: "totalPages", type: "number", description: "Total de páginas (requerido)" },
          { name: "onPageChange", type: "(page: number) => void", description: "Callback de cambio (requerido)" },
        ]}
        code={`import { Pagination } from "@/lib/components/ui/Groups/pagination";

<Pagination page={1} totalPages={10} onPageChange={setPage} />`}
      >
        <div className="space-y-3">
          <Pagination page={page} totalPages={10} onPageChange={setPage} />
          <p className="text-xs text-text-muted">Página actual: {page}</p>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
