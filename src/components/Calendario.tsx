"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import Holidays from "date-holidays";
import { cn } from "@/src"; // Importación oficial del proyecto (lib/utils.ts)

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
  selectionMode?: SelectionMode;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
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

/* ==========================================================================
   SUBCOMPONENTES VISUALES
   ========================================================================== */

interface YearGridProps {
  yearBase: number;
  selected: Date | null;
  onSelectYear: (year: number) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const YearGrid: React.FC<YearGridProps> = ({
  yearBase,
  selected,
  onSelectYear,
  minDate,
  maxDate,
}) => {
  const years = Array.from({ length: 12 }, (_, i) => yearBase + i);
  const today = new Date();

  return (
    <div className="grid grid-cols-4 gap-1.5 font-lato">
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
              "flex items-center justify-center rounded-[var(--radius)] border border-[hsl(var(--border-default))] transition-all duration-150 outline-none select-none h-10 text-sm font-medium",
              "focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]",
              isSelected
                ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border-[hsl(var(--accent))] font-semibold shadow-xs"
                : isCurrentYear
                ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] font-semibold"
                : disabled
                ? "text-[hsl(var(--text-secondary))]/40 bg-[hsl(var(--surface))]/50 border-[hsl(var(--border-default))]/60 cursor-not-allowed"
                : "text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent))] cursor-pointer"
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
}

export const MonthGrid: React.FC<MonthGridProps> = ({
  year,
  selected,
  onSelectMonth,
  minDate,
  maxDate,
}) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-3 gap-1.5 font-lato">
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
              "flex items-center justify-center rounded-[var(--radius)] border border-[hsl(var(--border-default))] transition-all duration-150 outline-none select-none h-12 text-sm font-medium",
              "focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]",
              isSelected
                ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border-[hsl(var(--accent))] shadow-xs font-semibold"
                : isCurrentMonth
                ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] font-semibold"
                : disabled
                ? "text-[hsl(var(--text-secondary))]/40 bg-[hsl(var(--surface))]/50 border-[hsl(var(--border-default))]/60 cursor-not-allowed"
                : "text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent))] cursor-pointer"
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
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  selected,
  today,
  onSelectDay,
  minDate,
  maxDate,
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
      <div className="grid grid-cols-7 font-lato mb-2">
        {DIAS_SEMANA.map((d, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium border-b border-[hsl(var(--border-default))] text-[hsl(var(--text-secondary))] select-none py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 font-lato">
        {dias.map((day, i) => {
          if (!day)
            return <div key={`empty-${i}`} className="h-14 w-full" />;

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
                "flex flex-col items-center justify-center border-b border-[hsl(var(--border-default))] select-none transition-all duration-150 outline-none h-14 w-full p-1",
                "focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:z-10",
                isSelected
                  ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border-[hsl(var(--accent))] shadow-xs font-semibold z-10"
                  : isToday
                  ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))] font-semibold"
                  : disabled
                  ? "text-[hsl(var(--text-secondary))]/40 bg-[hsl(var(--surface))]/50 cursor-not-allowed"
                  : isHolidayDay
                  ? "bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))] border-[hsl(var(--destructive))]/20 font-medium"
                  : isWeekendDayValue
                  ? "bg-[hsl(var(--surface))]/60 text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--surface))]"
                  : "text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--accent))]"
              )}
            >
              <span className="text-center block text-sm font-medium">
                {day}
              </span>
              <span className="text-[10px] block opacity-80 truncate leading-none mt-0.5">
                {isHolidayDay ? "Festivo" : isToday ? "Hoy" : ""}
              </span>
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
    <div className="flex items-center justify-between font-lato mb-4 px-1">
      <button
        type="button"
        aria-label="Período anterior"
        className={cn(
          "flex items-center justify-center rounded-[var(--radius)] border border-[hsl(var(--border-default))] text-[hsl(var(--text-secondary))] size-8",
          "hover:border-[hsl(var(--text-primary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface))] transition-all duration-150 cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
        )}
        onClick={onPrev}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={canDrillUp ? onClickTitle : undefined}
        className={cn(
          "flex flex-col items-center px-3 py-1 rounded-[var(--radius)] transition-all duration-150 outline-none",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]",
          canDrillUp ? "cursor-pointer hover:bg-[hsl(var(--accent-soft))] hover:text-[hsl(var(--accent))]" : "cursor-default"
        )}
      >
        <span className="font-montserrat font-semibold tracking-tight text-[hsl(var(--text-primary))] text-base">
          {titleLabel}
        </span>
        {canDrillUp && <span className="text-[hsl(var(--accent))] text-[10px] font-medium leading-none mt-0.5">▲ cambiar vista</span>}
      </button>

      <button
        type="button"
        aria-label="Período siguiente"
        className={cn(
          "flex items-center justify-center rounded-[var(--radius)] border border-[hsl(var(--border-default))] text-[hsl(var(--text-secondary))] size-8",
          "hover:border-[hsl(var(--text-primary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface))] transition-all duration-150 cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
        )}
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
};

/* ==========================================================================
   COMPONENTE PRINCIPAL: CALENDAR (ÚNICAMENTE VARIANTE INCRUSTADA "FULL")
   ========================================================================== */

export const Calendar: React.FC<CalendarProps> = ({
  selectionMode = "date",
  value = null,
  onChange,
  minDate,
  maxDate,
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

  if (!isMounted) {
    return <div className="h-80 w-full max-w-xl bg-[hsl(var(--surface))]/50 animate-pulse rounded-[var(--radius)]" />;
  }

  return (
    <div
      className={cn(
        "bg-[hsl(var(--background))] rounded-[var(--radius)] border border-[hsl(var(--border-default))] p-5 w-full max-w-xl shadow-xs font-lato text-[hsl(var(--text-primary))]",
        className
      )}
    >
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
        />
        {mode === "years" && (
          <YearGrid
            yearBase={yearBase}
            selected={value}
            onSelectYear={handleSelectYear}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
        {mode === "months" && (
          <MonthGrid
            year={viewYear}
            selected={value}
            onSelectMonth={handleSelectMonth}
            minDate={minDate}
            maxDate={maxDate}
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
          />
        )}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";