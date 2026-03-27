'use client'
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface MultiSelectOption {
    label: string
    value: string
}

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

    return (
        <div ref={ref} className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "flex items-center justify-between gap-2 min-w-[180px] h-9 rounded-md border border-border px-3 py-2 text-sm shadow-sm",
                    "hover:bg-accent-hover",
                    "text-muted-foreground"
                )}
            >
                <span>
                    {selected.length === 0
                        ? placeholder
                        : `${placeholder} (${selected.length})`}
                </span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 min-w-[180px] max-h-[250px] overflow-y-auto scrollbar-soft rounded-md border border-border shadow-md bg-surface dark:bg-background">
                    <div className="p-1 flex flex-col">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => toggle(option.value)}
                                className="group flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm text-left hover:bg-accent-hover hover:border-accent hover:text-accent w-full"
                            >
                                <span
                                    className={cn(
                                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-border group-hover:border-accent",
                                        selected.includes(option.value)
                                            ? "bg-accent text-white border-accent"
                                            : "bg-transparent"
                                    )}
                                >
                                    {selected.includes(option.value) && (
                                        <Check className="h-3 w-3" />
                                    )}
                                </span>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}