"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Folder, Search, ChevronDown, LucideIcon } from "lucide-react";
import { Tooltip } from "@/lib/components/ui/Compuesto/Tooltip";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../Tema";

// Definimos los tipos para que TypeScript valide el contenido que agregues
export interface SidebarLink {
  id: string;
  label: string;
  icon: LucideIcon;
  short: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarSubLink {
  label: string;
  href: string;
  isDot?: boolean;
}

interface SidebarProps {
  links: SidebarLink[];
  subLinks?: SidebarSubLink[];
  subLinksTitle?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  className?: string;
}

export function Sidebar({
  links,
  subLinks = [],
  subLinksTitle = "Sección",
  userName = "Usuario",
  userRole = "Miembro",
  userInitials = "US",
  className,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(true);

  return (
    <aside
      className={cn(
        "h-screen bg-surface border-r border-border flex flex-col justify-between transition-all duration-300 ease-in-out relative select-none font-body text-text-primary shrink-0",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Encabezado */}
      <div className={cn("p-4 flex items-center justify-between border-b border-border/40 h-16 shrink-0", isCollapsed && "justify-center px-2")}>
        {!isCollapsed && (
          <div className="flex items-center gap-1.5 truncate animate-in fade-in duration-200">
            <span className="font-bold text-base tracking-tight text-text-primary uppercase">Agustin</span>
          </div>
        )}
        <Tooltip content={isCollapsed ? "Expandir" : "Colapsar"} side="right">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-text-secondary hover:text-text-primary outline-none cursor-pointer transition-colors"
          >
            {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </Tooltip>
      </div>

      {/* Cuerpo de Navegación (DURANTE EL SCROLL SE QUEDA AQUÍ) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-none">
        {/* Mapeo de Links Principales Dinámicos */}
        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.onClick}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all outline-none cursor-pointer",
                  item.active 
                    ? "bg-accent-soft text-accent font-semibold" 
                    : "text-text-secondary hover:bg-muted hover:text-text-primary",
                  isCollapsed && "justify-center px-0 h-9"
                )}
              >
                <Icon className={cn("size-4 shrink-0", item.active ? "text-accent" : "text-text-muted")} />
                {!isCollapsed ? (
                  <span className="truncate animate-in fade-in duration-200">{item.label}</span>
                ) : (
                  <span className="text-[11px] font-bold tracking-tighter uppercase md:hidden">{item.short}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mapeo de Sub-Links / Acordeón Dinámico */}
        {subLinks.length > 0 && (
          <div className="space-y-1">
            {!isCollapsed ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsSubOpen(!isSubOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold tracking-wider text-text-muted uppercase hover:text-text-primary transition-colors cursor-pointer outline-none"
                >
                  <span>{subLinksTitle}</span>
                  <ChevronDown className={cn("size-3 transition-transform duration-200", !isSubOpen && "-rotate-90")} />
                </button>

                {isSubOpen && (
                  <div className="pl-4 space-y-0.5 animate-in slide-in-from-top-1 duration-150">
                    {subLinks.map((p, idx) => (
                      <a
                        key={idx}
                        href={p.href}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-muted/50 transition-colors truncate"
                      >
                        {p.isDot && <span className="size-2 rounded-full bg-text-success shrink-0" />}
                        <span className="truncate">{p.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center py-2 border-t border-border/40 text-text-muted">
                <Folder className="size-4" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pie de página de Usuario */}
      <div className={cn("p-4 border-t border-border/40 flex items-center gap-3 h-16 shrink-0", isCollapsed && "justify-center px-2")}>
        <div className="shrink-0">
          {/* {userInitials}  */}<ThemeToggle /> 
        </div>
        {/* {!isCollapsed && (
          <div className="flex flex-col min-w-0 flex-1 text-left animate-in fade-in duration-200">
            <span className="text-sm font-semibold text-text-primary truncate">{userName}</span>
            <span className="text-xs text-text-muted font-medium capitalize">{userRole}</span>
          </div>
        )} */}
       
      </div>
    </aside>
  );
}