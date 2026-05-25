'use client'

import { useState, useRef, useEffect, useMemo } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type MultiSelectOption =
    | string
    | { label: string; value: string }

interface MultiSelectProps {
    options: MultiSelectOption[]
    selected: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Seleccionar...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // 1. Manejo del clic externo limpiamente
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const toggle = (value: string) => {
        onChange(
            selected.includes(value)
                ? selected.filter((v) => v !== value)
                : [...selected, value]
        )
    }

    // 2. OPTIMIZACIÓN: Memorizar la normalización para evitar caídas de rendimiento
    const normalized = useMemo(() => {
        return options.map((opt) =>
            typeof opt === "string"
                ? { label: opt, value: opt }
                : opt
        )
    }, [options])

    const hasSelected = selected.length > 0

    return (
        <div ref={ref} className={cn("relative min-w-[180px]", className)}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    // Base del botón (Unificado con tus inputs y botones previos)
                    "flex items-center justify-between gap-2 w-full h-9 rounded-md border border-border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
                    "focus-visible:border-accent focus-visible:ring-accent-soft focus-visible:ring-[3px]",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    // CORREGIDO: Cambia de color dinámicamente si hay elementos elegidos
                    hasSelected ? "text-text-primary font-medium" : "text-text-muted"
                )}
            >
                <span className="truncate">
                    {!hasSelected
                        ? placeholder
                        : `${placeholder} (${selected.length})`}
                </span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 text-text-muted transition-transform duration-200", open && "rotate-180")} />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full max-h-[250px] overflow-y-auto scrollbar-soft rounded-md border border-border shadow-md bg-surface">
                    <div className="p-1 flex flex-col gap-0.5">
                        {normalized.map((option) => {
                            const isSelected = selected.includes(option.value)
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => toggle(option.value)}
                                    className={cn(
                                        "group flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm text-left w-full outline-none transition-colors",
                                        // CORREGIDO: Uso de tus tokens bg-muted para consistencia visual con el Select
                                        "hover:bg-muted text-text-primary focus:bg-muted"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-border transition-colors group-hover:border-accent",
                                            isSelected
                                                ? "bg-accent text-white border-accent"
                                                : "bg-transparent"
                                        )}
                                    >
                                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                                    </span>
                                    <span className="truncate">{option.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}