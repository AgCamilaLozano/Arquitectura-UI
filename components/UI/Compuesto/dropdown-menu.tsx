// /components/ui/DropdownMenu.tsx

/**
 * Propósito: Menú desplegable reutilizable con soporte para grupos,
 * separadores, íconos, ítems deshabilitados y alineación configurable.
 * Compatible con el design system vía tokens de globals.css.
 */

"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Un ítem individual dentro del menú */
export interface DropdownItem {
  label: string;
  /** Ícono opcional a la izquierda del label */
  icon?: ReactNode;
  /** Ícono opcional a la derecha del label */
  trailingIcon?: ReactNode;
  onClick?: () => void;
  /** Deshabilita la interacción del ítem */
  disabled?: boolean;
  /** Variante de color para acciones destructivas */
  variant?: "default" | "danger";
  /** Separador visual debajo del ítem */
  separator?: boolean;
}

/** Grupo de ítems con label opcional */
export interface DropdownGroup {
  groupLabel?: string;
  items: DropdownItem[];
}

/**
 * Props del DropdownMenu
 * @param trigger      - Contenido del botón que abre el menú
 * @param groups       - Array de grupos de ítems
 * @param align        - Alineación del panel (left | right | center)
 * @param width        - Ancho del panel (ej. "w-48", "w-64")
 * @param disabled     - Deshabilita el trigger completo
 * @param className    - Clases extra para el contenedor raíz
 */
export interface DropdownMenuProps {
  trigger: ReactNode;
  groups: DropdownGroup[];
  align?: "left" | "right" | "center";
  width?: string;
  disabled?: boolean;
  className?: string;
}

// ─── Mapas de utilidad ────────────────────────────────────────────────────────

const alignMap: Record<NonNullable<DropdownMenuProps["align"]>, string> = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 -translate-x-1/2",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export function DropdownMenu({
  trigger,
  groups,
  align = "left",
  width = "w-52",
  disabled = false,
  className = "",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Lógica clave: cierra el menú al hacer click fuera del contenedor.
   * Usa `mousedown` para capturar antes de que el foco cambie.
   */
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  /** Cierra el menú al presionar Escape */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick?.();
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative z-[9999] inline-block ${className}`}>
      {/* ── Trigger ── */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
          "border border-border bg-surface text-text-primary",
          "transition-colors duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-muted cursor-pointer",
          open ? "ring-2 ring-accent" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {trigger}

        {/* Chevron animado */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={[
            "absolute  z-[9999] mt-2",
            alignMap[align],
            width,
            "rounded-xl border border-border bg-surface py-1",
            "shadow-[var(--shadow-card)]",
            "animate-in fade-in-0 zoom-in-95 duration-150",
          ].join(" ")}
        >
          {groups.map((group, gIdx) => (
            <div key={gIdx}>
              {/* Label de grupo */}
              {group.groupLabel && (
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none">
                  {group.groupLabel}
                </p>
              )}

              {/* Ítems del grupo */}
              {group.items.map((item, iIdx) => (
                <div key={iIdx}>
                  <button
                    role="menuitem"
                    type="button"
                    disabled={item.disabled}
                    onClick={() => handleItemClick(item)}
                    className={[
                      "flex w-full items-center gap-2.5 px-3 py-2 text-sm text-left",
                      "transition-colors duration-100",
                      item.disabled
                        ? "cursor-not-allowed text-text-disabled"
                        : item.variant === "danger"
                          ? "cursor-pointer text-text-error hover:bg-error"
                          : "cursor-pointer text-text-primary hover:bg-accent-soft hover:text-accent",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {/* Ícono izquierdo */}
                    {item.icon && (
                      <span className="shrink-0 text-current" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}

                    {/* Label */}
                    <span className="flex-1">{item.label}</span>

                    {/* Ícono derecho / trailing */}
                    {item.trailingIcon && (
                      <span className="shrink-0 text-text-muted" aria-hidden="true">
                        {item.trailingIcon}
                      </span>
                    )}
                  </button>

                  {/* Separador opcional */}
                  {item.separator && (
                    <hr className="my-1 border-border" />
                  )}
                </div>
              ))}

              {/* Separador entre grupos (excepto el último) */}
              {gIdx < groups.length - 1 && (
                <hr className="my-1 border-border" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}