"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import AnimatedIconButton from "@/components/ui/buttonIcons/fondoIcons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md border border-border bg-transparent p-2 text-sm font-medium text-foreground transition-colors"
        aria-label="Cargando tema"
        disabled
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }
  const CurrentIcon =
    theme === 'dark' ? Moon :
      theme === 'system' ? Laptop :
        Sun;

  return (
    <div className="relative" ref={menuRef}>
      <AnimatedIconButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar tema"
        Icon={CurrentIcon} />

      <span className="sr-only">Toggle theme</span>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-40 rounded-md border border-border-sidebar bg-background text-text-primary shadow-lg z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => { setTheme("light"); setIsOpen(false); }} className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent">
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </button>
            <button onClick={() => { setTheme("dark"); setIsOpen(false); }} className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent">
              <Moon className="mr-2 h-4 w-4" />
              <span>Oscuro</span>
            </button>
            <button onClick={() => { setTheme("system"); setIsOpen(false); }} className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent-hover/20 hover:text-accent">
              <Laptop className="mr-2 h-4 w-4" />
              <span>Sistema</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}