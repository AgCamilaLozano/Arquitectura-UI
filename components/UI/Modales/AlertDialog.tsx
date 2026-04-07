import React, { useEffect, useState } from 'react';
import {
    AlertCircle,
    CheckCircle2,
    Info,
    AlertTriangle,
    X
} from 'lucide-react';

import { Button } from '@/components/ui';

/**
 * Propiedades del componente AlertDialog
 */
interface AlertDialogProps {
    /** Controla si el diálogo es visible */
    isOpen: boolean;
    /** Función para cerrar el diálogo */
    onClose: () => void;
    /** Título principal de la alerta */
    title: string;
    /** Descripción o mensaje detallado */
    description: string | React.ReactNode;
    /** Variante visual que define colores e iconos */
    variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
    /** Texto del botón de acción principal */
    confirmLabel?: string;
    /** Texto del botón de cancelación */
    cancelLabel?: string;
    /** Función ejecutada al confirmar */
    onConfirm?: () => void;
    /** Si es true, el diálogo no se cerrará al hacer clic fuera de él */
    isSticky?: boolean;
}

/**
 * AlertDialog: Componente de sistema para interrupciones críticas o confirmaciones.
 * Implementa accesibilidad básica y animaciones suaves.
 */
export const AlertDialog: React.FC<AlertDialogProps> = ({
    isOpen,
    onClose,
    title,
    description,
    variant = 'default',
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    onConfirm,
    isSticky = false,
}) => {
    const [isRendered, setIsRendered] = useState(false);

    // Manejo de animación de entrada/salida
    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsRendered(false), 200);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isRendered) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop / Fondo oscuro */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={!isSticky ? onClose : undefined}
            />

            {/* Contenedor del Diálogo */}
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className={`relative w-full max-w-md transform overflow-hidden rounded-2xl border bg-surface p-6 shadow-card transition-all duration-200 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    } `}
            >
                {/* Botón Cerrar (X) */}
                <Button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 text-text-muted hover:bg-muted transition-colors"
                    aria-label="Cerrar"
                >
                    <X size={18} />
                </Button>

                <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                    {/* Encabezado con Icono y Variante */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl `}>
                            <AlertCircle size={24} />
                        </div>
                        <h2
                            id="dialog-title"
                            className="text-xl font-bold text-text-primary tracking-tight"
                        >
                            {title}
                        </h2>
                    </div>

                    {/* Cuerpo del Mensaje */}
                    <div className="mb-8 w-full">
                        <p className="text-text-secondary leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Acciones (Footer) */}
                    <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:justify-end">
                        <Button
                            variant={'outline'}
                            onClick={onClose}
                            className="px-5 py-2.5 transition-all"
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            variant={'default'}
                            onClick={() => {
                                onConfirm?.();
                                onClose();
                            }}
                            className={`px-6 py-2.5 font-semibold shadow-sm transition-all active:scale-95`}
                        >
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog;

