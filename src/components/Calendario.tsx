"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, X } from "lucide-react";
import Holidays from "date-holidays";
// Importamos el Popover de Radix para un anclaje perfecto
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/src/utils/utils";

// ─── Tipos e Interfaces (Idénticos a tu lógica) ───────────────────────────────
type CalendarMode = "days" | "months" | "years";
type SelectionMode = "date" | "month" | "year";

interface HolidayType {
  date: string;
  start: Date;
  end: Date;
  name: string;
  type: string;
}

export interface CalendarProps {
  variant?: "full" | "input";
  selectionMode?: SelectionMode;
  value?: Date | null;
  onChange?: (date: Date | null) => void; // Permitimos null para el borrado limpio
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MESES_LARGO: Record<number, string> = {
  0: "ENERO", 1: "FEBRERO", 2: "MARZO", 3: "ABRIL", 4: "MAYO", 5: "JUNIO",
  6: "JULIO", 7: "AGOSTO", 8: "SEPTIEMBRE", 9: "OCTUBRE", 10: "NOVIEMBRE", 11: "DICIEMBRE",
};

const MESES_CORTO: Record<number, string> = {
  0: "Ene", 1: "Feb", 2: "Mar", 3: "Abr", 4: "May", 5: "Jun",
  6: "Jul", 7: "Ago", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dic",
};

// ─── Tus Funciones Utilitarias Matemáticas Matemáticas (Se quedan igual) ──────
export function getDiasDelMes(year: number, month: number): (number | null)[] {
  const primerDia = new Date(year, month, 1).getDay();
  const offset = primerDia === 0 ? 6 : primerDia - 1;
  const totalDias = new Date(year, month + 1, 0).getDate();
  const dias: (number | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= totalDias; i++) dias.push(i);
  return dias;
}

export function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export function isWeekendDate(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export function isDisabledDay(day: number, year: number, month: number, min?: Date, max?: Date): boolean {
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
  if (mode === "month") return date.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ─── Sub-componentes Visuales Internos Reutilizables ─────────────────────────

interface YearGridProps {
  yearBase: number;
  selected: Date | null;
  onSelectYear: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "lg";
}
export const YearGrid: React.FC<YearGridProps> = ({ yearBase, selected, onSelectYear, minDate, maxDate, size = "lg" }) => {
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
            className={cn(
              "flex items-center justify-center rounded-md border transition-all duration-150 outline-none",
              size === "lg" ? "h-10 text-sm" : "h-8 text-xs",
              isSelected
                ? "bg-accent text-white border-accent shadow-xs"
                : isCurrentYear
                ? "border-accent bg-accent-soft text-accent font-medium"
                : disabled
                ? "text-text-disabled bg-muted/50 cursor-not-allowed border-border"
                : "border-border text-text-primary hover:bg-accent-soft hover:text-accent hover:border-accent cursor-pointer"
            )}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};

interface MonthGridProps {
  year: number;
  selected: Date | null;
  onSelectMonth: (month: number) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "lg";
}
export const MonthGrid: React.FC<MonthGridProps> = ({ year, selected, onSelectMonth, minDate, maxDate, size = "lg" }) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-3 gap-1">
      {Object.entries(MESES_CORTO).map(([key, label]) => {
        const month = Number(key);
        const isSelected = selected ? selected.getFullYear() === year && selected.getMonth() === month : false;
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const disabled = isDisabledMonth(year, month, minDate, maxDate);

        return (
          <button
            key={month}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onSelectMonth(month)}
            className={cn(
              "flex items-center justify-center rounded-md border transition-all duration-150 outline-none",
              size === "lg" ? "h-12 text-sm" : "h-9 text-xs",
              isSelected
                ? "bg-accent text-white border-accent shadow-xs"
                : isCurrentMonth
                ? "border-accent bg-accent-soft text-accent font-medium"
                : disabled
                ? "text-text-disabled bg-muted/50 cursor-not-allowed border-border"
                : "border-border text-text-primary hover:bg-accent-soft hover:text-accent hover:border-accent cursor-pointer"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

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
export const CalendarGrid: React.FC<CalendarGridProps> = ({ year, month, selected, today, onSelectDay, minDate, maxDate, size = "lg" }) => {
  const dias = getDiasDelMes(year, month);

  const holidays = useMemo(() => {
    const hd = new Holidays("CO");
    return hd.getHolidays(year).map((h: HolidayType) => new Date(h.date));
  }, [year]);

  return (
    <>
      <div className={cn("grid grid-cols-7", size === "lg" ? "mb-2" : "mb-1")}>
        {DIAS_SEMANA.map((d, i) => (
          <div key={i} className={cn("text-center font-medium border-b border-border text-text-muted select-none", size === "lg" ? "text-sm py-2" : "text-[12px] py-1")}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {dias.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className={size === "lg" ? "h-14 w-full" : "h-8 w-8 mx-auto"} />;

          const date = new Date(year, month, day);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isToday = isSameDay(date, today);
          const disabled = isDisabledDay(day, year, month, minDate, maxDate);
          const isHolidayDay = holidays.some((h) => isSameDay(date, h));
          const isWeekendDayValue = !isHolidayDay && isWeekendDate(date);

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelectDay(day)}
              className={cn(
                "flex flex-col items-center justify-center border border-border select-none transition-all duration-150 outline-none",
                size === "lg" ? "h-14 w-full p-1" : "h-8 w-8 mx-auto rounded-md",
                isSelected
                  ? "bg-accent text-white border-accent shadow-xs scale-102"
                  : isToday
                  ? "border-accent bg-accent-soft text-accent font-semibold"
                  : disabled
                  ? "text-text-disabled bg-muted/40 cursor-not-allowed"
                  : isHolidayDay
                  ? "bg-error/40 text-text-error border-text-error/20"
                  : isWeekendDayValue
                  ? "bg-muted/20 text-text-muted hover:bg-muted/40"
                  : "text-text-primary hover:bg-accent-soft hover:text-accent"
              )}
            >
              <span className={cn("text-center block", size === "lg" ? "text-sm font-medium" : "text-xs")}>{day}</span>
              {size === "lg" && (
                <span className="text-[10px] block opacity-80 truncate">
                  {isHolidayDay ? "Festivo" : isToday ? "Hoy" : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

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
export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ year, month, mode, yearBase, onPrev, onNext, onClickTitle, selectionMode, size = "lg" }) => {
  const canDrillUp = (mode === "days" && selectionMode === "date") || (mode === "months" && (selectionMode === "date" || selectionMode === "month")) || (mode === "days" && selectionMode === "month");
  const titleLabel = mode === "years" ? `${yearBase} – ${yearBase + 11}` : mode === "months" ? String(year) : `${MESES_LARGO[month]} ${year}`;

  return (
    <div className={cn("flex items-center justify-between", size === "lg" ? "mb-4 px-1" : "mb-2 px-0")}>
      <button type="button" className={cn("flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer outline-none", size === "lg" ? "size-9" : "size-7")} onClick={onPrev}>
        <ChevronLeft size={size === "lg" ? 16 : 14} />
      </button>

      <button type="button" onClick={canDrillUp ? onClickTitle : undefined} className={cn("flex flex-col items-center px-3 py-1 rounded-md transition-all duration-150 outline-none", canDrillUp ? "cursor-pointer hover:bg-accent-soft hover:text-accent" : "cursor-default")}>
        <span className={cn("font-semibold tracking-wider text-text-primary", size === "lg" ? "text-sm" : "text-xs")}>{titleLabel}</span>
        {canDrillUp && <span className="text-accent text-[9px] font-medium mt-0.5">▲ cambiar vista</span>}
      </button>

      <button type="button" className={cn("flex items-center justify-center rounded-lg border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-150 cursor-pointer outline-none", size === "lg" ? "size-9" : "size-7")} onClick={onNext}>
        <ChevronRight size={size === "lg" ? 16 : 14} />
      </button>
    </div>
  );
};

// ─── Componente Principal Calendar ────────────────────────────────────────────

export const Calendar: React.FC<CalendarProps> = ({
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
  const today = useMemo(() => new Date(), []);
  const [isMounted, setIsMounted] = useState(false);

  // 4. SOLUCIÓN AL BUG DE HYDRATION: Esperar a que monte el cliente antes de evaluar fechas dinámicas
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [viewDate, setViewDate] = useState(() => {
    const base = value ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const initialMode: CalendarMode = selectionMode === "year" ? "years" : selectionMode === "month" ? "months" : "days";
  const [mode, setMode] = useState<CalendarMode>(initialMode);

  const [yearBase, setYearBase] = useState(() => {
    const y = (value ?? new Date()).getFullYear();
    return Math.floor(y / 12) * 12;
  });

  const handlePrev = useCallback(() => {
    if (mode === "years") setYearBase((b) => b - 12);
    else if (mode === "months") setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1));
    else setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, [mode]);

  const handleNext = useCallback(() => {
    if (mode === "years") setYearBase((b) => b + 12);
    else if (mode === "months") setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1));
    else setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, [mode]);

  const handleClickTitle = useCallback(() => {
    if (mode === "days") setMode("months");
    else if (mode === "months") {
      setYearBase(Math.floor(viewYear / 12) * 12);
      setMode("years");
    }
  }, [mode, viewYear]);

  const handleSelectYear = useCallback((year: number) => {
    setViewDate(new Date(year, viewMonth, 1));
    if (selectionMode === "year") {
      onChange?.(new Date(year, 0, 1));
    } else setMode("months");
  }, [viewMonth, selectionMode, onChange]);

  const handleSelectMonth = useCallback((month: number) => {
    setViewDate(new Date(viewYear, month, 1));
    if (selectionMode === "month" || selectionMode === "year") {
      onChange?.(new Date(viewYear, month, 1));
    } else setMode("days");
  }, [viewYear, selectionMode, onChange]);

  const handleSelectDay = useCallback((day: number) => {
    onChange?.(new Date(viewYear, viewMonth, day));
  }, [viewYear, viewMonth, onChange]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const renderBody = (size: "sm" | "lg") => (
    <div className="flex flex-col gap-1.5">
      <CalendarHeader
        year={viewYear} month={viewMonth} mode={mode} yearBase={yearBase}
        onPrev={handlePrev} onNext={handleNext} onClickTitle={handleClickTitle}
        selectionMode={selectionMode} size={size}
      />
      {mode === "years" && <YearGrid yearBase={yearBase} selected={value} onSelectYear={handleSelectYear} minDate={minDate} maxDate={maxDate} size={size} />}
      {mode === "months" && <MonthGrid year={viewYear} selected={value} onSelectMonth={handleSelectMonth} minDate={minDate} maxDate={maxDate} size={size} />}
      {mode === "days" && <CalendarGrid year={viewYear} month={viewMonth} selected={value} today={today} onSelectDay={handleSelectDay} minDate={minDate} maxDate={maxDate} size={size} />}
    </div>
  );

  if (!isMounted) return <div className="h-10 min-w-[220px] bg-muted/20 animate-pulse rounded-md" />;

  // ── Variante FULL (Calendario Incrustado) ────────────────────────────────────
  if (variant === "full") {
    return (
      <div className={cn("bg-background rounded-xl border border-border p-5 w-full max-w-xl shadow-xs", className)}>
        {renderBody("lg")}
      </div>
    );
  }

  // ── Variante INPUT (Flotante mediante Radix Popover) ─────────────────────────
  return (
    <div className={cn("flex flex-col gap-1.5 w-fit", className)}>
      {label && <label className="text-sm text-text-secondary font-medium select-none">{label}</label>}

      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-2 h-10 px-3 rounded-md border text-sm transition-all duration-150 min-w-[220px] text-left bg-background outline-none shadow-xs",
              "border-border text-text-primary hover:border-accent cursor-pointer",
              "data-[state=open]:border-accent data-[state=open]:ring-[3px] data-[state=open]:ring-accent-soft",
              disabled && "opacity-50 cursor-not-allowed bg-muted"
            )}
          >
            <CalendarDays size={16} className="text-text-muted shrink-0" />
            <span className={cn("flex-1 truncate", !value && "text-text-muted")}>
              {value ? formatDate(value, selectionMode) : placeholder}
            </span>
            {value && !disabled && (
              <span role="button" onClick={handleClear} className="text-text-muted hover:text-text-primary transition-colors shrink-0 p-0.5" aria-label="Limpiar fecha">
                <X size={14} />
              </span>
            )}
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            sideOffset={6}
            align="start"
            className={cn(
              "z-[9999] bg-background border border-border rounded-md p-4 w-auto min-w-64 shadow-[var(--shadow-card)] outline-none",
              "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-150"
            )}
          >
            {renderBody("sm")}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
};