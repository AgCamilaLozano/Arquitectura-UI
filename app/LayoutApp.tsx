"use client";

import React from "react";
import { Sidebar, type SidebarLink, type SidebarSubLink } from "@/lib/components/ui/Navegacion/SideBar";
import { Home, Calculator, Settings, Layers, BarChart3 } from "lucide-react";
import { Breadcrumbs } from "@/lib/components/ui/Navegacion/Breadcrumbs";
import { Input } from "@/lib/components/ui/Base/Entradas";
import { Search } from "lucide-react";
import { Toaster } from "@/lib/components/ui/Compuesto/Toaster";
export default function LayoutApp({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // ── AQUÍ AGREGA TODO EL CONTENIDO EXTRA QUE TU QUIERAS ──
  const misEnlacesPrincipales: SidebarLink[] = [
    { id: "1", label: "Inicio", icon: Home, short: "IN" },
    { id: "2", label: "Calculadora Incentivos", icon: Calculator, short: "CA", active: true },
   
  ];

  const misProyectosExtra: SidebarSubLink[] = [
    { label: "Todos los proyectos", href: "/#" },                
  ];

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-background">
      
      {/* Le inyectamos los datos al componente por props */}
      <Sidebar 
        links={misEnlacesPrincipales} 
        subLinks={misProyectosExtra}
        subLinksTitle="Mis Proyectos"
        userName="Camila Andrea Lozano M..."
        userRole="Miembro Premium"
        userInitials="CA"
      />

        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0">
              <Breadcrumbs />
              <div className="flex items-center gap-4">
                <Input 
                type="search" 
                placeholder="Buscar en el dashboard..." 
                iconLeft={<Search />} 
                
              />
              </div>
           </header>
            <main className="flex-1 overflow-y-auto p-6 bg-background text-text-primary scrollbar-soft">
                {children}
                <Toaster />
            </main>
        </div>

    </div>
  );
}