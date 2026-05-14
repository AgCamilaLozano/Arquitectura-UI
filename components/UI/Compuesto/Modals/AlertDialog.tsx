/**
 * Propósito: Componente AlertDialog especializado para diálogos de alerta/confirnación.
 * Reutiliza la estructura del Dialog base con variantes semánticas para alertas.
 */

"use client";

import React, { useEffect, useCallback } from "react";
import { X, AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/Base/Entradas";

export type AlertDialogVariant = "destructive" | "warning" | "success" | "info";

export type AlertDialogSize = "sm" | "md" | "lg";

export interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    variant?: AlertDialogVariant;
    size?: AlertDialogSize;
    title: React.ReactNode;
    description?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    closeOnOverlay?: boolean;
    hideCloseButton?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const sizeClasses: Record<AlertDialogSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
};

const variantConfig: Record<AlertDialogVariant, { icon: React.ReactNode; iconBg: string; confirmVariant: "primary" | "destructive" }> = {
    destructive: {
        icon: <AlertTriangle className="w-5 h-5" />,
        iconBg: "bg-error/10 text-text-error",
        confirmVariant: "destructive",
    },
    warning: {
        icon: <AlertCircle className="w-5 h-5" />,
        iconBg: "bg-warning/10 text-text-warning",
        confirmVariant: "primary",
    },
    success: {
        icon: <CheckCircle className="w-5 h-5" />,
        iconBg: "bg-success/10 text-text-success",
        confirmVariant: "primary",
    },
    info: {
        icon: <Info className="w-5 h-5" />,
        iconBg: "bg-info/10 text-text-info",
        confirmVariant: "primary",
    },
};

export function AlertDialog({
    open,
    onClose,
    variant = "info",
    size = "md",
    title,
    description,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm,
    onCancel,
    closeOnOverlay = true,
    hideCloseButton = false,
    className = "",
    children,
}: AlertDialogProps) {
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

    const config = variantConfig[variant];

    if (!open) return null;

    return (
        <div role="alertdialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
                onClick={closeOnOverlay ? onClose : undefined}
                aria-hidden="true"
            />
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
                {!hideCloseButton && (
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="absolute top-3 right-3 text-text-muted hover:text-text-primary z-10"
                    >
                        <X />
                    </Button>
                )}

                <AlertDialogContext.Provider value={{ variant, config }}>
                    <div className="px-6 pt-6 pb-4">
                        <div className="flex items-start gap-3">
                            <span className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${config.iconBg}`}>
                                {config.icon}
                            </span>
                            <div className="flex-1 min-w-0 pr-6">
                                <h2 className="font-heading text-lg font-semibold leading-snug text-text-primary">{title}</h2>
                                {description && (
                                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">{description}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {(children || onConfirm || onCancel) && (
                        <div className="border-t border-border px-6 py-4">
                            {children || (
                                <div className="flex items-center justify-end gap-2">
                                    {onCancel && (
                                        <Button variant="secondary" onClick={onCancel}>
                                            {cancelLabel}
                                        </Button>
                                    )}
                                    {onConfirm && (
                                        <Button variant="default" onClick={onConfirm}>
                                            {confirmLabel}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </AlertDialogContext.Provider>
            </div>
        </div>
    );
}

interface AlertDialogContextValue {
    variant: AlertDialogVariant;
    config: typeof variantConfig["destructive"];
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({
    variant: "info",
    config: variantConfig["info"],
});

export const useAlertDialogContext = () => React.useContext(AlertDialogContext);

export default AlertDialog;