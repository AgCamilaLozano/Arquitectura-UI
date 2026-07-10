"use client";

import React, { useState } from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Input, Textarea } from "@/lib/components/ui/Base/Entradas";
import { Mail, AlertCircle, Search, User, Eye } from "lucide-react";

export function InputsSection() {
  const [value, setValue] = useState("Texto de ejemplo");
  const [textareaValue, setTextareaValue] = useState("Una nota rápida...");

  return (
    <SectionLayout id="inputs" title="Entradas" description="Input, Textarea, PasswordInput y PasswordStrength.">
      <ComponentDemo
        name="Input"
        description="Campo de entrada con soporte para iconos, variantes y tipos"
        props={[
          { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Estilo del input" },
          { name: "iconLeft", type: "ReactNode", description: "Icono a la izquierda" },
          { name: "iconRight", type: "ReactNode", description: "Icono a la derecha" },
          { name: "type", type: "string", default: '"text"', description: "Tipo HTML del input" },
        ]}
        code={`<Input placeholder="Ingresa texto" />
<Input type="email" placeholder="Tu correo" iconLeft={<Mail />} />
<Input variant="destructive" defaultValue="Error" iconRight={<AlertCircle />} />
<Input type="search" placeholder="Buscar..." iconLeft={<Search />} />`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ingresa texto"
          />
          <Input type="email" placeholder="Tu correo" iconLeft={<Mail />} />
          <Input
            variant="destructive"
            defaultValue="Agustin!!"
            iconRight={<AlertCircle />}
          />
          <Input type="search" placeholder="Buscar en el dashboard..." iconLeft={<Search />} />
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="Textarea"
        description="Campo de texto multilínea con resize vertical"
        props={[
          { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Estilo del textarea" },
        ]}
        code={`<Textarea placeholder="Descripción breve" rows={4} />
<Textarea variant="destructive" placeholder="Error" rows={3} />`}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <Textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            rows={4}
            placeholder="Descripción breve"
          />
          <Textarea variant={"destructive" as const} rows={4} placeholder="Campo con error" />
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="PasswordInput"
        description="Input con toggle de visibilidad de contraseña"
        code={`import { PasswordInput } from "@/lib/components/ui/Password/password-input";

<PasswordInput placeholder="Tu contraseña" />`}
      >
        <div className="max-w-sm">
          <PasswordInputDemo />
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="PasswordStrength"
        description="Indicador visual de fortaleza de contraseña"
        code={`import { PasswordStrength } from "@/lib/components/ui/Password/password-strength";

<PasswordStrength password={password} />`}
      >
        <PasswordStrengthDemo />
      </ComponentDemo>
    </SectionLayout>
  );
}

function PasswordInputDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="Tu contraseña"
          className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 pr-10 text-sm text-text-primary shadow-xs transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
        >
          <Eye className="size-4" />
        </button>
      </div>
      <p className="text-xs text-text-muted">Haz clic en el ícono para mostrar/ocultar</p>
    </div>
  );
}

function PasswordStrengthDemo() {
  const [pw, setPw] = useState("");
  const rules = [
    { label: "Mínimo 8 caracteres", met: pw.length >= 8 },
    { label: "Una mayúscula", met: /[A-Z]/.test(pw) },
    { label: "Un número", met: /\d/.test(pw) },
  ];
  const score = rules.filter((r) => r.met).length;

  return (
    <div className="space-y-3 max-w-sm">
      <Input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="Escribe una contraseña"
      />
      <div className="space-y-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < score
                  ? score === 1
                    ? "bg-error"
                    : score === 2
                    ? "bg-warning"
                    : "bg-success"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
        <div className="space-y-1">
          {rules.map((r) => (
            <p key={r.label} className={`text-xs ${r.met ? "text-success" : "text-text-muted"}`}>
              {r.met ? "✓" : "○"} {r.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
