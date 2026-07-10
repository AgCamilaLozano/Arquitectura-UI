"use client";

import React from "react";
import { Home, Calculator, Settings, Layers, BarChart3 } from "lucide-react";
import { Input } from "@/lib/components/ui/Base/Entradas";
import { Search } from "lucide-react";
export default function LayoutApp({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // ── AQUÍ AGREGA TODO EL CONTENIDO EXTRA QUE TU QUIERAS ──

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-background">
      
      {/* Le inyectamos los datos al componente por props */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0">
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
            </main>
        </div>

    </div>
  );
}