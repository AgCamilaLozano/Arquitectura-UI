"use client";

import * as React from "react";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/lib/components/ui/Base/Entradas/button";
import { cn } from "@/lib/utils";

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
const DialogContext = React.createContext<DialogContextValue>({ variant: "default" });
export const useDialogContext = () => React.useContext(DialogContext);

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
    <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPrimitive.Portal>
        
        {/* Backdrop / Overlay con opacidad HSL y transiciones aceleradas */}
        <DialogPrimitive.Overlay
          onClick={!closeOnOverlay ? (e) => e.preventDefault() : undefined}
          className="fixed inset-0 z-50 bg-overlay-dark/50 data-[state=open]:animate-fade-in duration-200"
        />

        {/* Contenedor centrador fijo */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          
          <DialogPrimitive.Content
            className={cn(
              "relative w-full pointer-events-auto bg-background rounded-md overflow-hidden border border-border shadow-overlay",
              "data-[state=open]:animate-fade-in-soft duration-200 font-sans text-text-primary",
              sizeClasses[size],
              className
            )}
          >
            {!hideCloseButton && (
              <DialogPrimitive.Close asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Cerrar ventana"
                  className="absolute top-4 right-4 text-text-muted hover:text-text-primary z-20"
                >
                  <X />
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

// ─── Subcomponente: DialogHeader ───────────────────────────────────────────────

export interface DialogHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  withDivider?: boolean;
  className?: string;
}

/* CORREGIDO: Consumo exacto de combinaciones de color semánticas autorizadas (Fondo / Texto) */
const variantIconBg: Record<DialogVariant, string> = {
  default: "bg-accent-soft text-accent border border-accent/10",
  destructive: "bg-error text-text-error border border-text-error/10",
  warning: "bg-warning text-text-warning border border-text-warning/10",
  info: "bg-info text-text-info border border-text-info/10",
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
    <div className={cn("px-6 pt-6 flex flex-col relative", withDivider ? "pb-4" : "pb-2", className)}>
      <div className="flex items-start gap-4">
        {icon && (
          <span 
            className={cn("flex items-center justify-center w-10 h-10 rounded-md shrink-0 transition-colors", variantIconBg[variant])}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        <div className="flex-1 min-w-0 pr-6">
          {/* CORREGIDO: H2 semántico para cumplimiento estricto ARIA/A11y */}
          <DialogPrimitive.Title asChild>
            <h2 className="font-heading font-semibold text-lg leading-snug text-text-primary tracking-tight">
              {title}
            </h2>
          </DialogPrimitive.Title>
          
          {description && (
            <DialogPrimitive.Description asChild>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed font-sans">
                {description}
              </p>
            </DialogPrimitive.Description>
          )}
        </div>
      </div>
      {withDivider && <hr className="w-full rule-holo mt-4 absolute bottom-0 left-0" />}
    </div>
  );
}
DialogHeader.displayName = "DialogHeader";

// ─── Subcomponente: DialogBody ─────────────────────────────────────────────────

export interface DialogBodyProps {
  scrollable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function DialogBody({ scrollable = false, className = "", children }: DialogBodyProps) {
  return (
    <div 
      className={cn(
        "px-6 py-4 text-sm text-text-primary font-sans leading-relaxed", 
        scrollable && "overflow-y-auto max-h-[55vh] scrollbar-soft", 
        className
      )}
    >
      {children}
    </div>
  );
}
DialogBody.displayName = "DialogBody";

// ─── Subcomponente: DialogFooter ───────────────────────────────────────────────

export interface DialogFooterProps {
  align?: "left" | "center" | "right" | "between";
  withDivider?: boolean;
  className?: string;
  children: React.ReactNode;
}

const footerAlignClasses: Record<NonNullable<DialogFooterProps["align"]>, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

export function DialogFooter({ align = "right", withDivider = true, className = "", children }: DialogFooterProps) {
  return (
    <div 
      className={cn(
        "flex items-center flex-wrap gap-2 px-6 pb-5 pt-4 border-t border-transparent relative font-sans", 
        footerAlignClasses[align], 
        className
      )}
    >
      {withDivider && <div className="w-full rule-holo absolute top-0 left-0" />}
      {children}
    </div>
  );
}
DialogFooter.displayName = "DialogFooter";