"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenu as DropdownPrimitive } from "radix-ui"; 
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // 1. Control de Hidratación para Next.js (Mantenido tu patrón excelente)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent p-2 text-sm font-medium text-text-muted transition-colors opacity-60"
        aria-label="Cargando tema"
        disabled
      >
        <Sun className="size-5 animate-pulse" />
      </button>
    );
  }

  // Icono dinámico según el estado actual mapeado en el cliente
  const CurrentIcon =
    theme === "dark" ? Moon : 
    theme === "system" ? Laptop : 
    Sun;

  return (
    // 2. Encapsulamos con Radix para un comportamiento flotante perfecto
    <DropdownPrimitive.Root>
      
      <DropdownPrimitive.Trigger asChild>
        {/* El gatillo usa tu botón animado nativo */}
        <div className="inline-block outline-none">
          <button
            className={cn(
              "inline-flex items-center justify-center rounded-lg border border-border bg-transparent p-2 text-sm font-medium text-text-muted transition-colors hover:bg-accent-soft hover:text-accent focus:outline-none focus:ring-4 focus:ring-border-strong/20 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted"
            )}
            aria-label="Cambiar tema"
          >
            <CurrentIcon className="size-5" />
          </button>
        </div>
      </DropdownPrimitive.Trigger>

      {/* El Portal extrae el menú flotante al body de forma segura */}
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          align="end" // Alineado a la derecha por defecto para barras de navegación
          sideOffset={8} // mt-2 equivalente (8px)
          className={cn(
            "bg-surface text-text-primary border border-border rounded-md p-1 z-[9999] w-36 outline-none",
            "shadow-xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-150"
          )}
        >
          {/* Opción: Tema Claro */}
          <DropdownPrimitive.Item
            onClick={() => setTheme("light")}
            className="flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent"
          >
            <Sun className="mr-2.5 size-4" />
            <span>Claro</span>
          </DropdownPrimitive.Item>

          {/* Opción: Tema Oscuro */}
          <DropdownPrimitive.Item
            onClick={() => setTheme("dark")}
            className="flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent"
          >
            <Moon className="mr-2.5 size-4" />
            <span>Oscuro</span>
          </DropdownPrimitive.Item>

          {/* Opción: Sincronizar con Sistema */}
          <DropdownPrimitive.Item
            onClick={() => setTheme("system")}
            className="flex w-full items-center px-3 py-2 text-sm rounded-md outline-none select-none cursor-pointer transition-colors text-text-secondary focus:bg-accent-soft focus:text-accent"
          >
            <Laptop className="mr-2.5 size-4" />
            <span>Sistema</span>
          </DropdownPrimitive.Item>

        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}