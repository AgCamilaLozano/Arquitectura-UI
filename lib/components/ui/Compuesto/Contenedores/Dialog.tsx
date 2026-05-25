"use client";

import React from "react";
import { X } from "lucide-react";
// Importamos los primitivos del Dialog de Radix
import { Dialog as DialogPrimitive } from "radix-ui";
import { Button } from "@/lib/components/ui/Base/Entradas";
import { cn } from "@/lib/utils";

// ─── Tipos (Se mantienen idénticos para tu design system) ─────────────────────
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

// Contexto interno para heredar la variante (se mantiene igual)
interface DialogContextValue {
    variant: DialogVariant;
}
const DialogContext = React.createContext<DialogContextValue>({ variant: "default" });
export const useDialogContext = () => React.useContext(DialogContext);

// ─── Componente Principal Optimizado ──────────────────────────────────────────

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
        // Radix controla el estado abierto y el disparo del cierre de forma nativa
        <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogPrimitive.Portal>
                
                {/* Backdrop / Overlay con animaciones nativas de Tailwind v4 */}
                <DialogPrimitive.Overlay
                    // Controlamos el cierre por overlay condicionalmente
                    onClick={!closeOnOverlay ? (e) => e.preventDefault() : undefined}
                    className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in duration-200"
                />

                {/* Contenedor centrador fijo */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    
                    {/* El Panel del Diálogo */}
                    <DialogPrimitive.Content
                        className={cn(
                            "relative w-full pointer-events-auto",
                            "bg-surface rounded-md overflow-hidden border border-border shadow-[var(--shadow-card)]",
                            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-200",
                            sizeClasses[size],
                            className
                        )}
                    >
                        {/* Botón de cierre integrado a Radix para accesibilidad de teclado */}
                        {!hideCloseButton && (
                            <DialogPrimitive.Close asChild>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label="Cerrar"
                                    className="absolute top-3 right-3 text-text-muted hover:text-text-primary z-20"
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

// ─── Subcomponente: DialogHeader (Optimizado con Accesibilidad) ───────────────

export interface DialogHeaderProps {
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    withDivider?: boolean;
    className?: string;
}

const variantIconBg: Record<DialogVariant, string> = {
    default: "bg-accent-soft text-accent",
    destructive: "bg-error text-text-error",
    warning: "bg-warning text-text-warning",
    info: "bg-info text-text-info",
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
        <div className={cn("px-6 pt-6", withDivider ? "pb-4 border-b border-border" : "pb-2", className)}>
            <div className="flex items-start gap-3">
                {icon && (
                    <span className={cn("mt-0.5 flex items-center justify-center w-9 h-9 rounded-md shrink-0", variantIconBg[variant])}>
                        {icon}
                    </span>
                )}

                <div className="flex-1 min-w-0 pr-6">
                    {/* Radix vincula semánticamente este h2 como el lector oficial del modal */}
                    <DialogPrimitive.Title asChild>
                        <h3 className="semibold leading-snug text-text-primary">
                            {title}
                        </h3>
                    </DialogPrimitive.Title>
                    
                    {description && (
                        <DialogPrimitive.Description asChild>
                            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                                {description}
                            </p>
                        </DialogPrimitive.Description>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Subcomponentes: Body y Footer (Se quedan igual de limpios que tu código) ──

export interface DialogBodyProps {
    scrollable?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function DialogBody({ scrollable = false, className = "", children }: DialogBodyProps) {
    return (
        <div className={cn("px-6 py-4 text-sm text-text-primary", scrollable && "overflow-y-auto max-h-[60vh] scrollbar-soft", className)}>
            {children}
        </div>
    );
}

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
        <div className={cn("flex items-center flex-wrap gap-2 px-6 pb-5 pt-4", withDivider && "border-t border-border", footerAlignClasses[align], className)}>
            {children}
        </div>
    );
}

export default Dialog;