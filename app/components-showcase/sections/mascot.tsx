"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { ChatWidget } from "@/lib/components/Idt-Mascota/ChatBox";

export function MascotSection() {
  return (
    <SectionLayout id="mascot" title="Mascota / Chat" description="Widget de chat flotante con selector de modelo.">
      <ComponentDemo
        name="ChatWidget"
        description="Widget de chat flotante que se expande/colapsa. Incluye selector de modelo (GPT-5.2/GPT-5.4), grabación de micrófono, chips de sugerencias y panel lateral."
        code={`import { ChatWidget } from "@/lib/components/Idt-Mascota/ChatBox";

// El widget se renderiza como un botón flotante en la esquina inferior derecha.
// Al hacer clic se expande en un panel de chat.
<ChatWidget />`}
      >
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-text-muted text-center max-w-md">
            El ChatWidget se renderiza como un botón flotante en la esquina inferior derecha de la pantalla.
            Haz clic en el botón de chat para abrir el widget y explorar sus funcionalidades.
          </p>
        </div>
      </ComponentDemo>
      <ChatWidget />
    </SectionLayout>
  );
}
