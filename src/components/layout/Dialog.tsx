"use client";

import * as React from "react";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/src/primitives";
import { cn } from "@/src/utils/utils";


/* ==========================================================================
   TIPOS & PROPIEDADES
   ========================================================================== */

export type DialogVariant = "default" | "destructive" | "warning" | "info";
export type DialogSize = "sm" | "md" | "lg" | "xl";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  variant?: DialogVariant;
  size?: DialogSize;
  closeOnOverlay?: boolean;
  hideCloseButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

interface DialogContextValue {
  variant: DialogVariant;
}

const DialogContext = React.createContext<DialogContextValue>({
  variant: "default",
});

export const useDialogContext = () => React.useContext(DialogContext);

/* ==========================================================================
   COMPONENTE RAÍZ: DIALOG
   ========================================================================== */

export function Dialog({
  open,
  onClose,
  variant = "default",
  size = "md",
  closeOnOverlay = true,
  hideCloseButton = false,
  className = "",
  children,
}: DialogProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
    >
      <DialogPrimitive.Portal>
        {/* Backdrop / Overlay esmerilado adaptable */}
        <DialogPrimitive.Overlay
          onClick={!closeOnOverlay ? (e) => e.preventDefault() : undefined}
          className={cn(
            "fixed inset-0 z-50 bg-black/60",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
          )}
        />

        {/* Contenedor centrador fijo */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <DialogPrimitive.Content
            className={cn(
              "relative w-full pointer-events-auto bg-background rounded-sm overflow-hidden border border-border shadow-card",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
              "font-sans text-text-primary",
              sizeClasses[size],
              className
            )}
          >
            {!hideCloseButton && (
              <DialogPrimitive.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Cerrar ventana"
                  className="absolute top-4 right-4 size-8 text-text-secondary hover:text-text-primary z-20 focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-0"
                >
                  <X className="size-4" />
                </Button>
              </DialogPrimitive.Close>
            )}

            <DialogContext.Provider value={{ variant }}>
              {children}
            </DialogContext.Provider>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* ==========================================================================
   SUBCOMPONENTE: DIALOG HEADER
   ========================================================================== */

export interface DialogHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  withDivider?: boolean;
  className?: string;
}

/* Consumo estricto de tokens HSL (globals.css v2.0) */
const variantIconBg: Record<DialogVariant, string> = {
  default: "bg-accent-soft text-accent border border-accent/20",
  destructive: "bg-destructive/15 text-destructive border border-destructive/20",
  warning: "bg-warning/15 text-warning border border-warning/20",
  info: "bg-accent-soft text-accent border border-accent/20",
};

export function DialogHeader({
  title,
  description,
  icon,
  withDivider = false,
  className = "",
}: DialogHeaderProps) {
  const { variant } = useDialogContext();

  return (
    <div
      className={cn(
        "px-6 pt-6 flex flex-col relative",
        withDivider ? "pb-4 border-b border-border" : "pb-2",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <span
            className={cn(
              "flex items-center justify-center size-10 rounded-sm shrink-0 transition-colors",
              variantIconBg[variant]
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        <div className="flex-1 min-w-0 pr-6">
          <DialogPrimitive.Title asChild>
            <h2 className="font-heading font-semibold text-heading-lg leading-snug text-text-primary tracking-tight">
              {title}
            </h2>
          </DialogPrimitive.Title>

          {description && (
            <DialogPrimitive.Description asChild>
              <p className="mt-1 text-body-dense text-text-secondary leading-relaxed font-sans">
                {description}
              </p>
            </DialogPrimitive.Description>
          )}
        </div>
      </div>
    </div>
  );
}
DialogHeader.displayName = "DialogHeader";

/* ==========================================================================
   SUBCOMPONENTE: DIALOG BODY
   ========================================================================== */

export interface DialogBodyProps {
  scrollable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function DialogBody({
  scrollable = false,
  className = "",
  children,
}: DialogBodyProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 text-body-dense text-text-primary font-sans leading-relaxed",
        scrollable && "overflow-y-auto max-h-[55vh] scrollbar-soft",
        className
      )}
    >
      {children}
    </div>
  );
}
DialogBody.displayName = "DialogBody";

/* ==========================================================================
   SUBCOMPONENTE: DIALOG FOOTER
   ========================================================================== */

export interface DialogFooterProps {
  align?: "left" | "center" | "right" | "between";
  withDivider?: boolean;
  className?: string;
  children: React.ReactNode;
}

const footerAlignClasses: Record<
  NonNullable<DialogFooterProps["align"]>,
  string
> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

export function DialogFooter({
  align = "right",
  withDivider = true,
  className = "",
  children,
}: DialogFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center flex-wrap gap-2 px-6 pb-5 pt-4 relative font-sans",
        withDivider && "border-t border-border",
        footerAlignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}
DialogFooter.displayName = "DialogFooter";