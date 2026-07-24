"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function DropdownMenuDemo() {
  return (
    <ComponentShowcase title="DropdownMenu" description="Menu desplegable con grupos e items">
      <DropdownMenu
        trigger={<span>Abrir menu</span>}
        groups={[
          {
            groupLabel: "Cuenta",
            items: [
              { label: "Mi perfil", onClick: () => {} },
              { label: "Configuracion", onClick: () => {} },
            ],
          },
          {
            items: [
              { label: "Cerrar sesion", variant: "danger", onClick: () => {} },
            ],
          },
        ]}
      />
    </ComponentShowcase>
  );
}
