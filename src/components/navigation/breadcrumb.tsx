import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/src/utils/utils"



/* ==========================================================================
   COMPONENTE RAÍZ: BREADCRUMB
   ========================================================================== */

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/* ==========================================================================
   LISTA DE BREADCRUMBS
   ========================================================================== */

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 font-sans text-body-dense text-text-muted text-sm break-words sm:gap-2",
        className
      )}
      {...props}
    />
  );
}

/* ==========================================================================
   ÍTEM DE BREADCRUMB
   ========================================================================== */

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

/* ==========================================================================
   ENLACE DE BREADCRUMB (POLIMÓRFICO CON RADIX SLOT)
   ========================================================================== */

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "transition-colors duration-150 hover:text-text-primary outline-none rounded-xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  );
}

/* ==========================================================================
   PÁGINA ACTUAL (ESTADO INACTIVO DE NAVEGACIÓN / RECURSO ACTIVO)
   ========================================================================== */

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-medium text-text-primary select-none", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("text-text-secondary/50 text-xs select-none", className)}
      {...props}
    >
      {children ?? <span aria-hidden="true">›</span>}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center text-text-secondary", className)}
      {...props}
    >
      <span className="text-sm select-none">···</span>
      <span className="sr-only">More</span>
    </span>
  )
}


export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};