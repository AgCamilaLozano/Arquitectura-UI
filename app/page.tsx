'use client'

import Table, { Column } from "@/components/ui/Table";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImage,
} from "@/components/ui/Card";
import { Button } from "@/components/ui";
import { ChatWidget } from "@/components/ChatBox";
import { GreekGodSkull, CascoSkull, SkullIcon, CascoFondoSkull, SkullOutline, CircleeSpigas } from '@/components/IconChat'

// ─── Tipo de dato ─────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

// ─── Datos de ejemplo ─────────────────────────────────────────────────────────

const USERS: User[] = [
  { id: 1, name: "Ana García", email: "ana@mail.com", role: "Admin", status: "active" },
  { id: 2, name: "Luis Pérez", email: "luis@mail.com", role: "Editor", status: "inactive" },
  { id: 3, name: "María López", email: "maria@mail.com", role: "Viewer", status: "active" },
];

// ─── Definición de columnas ───────────────────────────────────────────────────

const columns: Column<User>[] = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "email",
    label: "Correo",
  },
  {
    key: "role",
    label: "Rol",
    align: "center",
  },
  {
    key: "status",
    label: "Estado",
    align: "center",
    // Celda personalizada con badge de color
    render: (value) => {
      const isActive = value === "active";
      return (
        <span
          className={`
            inline-block px-2 py-0.5 rounded-full text-xs font-medium
            ${isActive
              ? "bg-success text-text-success"
              : "bg-error text-text-error"}
          `}
        >
          {isActive ? "Activo" : "Inactivo"}
        </span>
      );
    },
  },
];
const data = [
  { id: "1", name: "Proyecto Alpha", status: "Activo", amount: "$2,500.00" },
  { id: "2", name: "Estrategia UI", status: "Pendiente", amount: "$1,200.00" },
]


// ─── Uso en página ────────────────────────────────────────────────────────────

export default function UsersPage() {
  return (
    <div className="px-10 py-6">
      <h1 className="text-xl font-semibold text-text-primary mb-4">Usuarios</h1>
      <div className="fixed bottom-6 right-6 z-50">
        <ChatWidget />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className='rounded-full w-20 h-20 flex flex-col items-center justify-center'>
          <GreekGodSkull />
        </div>
        <div className='rounded-full w-20 h-20 flex flex-col items-center justify-center'>
          <CascoSkull />
        </div>
        <div className='rounded-full w-20 h-20 flex flex-col items-center justify-center'>
          <CascoFondoSkull />
        </div>
        <div className='rounded-full w-20 h-20 flex flex-col items-center justify-center'>
          <SkullIcon />
        </div>
        <div className='rounded-full w-20 h-20 flex flex-col items-center justify-center'>
          <SkullOutline />
        </div>

      </div>

    </div>
  );
}