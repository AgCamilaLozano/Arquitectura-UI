'use client'

import React, { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
// Se corrige la importación utilizando la ruta relativa explícita o el alias configurado
import { Button } from '@/components/ui'

/**
 * Propiedades para el componente principal Dialog
 */
interface DialogProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    closeOnBackdrop?: boolean
    className?: string
}

/**
 * Dialog: Componente de ventana modal avanzado con arquitectura compuesta.
 * Utiliza portales para renderizar sobre la jerarquía del DOM y gestiona el scroll del cuerpo.
 */
export function Dialog({
    isOpen,
    onClose,
    children,
    size = 'md',
    closeOnBackdrop = true,
    className,
}: DialogProps) {
    const overlayRef = useRef<HTMLDivElement>(null)

    // Cierre mediante tecla Escape
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        },
        [onClose]
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, handleKeyDown])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === overlayRef.current) {
            onClose()
        }
    }

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] h-[90vh]',
    }

    return createPortal(
        <div
            ref={overlayRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={cn(
                    "relative w-full bg-background border border-border shadow-card rounded-2xl flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200",
                    sizeClasses[size],
                    className
                )}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}

/**
 * Sub-componente para el encabezado del Dialog
 */
export function DialogHeader({
    children,
    className,
    onClose
}: {
    children: React.ReactNode;
    className?: string;
    onClose?: () => void
}) {
    return (
        <div className={cn("flex items-center justify-between px-6 py-4 border-b border-border/50", className)}>
            <div className="flex flex-col gap-1">
                {children}
            </div>
            {onClose && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onClose}
                    className="rounded-full text-text-muted hover:text-text-primary"
                >
                    <X className="size-5" />
                </Button>
            )}
        </div>
    )
}

/**
 * Sub-componente para el título (usualmente dentro de DialogHeader)
 */
export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 className={cn("text-lg font-bold text-text-primary tracking-tight", className)}>
            {children}
        </h2>
    )
}

/**
 * Sub-componente para la descripción o subtítulo
 */
export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("text-sm text-text-secondary leading-relaxed", className)}>
            {children}
        </p>
    )
}

/**
 * Sub-componente para el cuerpo del Dialog (scrollable)
 */
export function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("flex-1 px-6 py-6 overflow-y-auto scrollbar-soft", className)}>
            {children}
        </div>
    )
}

/**
 * Sub-componente para el pie de página del Dialog
 */
export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn(
            "px-6 py-4  border-t border-border/50 flex flex-col-reverse sm:flex-row sm:justify-end gap-3",
            className
        )}>
            {children}
        </div>
    )
}
