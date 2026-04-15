"use client";

import { useState } from "react";
import Table, { Column } from "@/components/ui/DataDisplay/Table";
import { StatusBadge, StatusVariant } from "@/components/ui/Compuesto/Badges";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Base/Selects/select";
import { Button } from "@/components/ui/Base/Entradas";
import { Edit, Trash } from "lucide-react";
import { Tooltip } from "@/components/ui/Compuesto/Tooltip";
import { ChatWidget } from "@/components/Idt-Mascota/ChatBox";

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────

type UserStatus =
  | "aprobado"
  | "rechazado"
  | "proceso"
  | "pendiente";

type User = {
  id: number;
  name: string;
  status: UserStatus;
  accion?: boolean;
};

// ─────────────────────────────────────────────────────────────
// Mapping negocio → UI
// ─────────────────────────────────────────────────────────────

const statusMap: Record<
  UserStatus,
  { variant: StatusVariant; label: string }
> = {
  aprobado: { variant: "success", label: "Aprobado" },
  rechazado: { variant: "error", label: "Rechazado" },
  proceso: { variant: "info", label: "En proceso" },
  pendiente: { variant: "warning", label: "Pendiente" }
};

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const initialData: User[] = [
  { id: 1, name: "Camila", status: "pendiente" },
  { id: 2, name: "Juan", status: "proceso" },
  { id: 3, name: "Laura", status: "rechazado" },
  { id: 4, name: "Carlos", status: "aprobado" },
  { id: 5, name: "Camila", status: "pendiente" },
  { id: 6, name: "Juan", status: "proceso" },
  { id: 7, name: "Laura", status: "rechazado" },
  { id: 8, name: "Carlos", status: "aprobado" },
  { id: 9, name: "Camila", status: "proceso" },
  { id: 10, name: "Juan", status: "proceso" },
  { id: 11, name: "Laura", status: "rechazado" },
  { id: 12, name: "Carlos", status: "aprobado" },
  { id: 13, name: "Camila", status: "pendiente" },
  { id: 14, name: "Juan", status: "proceso" },
  { id: 15, name: "Laura", status: "rechazado" },
  { id: 16, name: "Carlos", status: "aprobado" },
];

// ─────────────────────────────────────────────────────────────
// Componentes
// ─────────────────────────────────────────────────────────────

function BusinessStatusBadge({ status }: { status: UserStatus }) {
  const config = statusMap[status];

  return (
    <StatusBadge
      status={config.variant}
      label={config.label}
      animated={status === "proceso"}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function Page() {
  const [users, setUsers] = useState<User[]>(initialData);

  const updateStatus = (id: number, newStatus: UserStatus) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  const columns: Column<User>[] = [
    {
      key: "name",
      header: "Usuario",
    },
    {
      key: "status",
      header: "Estado",
      render: (row) => <BusinessStatusBadge status={row.status} />,
    },
    {
      key: "edit",
      header: "Cambiar estado",
      render: (row) => (
        <Select
          value={row.status}
          onValueChange={(value) =>
            updateStatus(row.id, value as UserStatus)

          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione un nuevo estado." />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="activo" label="Activo">Activo</SelectItem>
            <SelectItem value="inactivo" label="Inactivo">Inactivo</SelectItem>
            <SelectItem value="aprobado" label="Aprobado">Aprobado</SelectItem>
            <SelectItem value="rechazado" label="Rechazado">Rechazado</SelectItem>
            <SelectItem value="proceso" label="En proceso">En proceso</SelectItem>
          </SelectContent>

        </Select>
      ),
    },
    {
      key: "accion",
      header: "Acción",
      render: (row) => (
        <Tooltip content="Editar" >
          <Button variant={'ghost'}>
            <Edit />
          </Button>
        </Tooltip>
      )
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">
        Table + Estados Dinámicos
      </h1>

      <p className="text-sm text-gray-500">
        Cambia el estado con el select y mira cómo el badge reacciona en tiempo real.
      </p>
      <div className="h-80 overflow-y-auto scrollbar-soft">
        <Table
          data={users}
          columns={columns}
          rowKey="id"
          stickyHeader
        />

      </div>
      <div className="h-20 w-20 float-right">
        <ChatWidget />
      </div>

    </div>
  );
}
