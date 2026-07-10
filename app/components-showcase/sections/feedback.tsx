"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Separator } from "@/lib/components/ui/separator";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { EmptyState } from "@/lib/components/ui/Groups/empty-state";
import { Button } from "@/lib/components/ui/Base/Entradas";
import { Inbox, SearchX } from "lucide-react";
import { toast } from "sonner";

export function FeedbackSection() {
  return (
    <SectionLayout id="feedback" title="Feedback & Misc" description="Separator, Skeleton, EmptyState y Sonner/Toaster.">
      <ComponentDemo
        name="Separator"
        description="Línea divisora horizontal o vertical"
        props={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"' },
          { name: "decorative", type: "boolean", default: "true" },
        ]}
        code={`import { Separator } from "@agustin/ui/components";

<Separator />
<Separator orientation="vertical" className="h-8" />`}
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Contenido antes del separador</p>
          <Separator />
          <p className="text-sm text-text-secondary">Contenido después del separador</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">Izquierda</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-text-secondary">Derecha</span>
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Skeleton"
        description="Placeholder de carga con animación pulse"
        code={`import { Skeleton } from "@agustin/ui/components";

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-8 w-[200px]" />
<Skeleton className="h-12 w-12 rounded-full" />`}
      >
        <div className="space-y-3">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-8 w-[300px]" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="EmptyState"
        description="Estado vacío con icono, título, descripción y acción"
        props={[
          { name: "icon", type: "React.ComponentType", description: "Componente de icono" },
          { name: "title", type: "string", description: "Título (requerido)" },
          { name: "description", type: "string" },
          { name: "action", type: "ReactNode" },
        ]}
        code={`import { EmptyState } from "@/lib/components/ui/Groups/empty-state";

<EmptyState
  icon={Inbox}
  title="Sin resultados"
  description="No se encontraron registros con esos filtros."
  action={<Button>Limpiar filtros</Button>}
/>`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <EmptyState
            icon={Inbox}
            title="Sin resultados"
            description="No se encontraron registros con esos filtros."
            action={<Button size="sm">Limpiar filtros</Button>}
          />
          <EmptyState
            icon={SearchX}
            title="Sin datos"
            description="Comienza agregando tu primer elemento."
            action={<Button size="sm" variant="outline">Crear nuevo</Button>}
          />
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Toaster (Sonner)"
        description="Sistema de notificaciones toast"
        code={`import { toast } from "sonner";

toast("Mensaje básico");
toast.success("Éxito");
toast.error("Error");
toast.warning("Advertencia");
toast.info("Información");`}
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast("Mensaje básico")}>Toast básico</Button>
          <Button variant="outline" onClick={() => toast.success("Operación exitosa")}>Toast éxito</Button>
          <Button variant="outline" onClick={() => toast.error("Algo salió mal")}>Toast error</Button>
          <Button variant="ghost" onClick={() => toast.warning("Cuidado")}>Toast warning</Button>
          <Button variant="ghost" onClick={() => toast.info("Dato curioso")}>Toast info</Button>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
