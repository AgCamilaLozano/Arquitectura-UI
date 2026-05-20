"use client";

/**
 * Componente: Calendar
 * Propósito: Selector de fecha reutilizable con múltiples variantes y modos de selección.
 *   - variant "full": Calendario grande tipo vista mensual
 *   - variant "input": Campo con popover compacto para seleccionar fecha
 *
 * Modos de vista interna (CalendarMode):
 *   - "days":   Grilla de días del mes (vista por defecto)
 *   - "months": Grilla de los 12 meses del año
 *   - "years":  Grilla de años navegable en rangos de 12
 *
 * Props:
 *   - variant:       "full" | "input"           — Modo de visualización
 *   - selectionMode: "date" | "month" | "year"  — Qué puede seleccionar el usuario
 *   - value:         Date | null                — Fecha actualmente seleccionada
 *   - onChange:      (date: Date) => void       — Callback al seleccionar
 *   - minDate?:      Date                       — Fecha mínima seleccionable
 *   - maxDate?:      Date                       — Fecha máxima seleccionable
 *   - placeholder?:  string                     — Texto del input sin fecha seleccionada
 *   - label?:        string                     — Etiqueta del input (solo variante "input")
 *   - disabled?:     boolean                    — Deshabilita todo el componente
 *   - className?:    string                     — Clases adicionales para el contenedor raíz
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";
import Holidays from "date-holidays";
import { createPortal } from "react-dom";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Controla qué vista interna muestra el calendario */
type CalendarMode = "days" | "months" | "years";

/** Controla qué puede seleccionar finalmente el usuario */
type SelectionMode = "date" | "month" | "year";

interface CalendarProps {
  variant?: "full" | "input";
  selectionMode?: SelectionMode;
  value?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MESES_LARGO: Record<number, string> = {
  0: "ENERO", 1: "FEBRERO", 2: "MARZO", 3: "ABRIL",
  4: "MAYO", 5: "JUNIO", 6: "JULIO", 7: "AGOSTO",
  8: "SEPTIEMBRE", 9: "OCTUBRE", 10: "NOVIEMBRE", 11: "DICIEMBRE",
};

const MESES_CORTO: Record<number, string> = {
  0: "Ene", 1: "Feb", 2: "Mar", 3: "Abr",
  4: "May", 5: "Jun", 6: "Jul", 7: "Ago",
  8: "Sep", 9: "Oct", 10: "Nov", 11: "Dic",
};

// ─── Utilidades ───────────────────────────────────────────────────────────────

export function getDiasDelMes(year: number, month: number): (number | null)[] {
  const primerDia = new Date(year, month, 1).getDay();
  const offset = primerDia === 0 ? 6 : primerDia - 1;
  const totalDias = new Date(year, month + 1, 0).getDate();
  const dias: (number | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= totalDias; i++) dias.push(i);
  return dias;
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function isSameMonth(a: Date, b: Date) {
  return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export function isSameYear(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear();
}

export function isWeekendDate(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export function isDisabledDay(
  day: number,
  year: number,
  month: number,
  min?: Date,
  max?: Date
): boolean {
  const d = new Date(year, month, day);
  if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
  if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
  return false;
}

export function isDisabledMonth(year: number, month: number, min?: Date, max?: Date): boolean {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  if (min && end < new Date(min.getFullYear(), min.getMonth(), 1)) return true;
  if (max && start > new Date(max.getFullYear(), max.getMonth() + 1, 0)) return true;
  return false;
}

export function isDisabledYear(year: number, min?: Date, max?: Date): boolean {
  if (min && year < min.getFullYear()) return true;
  if (max && year > max.getFullYear()) return true;
  return false;
}

export function formatDate(date: Date, mode: SelectionMode = "date"): string {
  if (mode === "year") return String(date.getFullYear());
  if (mode === "month")
    return date.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ─── Sub-componente: YearGrid ─────────────────────────────────────────────────

/**
 * Propósito: Grilla de años navegable en bloques de 12.
 * Lógica clave: El rango se calcula a partir de yearBase (múltiplo de 12).
 */
interface YearGridProps {
  yearBase: number;
  selected: Date | null;
  onSelectYear: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "lg";
}

const YearGrid: React.FC<YearGridProps> = ({
  yearBase,
  selected,
  onSelectYear,
  minDate,
  maxDate,
  size = "lg",
}) => {
  const years = Array.from({ length: 12 }, (_, i) => yearBase + i);
  const today = new Date();

  return (
    <div className="grid grid-cols-4 gap-1">
      {years.map((year) => {
        const isSelected = selected ? selected.getFullYear() === year : false;
        const isCurrentYear = today.getFullYear() === year;
        const disabled = isDisabledYear(year, minDate, maxDate);

        return (
          <button
            key={year}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onSelectYear(year)}
            className={`
              flex items-center justify-center rounded-md border font-body transition-all duration-150
              ${size === "lg" ? "h-10 text-sm" : "h-8 text-xs"}
              ${
                isSelected
                  ? "bg-accent text-white border-accent shadow-md"
                  : isCurrentYear
                  ? "border-accent/50 bg-accent-soft text-accent font-medium"
                  : disabled
                  ? "text-text-muted bg-muted/50 cursor-not-allowed border-border"
                  : "border-border text-text-primary hover:bg-accent-soft hover:text-accent hover:border-border-strong cursor-pointer"
              }
            `}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};

// ─── Sub-componente: MonthGrid ────────────────────────────────────────────────

/**
 * Propósito: Grilla de los 12 meses del año.
 * Lógica clave: Marca el mes seleccionado y deshabilita meses fuera del rango min/max.
 */
interface MonthGridProps {
  year: number;
  selected: Date | null;
  onSelectMonth: (month: number) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "lg";
}

const MonthGrid: React.FC<MonthGridProps> = ({
  year,
  selected,
  onSelectMonth,
  minDate,
  maxDate,
  size = "lg",
}) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-3 gap-1">
      {Object.entries(MESES_CORTO).map(([key, label]) => {
        const month = Number(key);
        const isSelected = selected
          ? selected.getFullYear() === year && selected.getMonth() === month
          : false;
        const isCurrentMonth =
          today.getMonth() === month && today.getFullYear() === year;
        const disabled = isDisabledMonth(year, month, minDate, maxDate);

        return (
          <button
            key={month}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onSelectMonth(month)}
            className={`
              flex items-center justify-center rounded-md border font-body transition-all duration-150
              ${size === "lg" ? "h-12 text-sm" : "h-9 text-xs"}
              ${
                isSelected
                  ? "bg-accent text-white border-accent shadow-md"
                  : isCurrentMonth
                  ? "border-accent/50 bg-accent-soft text-accent font-medium"
                  : disabled
                  ? "text-text-muted bg-muted/50 cursor-not-allowed border-border"
                  : "border-border text-text-primary hover:bg-accent-soft hover:text-accent hover:border-border-strong cursor-pointer"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

// ─── Sub-componente: CalendarGrid ─────────────────────────────────────────────

/**
 * Propósito: Grilla de días del mes.
 * Lógica clave: Genera la cuadrícula con offset de lunes, marca festivos colombianos,
 * fines de semana, el día actual y el seleccionado. Deshabilita días fuera del rango.
 */
interface CalendarGridProps {
  year: number;
  month: number;
  selected: Date | null;
  today: Date;
  onSelectDay: (day: number) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "lg";
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  selected,
  today,
  onSelectDay,
  minDate,
  maxDate,
  size = "lg",
}) => {
  const dias = getDiasDelMes(year, month);

  const holidays = useMemo(() => {
    const hd = new Holidays("CO");
    return hd.getHolidays(year).map((h) => new Date(h.date));
  }, [year]);

  const cellBase =
    "flex items-center justify-center font-body border border-border cursor-pointer select-none transition-all duration-150";
  const cellSize = size === "lg" ? "h-16 w-full" : "h-9 w-9 mx-auto";

  return (
    <>
      {/* Cabecera días de la semana */}
      <div className={`grid grid-cols-7 ${size === "lg" ? "mb-2" : "mb-1"}`}>
        {DIAS_SEMANA.map((d, i) => (
          <div
            key={i}
            className={`text-center font-body font-medium border-b border-border text-text-muted ${
              size === "lg" ? "text-sm py-2" : "text-[12px] py-1"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7">
        {dias.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className={cellSize} />;

          const date = new Date(year, month, day);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isToday = isSameDay(date, today);
          const disabled = isDisabledDay(day, year, month, minDate, maxDate);
          const isHolidayDay = holidays.some((h) => isSameDay(date, h));
          const isWeekendDayValue = !isHolidayDay && isWeekendDate(date);

          const dayClasses = isSelected
            ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
            : isToday
            ? "border border-border-strong bg-accent-soft text-accent font-medium"
            : disabled
            ? "text-text-muted bg-muted/50 cursor-not-allowed"
            : isHolidayDay
            ? "border border-text-error/50 bg-error/50 text-text-error/70"
            : isWeekendDayValue
            ? "bg-muted/40 text-text-muted hover:bg-muted/50"
            : "text-text-primary hover:bg-accent-soft hover:text-accent";

          return (
            <div
              key={`day-${day}`}
              className={`${cellBase} ${size === "lg" ? "h-16" : "h-9 w-9 mx-auto"}`}
              onClick={() => !disabled && onSelectDay(day)}
            >
              <span
                className={`flex flex-col h-full w-full justify-center rounded-sm font-body transition-all duration-150 ${dayClasses}`}
              >
                <p className={`text-center ${size === "lg" ? "text-base" : "text-xs"}`}>{day}</p>
                {size === "lg" && (
                  <p className="text-[12px] pl-1">
                    {isHolidayDay ? "Festivo" : isToday ? "Hoy" : undefined}
                  </p>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

// ─── Sub-componente: CalendarHeader ──────────────────────────────────────────

/**
 * Propósito: Encabezado del calendario con mes/año/rango clickeable y navegación.
 * Lógica clave: El botón central cambia el modo de vista al hacer clic.
 *   - En modo "days"  → muestra "MES AÑO", clic abre "months"
 *   - En modo "months"→ muestra "AÑO", clic abre "years"
 *   - En modo "years" → muestra el rango de años, clic no hace nada
 */
interface CalendarHeaderProps {
  year: number;
  month: number;
  mode: CalendarMode;
  yearBase: number;
  onPrev: () => void;
  onNext: () => void;
  onClickTitle: () => void;
  selectionMode: SelectionMode;
  size?: "sm" | "lg";
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  mode,
  yearBase,
  onPrev,
  onNext,
  onClickTitle,
  selectionMode,
  size = "lg",
}) => {
  const btnClass =
    size === "lg"
      ? "flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:border-border-strong hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer"
      : "flex items-center justify-center w-7 h-7 rounded-md border border-border text-text-secondary hover:border-border-strong hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer";

  // El título es clickeable si hay una vista más alta disponible según el selectionMode
  const canDrillUp =
    (mode === "days" && selectionMode === "date") ||
    (mode === "months" && (selectionMode === "date" || selectionMode === "month")) ||
    (mode === "days" && selectionMode === "month");

  const titleLabel =
    mode === "years"
      ? `${yearBase} – ${yearBase + 11}`
      : mode === "months"
      ? String(year)
      : `${MESES_LARGO[month]} ${year}`;

  return (
    <div className={`flex items-center justify-between ${size === "lg" ? "mb-6 px-1" : "mb-3 px-0"}`}>
      <button className={btnClass} onClick={onPrev} aria-label="Anterior">
        <ChevronLeft size={size === "lg" ? 16 : 10} />
      </button>

      <button
        type="button"
        onClick={canDrillUp ? onClickTitle : undefined}
        className={`
          flex flex-col items-center gap-0 px-2 py-1 rounded-md transition-all duration-150
          ${
            canDrillUp
              ? "cursor-pointer hover:bg-accent-soft hover:text-accent"
              : "cursor-default"
          }
        `}
        aria-label={canDrillUp ? "Cambiar vista" : undefined}
      >
        <span
          className={`font-heading font-semibold tracking-widest text-text-primary ${
            size === "lg" ? "text-sm" : "text-xs"
          }`}
        >
          {titleLabel}
        </span>
        {canDrillUp && (
          <span className={`text-accent font-body ${size === "lg" ? "text-[10px]" : "text-[9px]"}`}>
            ▲ cambiar
          </span>
        )}
      </button>

      <button className={btnClass} onClick={onNext} aria-label="Siguiente">
        <ChevronRight size={size === "lg" ? 16 : 14} />
      </button>
    </div>
  );
};

// ─── Componente principal: Calendar ──────────────────────────────────────────

const Calendar: React.FC<CalendarProps> = ({
  variant = "full",
  selectionMode = "date",
  value = null,
  onChange,
  minDate,
  maxDate,
  placeholder = "Seleccionar fecha",
  label,
  disabled = false,
  className = "",
}) => {
  const today = new Date();

  // Vista actual del calendario (navegación de mes/año)
  const [viewDate, setViewDate] = useState(() => {
    const base = value ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  /**
   * Modo de vista interna:
   *   - selectionMode "date"  → empieza en "days"
   *   - selectionMode "month" → empieza en "months"
   *   - selectionMode "year"  → empieza en "years"
   */
  const initialMode: CalendarMode =
    selectionMode === "year" ? "years" : selectionMode === "month" ? "months" : "days";

  const [mode, setMode] = useState<CalendarMode>(initialMode);

  // Base del rango de años (múltiplo de 12, p.ej. 2024 → 2024)
  const [yearBase, setYearBase] = useState(() => {
    const y = (value ?? new Date()).getFullYear();
    return Math.floor(y / 12) * 12;
  });

  // Estado del popover (solo variante "input")
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, placement: "bottom" });

  // Cerrar popover al hacer clic fuera
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Calcular posición del popover
  useEffect(() => {
  if (open && triggerRef.current) {
    const rect = triggerRef.current.getBoundingClientRect();
    const calendarHeight = 300; // Altura estimada del calendario
    const windowHeight = window.innerHeight;
    
    // Verificamos si hay espacio suficiente abajo
    const spaceBelow = windowHeight - rect.bottom;
    const shouldShowUp = spaceBelow < calendarHeight && rect.top > calendarHeight;

    const newPlacement = shouldShowUp ? "top" : "bottom";
    
    setCoords({
      top: shouldShowUp 
        ? rect.top + window.scrollY - calendarHeight - 0  // Posición arriba
        : rect.bottom + window.scrollY + 0,               // Posición abajo
      left: rect.left + window.scrollX,
      placement: newPlacement
    });
  }
}, [open]);

  // ── Handlers de navegación ───────────────────────────────────────────────────

  const handlePrev = useCallback(() => {
    if (mode === "years") {
      setYearBase((b) => b - 12);
    } else if (mode === "months") {
      setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
    } else {
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    }
  }, [mode]);

  const handleNext = useCallback(() => {
    if (mode === "years") {
      setYearBase((b) => b + 12);
    } else if (mode === "months") {
      setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));
    } else {
      setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    }
  }, [mode]);

  /** Clic en el título del header: sube un nivel de vista */
  const handleClickTitle = useCallback(() => {
    if (mode === "days") setMode("months");
    else if (mode === "months") {
      setYearBase(Math.floor(viewYear / 12) * 12);
      setMode("years");
    }
  }, [mode, viewYear]);

  // ── Handlers de selección ────────────────────────────────────────────────────

  /** Selección de año en la grilla de años */
  const handleSelectYear = useCallback(
    (year: number) => {
      setViewDate(new Date(year, viewMonth, 1));
      if (selectionMode === "year") {
        // Emitir 1 de enero del año seleccionado
        onChange?.(new Date(year, 0, 1));
        if (variant === "input") setOpen(false);
      } else {
        // Bajar a la vista de meses
        setMode("months");
      }
    },
    [viewMonth, selectionMode, onChange, variant]
  );

  /** Selección de mes en la grilla de meses */
  const handleSelectMonth = useCallback(
    (month: number) => {
      setViewDate(new Date(viewYear, month, 1));
      if (selectionMode === "month" || selectionMode === "year") {
        // Emitir el 1 del mes seleccionado
        onChange?.(new Date(viewYear, month, 1));
        if (variant === "input") setOpen(false);
      } else {
        // Bajar a la vista de días
        setMode("days");
      }
    },
    [viewYear, selectionMode, onChange, variant]
  );

  /** Selección de día en la grilla de días */
  const handleSelectDay = useCallback(
    (day: number) => {
      const selected = new Date(viewYear, viewMonth, day);
      onChange?.(selected);
      if (variant === "input") setOpen(false);
    },
    [viewYear, viewMonth, onChange, variant]
  );

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null as unknown as Date);
  };

  // ── Render del cuerpo del calendario ────────────────────────────────────────

  const renderBody = (size: "sm" | "lg") => (
    <>
      <CalendarHeader
        year={viewYear}
        month={viewMonth}
        mode={mode}
        yearBase={yearBase}
        onPrev={handlePrev}
        onNext={handleNext}
        onClickTitle={handleClickTitle}
        selectionMode={selectionMode}
        size={size}
      />

      {mode === "years" && (
        <YearGrid
          yearBase={yearBase}
          selected={value ?? null}
          onSelectYear={handleSelectYear}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
        />
      )}

      {mode === "months" && (
        <MonthGrid
          year={viewYear}
          selected={value ?? null}
          onSelectMonth={handleSelectMonth}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
        />
      )}

      {mode === "days" && (
        <CalendarGrid
          year={viewYear}
          month={viewMonth}
          selected={value ?? null}
          today={today}
          onSelectDay={handleSelectDay}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
        />
      )}
    </>
  );

  // ── Variante FULL ────────────────────────────────────────────────────────────
  if (variant === "full") {
    return (
      <div
        className={`bg-background rounded-md border border-border p-6 w-full max-w-2xl ${className}`}
      >
        {renderBody("lg")}
      </div>
    );
  }

  // ── Variante INPUT ───────────────────────────────────────────────────────────
  return (
    <div className={`relative inline-flex flex-col gap-1 ${className}`}>
      {/* Label opcional */}
      {label && (
        <label className="text-sm font-body text-text-secondary font-medium">{label}</label>
      )}

      {/* Trigger del input */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`
          inline-flex items-center gap-2 h-10 px-3 rounded-md border
          font-body text-sm transition-all duration-150 min-w-[220px] text-left
          ${open
            ? "border-border-strong ring-2 ring-border-strong/30 bg-background"
            : "border-border bg-background hover:border-border-strong"
          }
          ${disabled ? "opacity-50 cursor-not-allowed bg-muted" : "cursor-pointer"}
          ${value ? "text-text-primary" : "text-text-muted"}
        `}
      >
        <CalendarDays size={16} className={open ? "text-accent" : "text-text-muted"} />
        <span className="flex-1">
          {value ? formatDate(value, selectionMode) : placeholder}
        </span>
        {value && !disabled && (
          <span
            role="button"
            onClick={handleClear}
            className="text-text-muted hover:text-text-primary transition-colors"
            aria-label="Limpiar fecha"
          >
            <X size={14} />
          </span>
        )}
      </button>

      {/* Popover del calendario */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            aria-label="Selector de fecha"
            style={{
              position: "absolute",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="z-[9999] bg-background border border-border rounded-md p-4 w-auto min-w-64 shadow-lg"
          >
            {renderBody("sm")}
          </div>,
          document.body
        )}
    </div>
  );
};

// ─── Exportaciones ────────────────────────────────────────────────────────────

export { YearGrid, MonthGrid, CalendarGrid, CalendarHeader, Calendar };
export type { CalendarProps, CalendarMode, SelectionMode };