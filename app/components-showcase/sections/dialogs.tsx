"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/lib/components/ui/Compuesto/Contenedores/Dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/lib/components/ui/Compuesto/Contenedores/alert-dialog";
import { ConfirmDeleteDialog } from "@/lib/components/ui/Compuesto/Contenedores/confirm-delete-dialog";
import { Button } from "@/lib/components/ui/Base/Entradas";
import { Info, AlertTriangle } from "lucide-react";

const dialogVariants = ["default", "destructive", "warning", "info"] as const;
const dialogSizes = ["sm", "md", "lg", "xl"] as const;

export function DialogsSection() {
  const [open, setOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState<string>("default");
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <SectionLayout id="dialogs" title="Dialogs & Modals" description="Dialog, AlertDialog y ConfirmDeleteDialog.">
      <ComponentDemo
        name="Dialog"
        description="Modal principal con Header, Body y Footer"
        props={[
          { name: "open", type: "boolean", description: "Estado abierto (requerido)" },
          { name: "onClose", type: "() => void", description: "Callback de cierre (requerido)" },
          { name: "variant", type: '"default" | "destructive" | "warning" | "info"', default: '"default"' },
          { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"' },
          { name: "closeOnOverlay", type: "boolean", default: "true" },
          { name: "hideCloseButton", type: "boolean", default: "false" },
        ]}
        code={`import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@agustin/ui/components";

<Dialog open={open} onClose={() => setOpen(false)} variant="default" size="md">
  <DialogHeader title="Título" description="Descripción" icon={<Info />} withDivider />
  <DialogBody>
    <p>Contenido del diálogo</p>
  </DialogBody>
  <DialogFooter>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button onClick={() => setOpen(false)}>Confirmar</Button>
  </DialogFooter>
</Dialog>`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {dialogVariants.map((v) => (
              <Button
                key={v}
                variant={activeVariant === v ? "default" : "outline"}
                size="sm"
                onClick={() => { setActiveVariant(v); setOpen(true); }}
              >
                {v}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {dialogSizes.map((s) => (
              <Button
                key={s}
                variant="secondary"
                size="sm"
                onClick={() => { setActiveVariant("default"); setOpen(true); }}
              >
                Size: {s}
              </Button>
            ))}
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="AlertDialog"
        description="Diálogo de confirmación de acción peligrosa"
        code={`import { AlertDialog, AlertDialogTrigger, AlertDialogContent, ... } from "@/lib/components/ui/Compuesto/Contenedores/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Eliminar</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
      <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Eliminar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Abrir AlertDialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminarán permanentemente los datos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ComponentDemo>

      <ComponentDemo
        name="ConfirmDeleteDialog"
        description="Diálogo de confirmación de eliminación pre-armado"
        props={[
          { name: "open", type: "boolean", description: "Estado abierto (requerido)" },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback de cambio de estado" },
          { name: "title", type: "string", default: '"Confirmar eliminacion"' },
          { name: "itemName", type: "string", description: "Nombre del item a eliminar" },
          { name: "onConfirm", type: "() => void", description: "Callback de confirmación" },
          { name: "loading", type: "boolean", default: "false" },
        ]}
        code={`import { ConfirmDeleteDialog } from "@/lib/components/ui/Compuesto/Contenedores/confirm-delete-dialog";

<ConfirmDeleteDialog
  open={open}
  onOpenChange={setOpen}
  itemName="Usuario #123"
  onConfirm={() => { /* delete */ setOpen(false); }}
/>`}
      >
        <div className="space-y-3">
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Eliminar elemento
          </Button>
          <ConfirmDeleteDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            itemName="Usuario #123"
            onConfirm={() => setConfirmOpen(false)}
          />
        </div>
      </ComponentDemo>

      <Dialog open={open} onClose={() => setOpen(false)} variant={activeVariant as "default"} size="md">
        <DialogHeader
          title={`Dialog ${activeVariant}`}
          description={`Este es un diálogo con variante "${activeVariant}"`}
          icon={<Info className="w-5 h-5" />}
          withDivider
        />
        <DialogBody>
          <p className="text-sm text-text-secondary">
            Contenido del diálogo. Puedes cerrar con Escape o haciendo clic fuera.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => setOpen(false)}>Confirmar</Button>
        </DialogFooter>
      </Dialog>
    </SectionLayout>
  );
}
