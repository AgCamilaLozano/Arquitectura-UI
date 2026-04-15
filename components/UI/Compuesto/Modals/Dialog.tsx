/**
 * Propósito: Componente Dialog (modal) reutilizable con overlay, animación de entrada
 * y subcomponentes para estructurar el contenido interno.
 * Construido sobre los estilos de Card y la API de Button del design system.
 */

"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Base/Entradas";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Variantes visuales del dialog:
 * - default     → encabezado neutro, acciones primarias en accent
 * - destructive → indica acción irreversible (eliminar, revocar)
 * - warning     → requiere confirmación con precaución
 * - info        → informativo, sin acción destructiva
 */
export type DialogVariant = "default" | "destructive" | "warning" | "info";

/**
 * Tamaños del panel modal
 */
export type DialogSize = "sm" | "md" | "lg" | "xl";

export interface DialogProps {
    /** Controla visibilidad del dialog */
    open: boolean;
    /** Callback al cerrar (overlay click, tecla Escape o botón ✕) */
    onClose: () => void;
    /** Variante semántica */
    variant?: DialogVariant;
    /** Tamaño del panel */
    size?: DialogSize;
    /** Permite cerrar al hacer clic en el overlay */
    closeOnOverlay?: boolean;
    /** Oculta el botón de cierre (✕) */
    hideCloseButton?: boolean;
    /** Clases adicionales para el panel */
    className?: string;
    children: React.ReactNode;
}

// ─── Mapas de clases ──────────────────────────────────────────────────────────


const sizeClasses: Record<DialogSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
};

// ─── Componente Dialog ────────────────────────────────────────────────────────

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
    // Lógica clave: cerrar con Escape y bloquear scroll del body cuando está abierto
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (open) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [open, handleKeyDown]);

    if (!open) return null;

    return (
        /* Overlay */
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
                onClick={closeOnOverlay ? onClose : undefined}
                aria-hidden="true"
            />

            {/* Panel — reutiliza tokens de Card */}
            <div
                className={`
          relative z-10 w-full
          bg-surface dark:bg-background
          rounded-xl overflow-hidden
          border border-border
          shadow-[var(--shadow-card)]
          animate-in fade-in zoom-in-95 duration-200
          ${sizeClasses[size]}
          ${className}
        `}
            >
                {/* Botón de cierre */}
                {!hideCloseButton && (
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="absolute top-3 right-3 text-text-muted hover:text-text-primary"
                    >
                        <X />
                    </Button>
                )}

                {/* Contexto de variante disponible para subcomponentes */}
                <DialogContext.Provider value={{ variant }}>
                    {children}
                </DialogContext.Provider>
            </div>
        </div>
    );
}

// ─── Contexto interno ─────────────────────────────────────────────────────────

interface DialogContextValue {
    variant: DialogVariant;
}

const DialogContext = React.createContext<DialogContextValue>({
    variant: "default",
});

export const useDialogContext = () => React.useContext(DialogContext);

// ─── Subcomponente: DialogHeader ──────────────────────────────────────────────

/**
 * Propósito: Encabezado del dialog con ícono opcional y separador.
 *
 * Props:
 * - title      → título principal
 * - description → texto de apoyo debajo del título
 * - icon       → nodo React (ícono) alineado al título
 * - withDivider → línea separadora debajo
 */
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
        <div
            className={`
        px-6 pt-6
        ${withDivider ? "pb-4 border-b border-border" : "pb-2"}
        ${className}
      `}
        >
            <div className="flex items-start gap-3">
                {/* Ícono con fondo semántico */}
                {icon && (
                    <span
                        className={`
              mt-0.5 flex items-center justify-center
              w-9 h-9 rounded-lg shrink-0
              ${variantIconBg[variant]}
            `}
                    >
                        {icon}
                    </span>
                )}

                <div className="flex-1 min-w-0 pr-6">
                    <h2 className="font-heading text-base font-semibold leading-snug text-text-primary">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Subcomponente: DialogBody ────────────────────────────────────────────────

/**
 * Propósito: Área de contenido principal del dialog.
 * Soporta scroll interno cuando el contenido excede la altura máxima.
 */
export interface DialogBodyProps {
    /** Habilita scroll interno con altura máxima */
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
            className={`
        px-6 py-4 text-sm text-text-primary
        ${scrollable ? "overflow-y-auto max-h-[60vh] scrollbar-soft" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// ─── Subcomponente: DialogFooter ──────────────────────────────────────────────

/**
 * Propósito: Pie del dialog con alineación configurable.
 * Contiene las acciones principales (botones).
 *
 * Props:
 * - align      → alineación horizontal de las acciones
 * - withDivider → línea separadora arriba
 */
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
            className={`
        flex items-center flex-wrap gap-2 px-6 pb-5 pt-4
        ${withDivider ? "border-t border-border" : ""}
        ${footerAlignClasses[align]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

// ─── Export por defecto ───────────────────────────────────────────────────────

export default Dialog;