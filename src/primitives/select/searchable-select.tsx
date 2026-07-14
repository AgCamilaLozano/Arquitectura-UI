"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/src/utils/utils";

interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SearchableSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  allowCustom?: boolean;
  customPlaceholder?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  className,
  disabled = false,
  allowCustom = false,
  customPlaceholder = "Escribir otro...",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const isCustom = value && !options.some((o) => o.value === value);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setShowCustomInput(false);
        setCustomValue("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? (isCustom ? value : placeholder);

  function handleCustomConfirm() {
    const trimmed = customValue.trim();
    if (trimmed) {
      onValueChange(trimmed);
    }
    setShowCustomInput(false);
    setCustomValue("");
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => { if (!disabled) setOpen((p) => !p); setShowCustomInput(false); setCustomValue(""); }}
        className={cn(
          "flex items-center justify-between gap-1 w-full rounded-md border border-border",
          "bg-background px-3 py-2 text-sm ring-offset-background",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-accent-soft/50 transition-colors"
        )}
      >
        <span className="truncate text-left">
          {displayLabel}
        </span>
        <span
          className={cn(
            "text-xs shrink-0 text-text-secondary transition-transform duration-200",
            open && "rotate-180"
          )}
        >▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[200px] rounded-md border bg-background border-border shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-sm border-0 border-border bg-transparent px-2 py-1 text-sm outline-none placeholder:text-text-secondary"
              />
            </div>
          </div>

          {showCustomInput ? (
            <div className="p-2">
              <div className="flex gap-2">
                <input
                  ref={customInputRef}
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCustomConfirm();
                    }
                    if (e.key === "Escape") {
                      setShowCustomInput(false);
                      setCustomValue("");
                    }
                  }}
                  placeholder={customPlaceholder}
                  className="flex-1 rounded-sm border border-border bg-transparent px-2 py-1 text-sm outline-none placeholder:text-text-secondary"
                />
                <button
                  type="button"
                  onClick={handleCustomConfirm}
                  disabled={!customValue.trim()}
                  className="px-2 py-1 text-xs font-medium bg-accent text-white rounded-sm disabled:opacity-50"
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <ul className="max-h-56 overflow-y-auto scrollbar-soft py-1">
              {filtered.length === 0 && !allowCustom ? (
                <li className="px-3 py-2 text-sm text-text-seconcary text-center">
                  Sin resultados
                </li>
              ) : (
                filtered.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onValueChange(option.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-accent-soft/70 rounded-sm transition-colors"
                    >
                      <span
                        className={cn(
                          "text-xs w-3.5 text-center shrink-0",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      >✓</span>
                      <span className="truncate">{option.label}</span>
                    </button>
                  </li>
                ))
              )}
              {allowCustom && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomInput(true);
                      setQuery("");
                    }}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-accent font-medium hover:bg-accent-soft/70 rounded-sm transition-colors"
                  >
                    <span className="text-xs w-3.5 text-center shrink-0">+</span>
                    <span>Otro</span>
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
