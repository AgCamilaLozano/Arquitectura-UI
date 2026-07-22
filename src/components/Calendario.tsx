"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {CalendarDays, X } from "lucide-react";
import Holidays from "date-holidays";
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/src/utils/utils";

/* ==========================================================================
   TIPOS E INTERFACES
   ========================================================================== */

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
  onChange?: (date: Date | null) => void;
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

/* ==========================================================================
   FUNCIONES UTILITARIAS
   ========================================================================== */

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
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/* ==========================================================================
   SUBCOMPONENTES VISUALES
   ========================================================================== */

interface YearGridProps {
  yearBase: number;
  selected: Date | null;
  onSelectYear: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "sm" | "lg";
}

export const YearGrid: React.FC<YearGridProps> = ({
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
    <div className="grid grid-cols-4 gap-1.5 font-sans">
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
            aria-selected={isSelected}
            className={cn(
              "flex items-center justify-center rounded-sm border transition-all duration-150 outline-none select-none",
              "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20",
              size === "lg" ? "h-10 text-sm text-body-dense font-medium" : "h-8 text-caption",
              isSelected
                ? "bg-accent text-accent-foreground border-accent shadow-2xs font-semibold"
                : isCurrentYear
                ? "border-accent bg-accent-soft text-accent font-semibold"
                : disabled
                ? "text-text-secondary/40 bg-surface/50 border-border/60 cursor-not-allowed"
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

export const MonthGrid: React.FC<MonthGridProps> = ({
  year,
  selected,
  onSelectMonth,
  minDate,
  maxDate,
  size = "lg",
}) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-3 gap-1.5 font-sans">
      {Object.entries(MESES_CORTO).map(([key, label]) => {
        const month = Number(key);
        const isSelected =
          selected ? selected.getFullYear() === year && selected.getMonth() === month : false;
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const disabled = isDisabledMonth(year, month, minDate, maxDate);

        return (
          <button
            key={month}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onSelectMonth(month)}
            aria-selected={isSelected}
            className={cn(
              "flex items-center justify-center rounded-sm border transition-all duration-150 outline-none select-none",
              "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20",
              size === "lg" ? "h-12 text-body-dense text-sm font-medium" : "h-9 text-caption",
              isSelected
                ? "bg-accent text-accent-foreground border-accent shadow-2xs font-semibold"
                : isCurrentMonth
                ? "border-accent bg-accent-soft text-accent font-semibold"
                : disabled
                ? "text-text-secondary/40 bg-surface/50 border-border/60 cursor-not-allowed"
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

export const CalendarGrid: React.FC<CalendarGridProps> = ({
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
    try {
      const hd = new Holidays("CO");
      return hd.getHolidays(year).map((h: HolidayType) => new Date(h.date));
    } catch {
      return [];
    }
  }, [year]);

  return (
    <>
      <div className={cn("grid grid-cols-7 font-sans", size === "lg" ? "mb-2" : "mb-1")}>
        {DIAS_SEMANA.map((d, i) => (
          <div
            key={i}
            className={cn(
              "text-center text-xs font-medium border-b border-border text-text-secondary select-none",
              size === "lg" ? "py-2" : "py-1"
            )}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 font-sans">
        {dias.map((day, i) => {
          if (!day)
            return (
              <div
                key={`empty-${i}`}
                className={size === "lg" ? "h-14 w-full" : "size-8 mx-auto"}
              />
            );

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
              aria-selected={isSelected}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "flex flex-col items-center justify-center border-b border-border select-none transition-all duration-150 outline-none",
                "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:z-10",
                size === "lg" ? "h-14  w-full p-1" : "size-8 mx-auto rounded-md",
                isSelected
                  ? "bg-accent text-accent-foreground border-accent shadow-2xs font-semibold z-10"
                  : isToday
                  ? "border-accent bg-accent-soft text-accent font-semibold"
                  : disabled
                  ? "text-text-secondary/40 bg-surface/50 cursor-not-allowed"
                  : isHolidayDay
                  ? "bg-destructive/15 text-destructive border-destructive/20 font-medium"
                  : isWeekendDayValue
                  ? "bg-surface/60 text-text-secondary hover:bg-surface"
                  : "text-text-primary hover:bg-accent-soft hover:text-accent"
              )}
            >
              <span className={cn("text-center block", size === "lg" ? "text-body-dense font-medium" : "text-caption")}>
                {day}
              </span>
              {size === "lg" && (
                <span className="text-[10px] block opacity-80 truncate leading-none mt-0.5">
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

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
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
    <div className={cn("flex items-center justify-between font-sans", size === "lg" ? "mb-4 px-1" : "mb-2 px-0")}>
      <button
        type="button"
        aria-label="Período anterior"
        className={cn(
          "flex flex-col items-center justify-center rounded-sm border border-border text-text-secondary",
          "hover:border-border-strong hover:text-text-primary hover:bg-surface transition-all duration-150 cursor-pointer outline-none",
          "focus-visible:border-border-strong focus-visible:ring-3 focus-visible:ring-border-strong/20",
          size === "lg" ? "size-8" : "size-6"
        )}
        onClick={onPrev}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={canDrillUp ? onClickTitle : undefined}
        className={cn(
          "flex flex-col items-center px-3 py-1 rounded-sm transition-all duration-150 outline-none",
          "focus-visible:ring-2 focus-visible:ring-border-strong",
          canDrillUp ? "cursor-pointer hover:bg-accent-soft hover:text-accent" : "cursor-default"
        )}
      >
        <span className={cn("font-heading font-semibold tracking-tight text-text-primary", size === "lg" ? "text-body-base" : "text-body-dense")}>
          {titleLabel}
        </span>
        {canDrillUp && <span className="text-accent text-[10px] font-medium leading-none mt-0.5">▲ cambiar vista</span>}
      </button>

      <button
        type="button"
        aria-label="Período siguiente"
        className={cn(
          "flex items-center justify-center rounded-sm border border-border text-text-secondary",
          "hover:border-border-strong hover:text-text-primary hover:bg-surface transition-all duration-150 cursor-pointer outline-none",
          "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20",
          size === "lg" ? "size-8" : "size-6"
        )}
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
};

/* ==========================================================================
   COMPONENTE PRINCIPAL: CALENDAR
   ========================================================================== */

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [viewDate, setViewDate] = useState(() => {
    const base = value ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const initialMode: CalendarMode =
    selectionMode === "year" ? "years" : selectionMode === "month" ? "months" : "days";
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

  const handleSelectYear = useCallback(
    (year: number) => {
      setViewDate(new Date(year, viewMonth, 1));
      if (selectionMode === "year") {
        onChange?.(new Date(year, 0, 1));
      } else setMode("months");
    },
    [viewMonth, selectionMode, onChange]
  );

  const handleSelectMonth = useCallback(
    (month: number) => {
      setViewDate(new Date(viewYear, month, 1));
      if (selectionMode === "month" || selectionMode === "year") {
        onChange?.(new Date(viewYear, month, 1));
      } else setMode("days");
    },
    [viewYear, selectionMode, onChange]
  );

  const handleSelectDay = useCallback(
    (day: number) => {
      onChange?.(new Date(viewYear, viewMonth, day));
    },
    [viewYear, viewMonth, onChange]
  );

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const renderBody = (size: "sm" | "lg") => (
    <div className="flex flex-col gap-1.5">
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
          selected={value}
          onSelectYear={handleSelectYear}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
        />
      )}
      {mode === "months" && (
        <MonthGrid
          year={viewYear}
          selected={value}
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
          selected={value}
          today={today}
          onSelectDay={handleSelectDay}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
        />
      )}
    </div>
  );

  if (!isMounted)
    return <div className="h-10 min-w-[220px] bg-surface/50 animate-pulse rounded-md" />;

  /* ── VARIANTE FULL (INCRUSTADO EN PÁGINA) ── */
  if (variant === "full") {
    return (
      <div
        className={cn(
          "bg-background rounded-sm border border-border p-5 w-full max-w-xl shadow-xs font-sans text-text-primary",
          className
        )}
      >
        {renderBody("lg")}
      </div>
    );
  }

  /* ── VARIANTE INPUT (FLOTANTE MEDIANTE RADIX POPOVER) ── */
  return (
    <div className={cn("flex flex-col gap-1.5 w-fit font-sans", className)}>
      {label && (
        <label className="text-body-dense text-text-secondary font-medium select-none">
          {label}
        </label>
      )}

      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-2 h-9 px-3 rounded-sm border text-body-dense transition-all duration-150 min-w-[220px] text-left bg-background outline-none shadow-2xs",
              "border-border text-text-primary hover:border-border-strong cursor-pointer",
              /* Física de Enfoque Unificada (Glow Effect) */
              "focus-visible:border-border-strong focus-visible:ring-3 focus-visible:ring-border-strong/20",
              "data-[state=open]:border-border-strong data-[state=open]:ring-4 data-[state=open]:ring-border-strong/20",
              disabled && "opacity-50 cursor-not-allowed bg-surface/50"
            )}
          >
            <CalendarDays className="size-4 text-text-secondary shrink-0" />
            <span className={cn("flex-1 truncate", !value && "text-text-secondary/70")}>
              {value ? formatDate(value, selectionMode) : placeholder}
            </span>
            {value && !disabled && (
              <span
                role="button"
                onClick={handleClear}
                className="text-text-secondary hover:text-text-primary transition-colors shrink-0 p-0.5 rounded-xs focus-visible:ring-1 focus-visible:ring-border-strong"
                aria-label="Limpiar fecha"
              >
                <X className="size-3.5" />
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
              "z-50 bg-background border border-border rounded-sm p-4 w-auto min-w-64 shadow-card outline-none font-sans",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-150"
            )}
          >
            {renderBody("sm")}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
};