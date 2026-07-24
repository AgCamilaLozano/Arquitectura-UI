"use client";

import { ShowcaseHeader } from "./_components/ShowcaseHeader";
import { CategorySection } from "./_components/CategorySection";
import { TenantSection } from "./_components/TenantSection";
import { LabelBadge } from "@agustin/ui";

import { ButtonDemo } from "./demos/ButtonDemo";
import { InputDemo } from "./demos/InputDemo";
import { TextareaDemo } from "./demos/TextareaDemo";
import { SelectDemo } from "./demos/SelectDemo";
import { CheckboxDemo } from "./demos/CheckboxDemo";
import { SwitchDemo } from "./demos/SwitchDemo";
import { RadioGroupDemo } from "./demos/RadioGroupDemo";
import { PasswordInputDemo } from "./demos/PasswordInputDemo";
import { CardDemo } from "./demos/CardDemo";
import { SeparatorDemo } from "./demos/SeparatorDemo";
import { TabsDemo } from "./demos/TabsDemo";
import { CollapsibleDemo } from "./demos/CollapsibleDemo";
import { BreadcrumbDemo } from "./demos/BreadcrumbDemo";
import { PaginationDemo } from "./demos/PaginationDemo";
import { DropdownMenuDemo } from "./demos/DropdownMenuDemo";
import { TooltipDemo } from "./demos/TooltipDemo";
import { DialogDemo } from "./demos/DialogDemo";
import { AlertDialogDemo } from "./demos/AlertDialogDemo";
import { SheetDemo } from "./demos/SheetDemo";
import { EmptyStateDemo } from "./demos/EmptyStateDemo";
import { SkeletonDemo } from "./demos/SkeletonDemo";
import { AvatarDemo } from "./demos/AvatarDemo";
import { LabelBadgeDemo } from "./demos/LabelBadgeDemo";
import { DataTableDemo } from "./demos/DataTableDemo";
import { PopoverDemo } from "./demos/PopoverDemo";
import { GraficaBarDemo } from "./demos/GraficaBarDemo";
import { GraficaDonutDemo } from "./demos/GraficaDonutDemo";
import { GraficaLineDemo } from "./demos/GraficaLineDemo";
import { CalendarDemo } from "./demos/CalendarDemo";
import { CalendarInputDemo } from "./demos/CalendarInputDemo";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ShowcaseHeader />

      {/* Hero */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <LabelBadge className="mb-4" color="accent" label="Design System & Component Library" />
          <h1 className="text-4xl font-bold font-heading text-text-primary tracking-tight">
            Component Library
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary">
            Explora todos los componentes del design system @agustin/ui. Cada demo incluye
            controles interactivos para probar variantes, tamanios y estados en tiempo real.
          </p>
        </div>
      </section>

      {/* Componentes */}
      <main className="mx-auto max-w-7xl space-y-16 px-6 py-12">

        <CategorySection
          id="action"
          title="Action"
          description="Botones y elementos de interaccion"
        >
          <ButtonDemo />
        </CategorySection>

        <CategorySection
          id="form"
          title="Form"
          description="Campos de entrada y controles de formulario"
        >
          <InputDemo />
          <TextareaDemo />
          <SelectDemo />
          <CheckboxDemo />
          <SwitchDemo />
          <RadioGroupDemo />
          <PasswordInputDemo />
        </CategorySection>

        <CategorySection
          id="layout"
          title="Layout"
          description="Contenedores, divisores y estructura visual"
        >
          <CardDemo />
          <SeparatorDemo />
          <TabsDemo />
          <CollapsibleDemo />
        </CategorySection>

        <CategorySection
          id="navigation"
          title="Navigation"
          description="Navegacion, paginacion y menus"
        >
          <BreadcrumbDemo />
          <PaginationDemo />
          <DropdownMenuDemo />
        </CategorySection>

        <CategorySection
          id="feedback"
          title="Feedback"
          description="Modales, tooltips, alertas y estados de carga"
        >
          <TooltipDemo />
          <DialogDemo />
          <AlertDialogDemo />
          <SheetDemo />
          <EmptyStateDemo />
          <SkeletonDemo />
        </CategorySection>

        <CategorySection
          id="data"
          title="Data Display"
          description="Avatares, badges, tablas y contenido flotante"
        >
          <AvatarDemo />
          <LabelBadgeDemo />
          <DataTableDemo />
          <PopoverDemo />
        </CategorySection>

        <CategorySection
          id="charts"
          title="Charts"
          description="Graficas para visualizacion de datos"
        >
          <GraficaBarDemo />
          <GraficaDonutDemo />
          <GraficaLineDemo />
        </CategorySection>

        <CategorySection
          id="date"
          title="Date/Time"
          description="Calendarios y selectores de fecha"
        >
          <CalendarDemo />
          <CalendarInputDemo />
        </CategorySection>

        <TenantSection />

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/30 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs text-text-muted">
            @agustin/ui Design System &middot; Component Library Showcase
          </p>
        </div>
      </footer>
    </div>
  );
}
