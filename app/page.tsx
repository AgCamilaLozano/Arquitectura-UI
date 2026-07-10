"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Layers,
  MousePointerClick,
  Type,
  List,
  Tag,
  CreditCard,
  MessageSquare,
  ChevronDown,
  Columns,
  Table,
  BarChart3,
  CalendarDays,
  Navigation,
  Bell,
  UserCircle,
  ChevronsDownUp,
  PanelRightOpen,
  PawPrint,
} from "lucide-react";

import { ButtonsSection } from "./components-showcase/sections/buttons";
import { InputsSection } from "./components-showcase/sections/inputs";
import { SelectorsSection } from "./components-showcase/sections/selectors";
import { BadgesSection } from "./components-showcase/sections/badges";
import { CardsSection } from "./components-showcase/sections/cards";
import { DialogsSection } from "./components-showcase/sections/dialogs";
import { DropdownMenuSection } from "./components-showcase/sections/dropdown-menu";
import { TooltipSection } from "./components-showcase/sections/tooltip";
import { TabsSection } from "./components-showcase/sections/tabs";
import { DataTableSection } from "./components-showcase/sections/data-table";
import { ChartsSection } from "./components-showcase/sections/charts";
import { CalendarSection } from "./components-showcase/sections/calendar";
import { NavigationSection } from "./components-showcase/sections/navigation";
import { FeedbackSection } from "./components-showcase/sections/feedback";
import { AvatarSection } from "./components-showcase/sections/avatar";
import { CollapsiblePopoverSection } from "./components-showcase/sections/collapsible-popover";
import { SheetSection } from "./components-showcase/sections/sheet";
import { MascotSection } from "./components-showcase/sections/mascot";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarSections: SidebarItem[] = [
  { id: "buttons", label: "Botones", icon: <MousePointerClick className="size-4" /> },
  { id: "inputs", label: "Entradas", icon: <Type className="size-4" /> },
  { id: "selectors", label: "Selectores", icon: <List className="size-4" /> },
  { id: "badges", label: "Badges", icon: <Tag className="size-4" /> },
  { id: "cards", label: "Cards", icon: <CreditCard className="size-4" /> },
  { id: "dialogs", label: "Dialogs", icon: <MessageSquare className="size-4" /> },
  { id: "dropdown-menu", label: "Dropdown Menu", icon: <ChevronDown className="size-4" /> },
  { id: "tooltip", label: "Tooltip", icon: <Columns className="size-4" /> },
  { id: "tabs", label: "Tabs", icon: <Columns className="size-4" /> },
  { id: "data-table", label: "Tabla de Datos", icon: <Table className="size-4" /> },
  { id: "charts", label: "Gráficas", icon: <BarChart3 className="size-4" /> },
  { id: "calendar", label: "Calendario", icon: <CalendarDays className="size-4" /> },
  { id: "navigation", label: "Navegación", icon: <Navigation className="size-4" /> },
  { id: "feedback", label: "Feedback & Misc", icon: <Bell className="size-4" /> },
  { id: "avatar", label: "Avatar", icon: <UserCircle className="size-4" /> },
  { id: "collapsible-popover", label: "Collapsible & Popover", icon: <ChevronsDownUp className="size-4" /> },
  { id: "sheet", label: "Sheet", icon: <PanelRightOpen className="size-4" /> },
  { id: "mascot", label: "Mascota / Chat", icon: <PawPrint className="size-4" /> },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(sidebarSections[0].id);

  const handleScroll = useCallback(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    let current = sidebarSections[0].id;
    for (const section of sidebarSections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const mainRect = mainEl.getBoundingClientRect();
        if (rect.top - mainRect.top <= 120) {
          current = section.id;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;
    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex gap-6">
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-0 space-y-1">
          <div className="pb-3 mb-3 border-b border-border">
            <div className="flex items-center gap-2 px-3">
              <Layers className="size-4 text-accent" />
              <h1 className="text-sm font-semibold text-text-primary">Componentes</h1>
            </div>
            <p className="px-3 mt-1 text-xs text-text-muted">
              {sidebarSections.length} componentes
            </p>
          </div>
          <nav className="space-y-0.5 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-soft">
            {sidebarSections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  activeSection === item.id
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-text-secondary hover:bg-surface hover:text-text-primary"
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 min-w-0 space-y-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">Librería UI</h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            Catálogo completo de componentes de <code className="text-accent font-mono text-xs bg-accent/10 px-1.5 py-0.5 rounded">@agustin/ui</code>.
            Cada componente incluye demo interactiva, props disponibles y código de uso.
          </p>
        </div>

        <ButtonsSection />
        <InputsSection />
        <SelectorsSection />
        <BadgesSection />
        <CardsSection />
        <DialogsSection />
        <DropdownMenuSection />
        <TooltipSection />
        <TabsSection />
        <DataTableSection />
        <ChartsSection />
        <CalendarSection />
        <NavigationSection />
        <FeedbackSection />
        <AvatarSection />
        <CollapsiblePopoverSection />
        <SheetSection />
        <MascotSection />
      </div>
    </div>
  );
}
