"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function BreadcrumbDemo() {
  return (
    <ComponentShowcase title="Breadcrumb" description="Navegacion de migas de pan jerarquica">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Componentes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-text-primary font-medium">Breadcrumb</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </ComponentShowcase>
  );
}
