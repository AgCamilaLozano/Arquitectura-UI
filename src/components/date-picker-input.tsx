"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale/es"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/src" // Importación oficial del repositorio (lib/utils.ts)
import { Button } from "@/src/primitives"
import { Popover, PopoverContent, PopoverTrigger } from "@/src"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * PRIMITIVA ATÓMICA DE CALENDARIO
 * Garantiza alineación simétrica de la cabecera y grilla de 7 columnas sin colapsos de navegación.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={es}
      className={cn(
        "p-3 font-lato bg-[hsl(var(--background))] text-[hsl(var(--text-primary))] rounded-[var(--radius)] select-none",
        className
      )}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-3",
        
        // --- CABECERA Y NAVEGACIÓN CORREGIDA ---
        month_caption: "flex justify-center items-center h-9 relative px-8 mb-2", // Espacio reservado a los lados para las flechas
        caption_label: "text-sm font-montserrat font-semibold text-[hsl(var(--text-primary))] capitalize",
        nav: "flex items-center justify-between w-full absolute inset-x-0 px-1 top-0 h-9",
        
        button_previous: cn(
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 flex items-center justify-center rounded-[var(--radius)] transition-colors hover:bg-[hsl(var(--background))] text-[hsl(var(--text-primary))] z-10 cursor-pointer"
        ),
        button_next: cn(
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 flex items-center justify-center rounded-[var(--radius)] transition-colors hover:bg-[hsl(var(--background))] text-[hsl(var(--text-primary))] z-10 cursor-pointer"
        ),

        // --- GRID DE DÍAS Y MES ---
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "grid grid-cols-7 w-full mb-1",
        weekday: "text-[hsl(var(--text-secondary))] w-9 font-medium text-[0.8rem] text-center capitalize",
        week: "grid grid-cols-7 w-full mt-1",
        day: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center rounded-[var(--radius)]",
        
        day_button: cn(
          "h-9 w-9 p-0 font-normal rounded-[var(--radius)] transition-all flex items-center justify-center text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--accent))]"
        ),
        
        // TOKENS DINÁMICOS MULTI-TENANT
        selected: cn(
          "[&_button]:!bg-[hsl(var(--accent))] [&_button]:!text-[hsl(var(--accent-foreground))]",
          "[&_button]:hover:!bg-[hsl(var(--accent))] [&_button]:hover:!text-[hsl(var(--accent-foreground))]",
          "[&_button]:focus:!bg-[hsl(var(--accent))] [&_button]:focus:!text-[hsl(var(--accent-foreground))]",
          "font-semibold shadow-xs"
        ),

        today: "[&_button]:border [&_button]:border-[hsl(var(--accent))] [&_button]:font-bold [&_button]:text-[hsl(var(--accent))]",
        outside: "text-[hsl(var(--text-secondary))] opacity-40",
        disabled: "text-[hsl(var(--text-secondary))] opacity-20 pointer-events-none",
        hidden: "invisible",
        ...classNames,
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4 mt-6" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

/**
 * COMPONENTE COMPUESTO: DATE PICKER INPUT
 */
export interface DatePickerInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePickerInput({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  className,
  disabled = false,
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-64 justify-start text-left font-lato text-sm h-10 px-3 font-normal border-[hsl(var(--border-default))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--surface))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2",
            !value && "text-[hsl(var(--text-secondary))]",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[hsl(var(--text-secondary))]" />
          {value ? (
            format(value, "PPP", { locale: es })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-[hsl(var(--background))] border border-[hsl(var(--border-default))] shadow-md rounded-[var(--radius)]"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { Calendar }