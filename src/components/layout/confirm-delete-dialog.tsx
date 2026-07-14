"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/layout/alert-dialog";
import { buttonVariants } from "@/src/primitives/button/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/src/utils/utils";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  itemName?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title = "Confirmar eliminacion",
  description,
  itemName,
  onConfirm,
  loading = false,
}: ConfirmDeleteDialogProps) {
  const desc =
    description ??
    (itemName
      ? `Se eliminara "${itemName}". Esta accion no se puede deshacer.`
      : "Esta accion no se puede deshacer.");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
