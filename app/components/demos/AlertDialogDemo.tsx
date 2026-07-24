"use client";

import { useState } from "react";
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
  Button,
} from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentShowcase title="AlertDialog" description="Modal de confirmacion para acciones criticas">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">Eliminar registro</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar registro</AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion es permanente y no se puede deshacer. El registro sera removido del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ComponentShowcase>
  );
}
