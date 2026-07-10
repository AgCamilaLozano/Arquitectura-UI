"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { DropdownMenu, type DropdownGroup } from "@/lib/components/ui/Compuesto/dropdown-menu";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Trash2,
  HelpCircle,
} from "lucide-react";

const menuConfig: DropdownGroup[] = [
  {
    groupLabel: "Mi Cuenta",
    items: [
      {
        label: "Perfil",
        icon: <User className="size-4" />,
        trailingIcon: <span className="text-xs opacity-50">⌘P</span>,
        onClick: () => console.log("Ir al perfil"),
      },
      {
        label: "Facturación",
        icon: <CreditCard className="size-4" />,
        onClick: () => console.log("Ver facturas"),
        separator: true,
      },
    ],
  },
  {
    groupLabel: "Configuración",
    items: [
      {
        label: "Ajustes del Sistema",
        icon: <Settings className="size-4" />,
        onClick: () => console.log("Abrir ajustes"),
      },
      {
        label: "Soporte Técnico",
        icon: <HelpCircle className="size-4" />,
        disabled: true,
      },
    ],
  },
  {
    items: [
      {
        label: "Eliminar Espacio",
        icon: <Trash2 className="size-4" />,
        variant: "danger",
        onClick: () => alert("¿Seguro?"),
      },
      {
        label: "Cerrar Sesión",
        icon: <LogOut className="size-4" />,
        onClick: () => console.log("Logout"),
      },
    ],
  },
];

export function DropdownMenuSection() {
  return (
    <SectionLayout id="dropdown-menu" title="Dropdown Menu" description="Menú desplegable con grupos, ítems, iconos y variantes.">
      <ComponentDemo
        name="DropdownMenu"
        description="Menú con grupos, items, iconos, disabled, danger variant y separators"
        props={[
          { name: "trigger", type: "ReactNode", description: "Elemento trigger (requerido)" },
          { name: "groups", type: "DropdownGroup[]", description: "Grupos de items (requerido)" },
          { name: "align", type: '"start" | "end" | "center"', default: '"start"' },
          { name: "width", type: "string", default: '"w-52"' },
          { name: "disabled", type: "boolean", default: "false" },
        ]}
        code={`import { DropdownMenu } from "@agustin/ui/components";

<DropdownMenu
  trigger={<span>Abrir menú</span>}
  groups={[
    {
      groupLabel: "Acciones",
      items: [
        { label: "Perfil", icon: <User className="size-4" /> },
        { label: "Eliminar", variant: "danger", onClick: () => {} },
      ],
    },
  ]}
/>`}
      >
        <div className="flex flex-wrap gap-4">
          <DropdownMenu
            trigger={<span className="font-medium cursor-pointer">Menú completo</span>}
            width="w-64"
            groups={menuConfig}
          />
          <DropdownMenu
            trigger={<span className="font-medium cursor-pointer">Menú simple</span>}
            width="w-48"
            groups={[
              {
                items: [
                  { label: "Opción 1", onClick: () => console.log("1") },
                  { label: "Opción 2", onClick: () => console.log("2") },
                  { label: "Peligro", variant: "danger", onClick: () => console.log("3") },
                ],
              },
            ]}
          />
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
