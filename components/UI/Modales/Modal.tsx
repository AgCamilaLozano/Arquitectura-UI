'use client'

import { X } from 'lucide-react'
import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalVariant = 'default' | 'danger' | 'warning' | 'success'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    description?: string
    size?: ModalSize
    variant?: ModalVariant
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showCloseButton?: boolean
    className?: string
}

export interface ModalHeaderProps {
    children: React.ReactNode
    className?: string
}

export interface ModalBodyProps {
    children: React.ReactNode
    className?: string
}

export interface ModalFooterProps {
    children: React.ReactNode
    className?: string
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
}

// ─── Variant map ──────────────────────────────────────────────────────────────

const variantClasses: Record<ModalVariant, string> = {
    default: 'border-neutral-200 dark:border-neutral-700',
    danger: 'border-red-300   dark:border-red-700',
    warning: 'border-amber-300 dark:border-amber-600',
    success: 'border-green-300 dark:border-green-600',
}

const variantTitleClasses: Record<ModalVariant, string> = {
    default: 'text-neutral-900 dark:text-neutral-100',
    danger: 'text-red-700     dark:text-red-400',
    warning: 'text-amber-700   dark:text-amber-400',
    success: 'text-green-700   dark:text-green-400',
}

// ─── Close Icon ───────────────────────────────────────────────────────────────

function CloseIcon() {
    return (
        <X className='w-5 h-5' />
    )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function ModalHeader({ children, className = '' }: ModalHeaderProps) {
    return (
        <div className={`px-6 pt-6 pb-0 ${className}`}>
            {children}
        </div>
    )
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
    return (
        <div className={`px-6 py-4 flex-1 overflow-y-auto ${className}`}>
            {children}
        </div>
    )
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
    return (
        <div
            className={`
        px-6 py-4 border-t border-neutral-100 dark:border-neutral-700
        flex items-center justify-end gap-3
        ${className}
      `}
        >
            {children}
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Modal({
    isOpen,
    onClose,
    children,
    title,
    description,
    size = 'md',
    variant = 'default',
    closeOnBackdrop = true,
    closeOnEscape = true,
    showCloseButton = true,
    className = '',
}: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null)

    // Cerrar con Escape
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') onClose()
        },
        [closeOnEscape, onClose]
    )

    // Bloquear scroll del body cuando el modal está abierto
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

    // Focus trap: mover foco al modal al abrir
    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus()
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose()
    }

    return createPortal(
        // Backdrop
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
        animate-in fade-in duration-150
      "
            onClick={handleBackdropClick}
        >
            {/* Panel */}
            <div
                ref={dialogRef}
                tabIndex={-1}
                className={`
          relative w-full ${sizeClasses[size]}
          bg-white dark:bg-neutral-900
          border ${variantClasses[variant]}
          rounded-2xl shadow-2xl
          flex flex-col max-h-[90vh]
          outline-none
          animate-in zoom-in-95 fade-in duration-150
          ${className}
        `}
            >
                {/* Header interno (solo si hay title) */}
                {(title || showCloseButton) && (
                    <div className="flex items-start justify-between px-6 pt-6 pb-2">
                        <div className="flex-1">
                            {title && (
                                <h2
                                    id="modal-title"
                                    className={`text-lg font-semibold leading-tight ${variantTitleClasses[variant]}`}
                                >
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p
                                    id="modal-description"
                                    className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
                                >
                                    {description}
                                </p>
                            )}
                        </div>

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                aria-label="Cerrar modal"
                                className="
                  ml-4 flex-shrink-0
                  p-1.5 rounded-lg
                  text-neutral-400 hover:text-neutral-700
                  dark:text-neutral-500 dark:hover:text-neutral-200
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                  transition-colors duration-150
                  focus:outline-none focus:ring-2 focus:ring-neutral-400
                "
                            >
                                <CloseIcon />
                            </button>
                        )}
                    </div>
                )}

                {/* Contenido */}
                {children}
            </div>
        </div>,
        document.body
    )
}