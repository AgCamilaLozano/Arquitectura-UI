"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@/lib/components/ui/Compuesto/Contenedores/Card";
import { Button } from "@/lib/components/ui/Base/Entradas";

const cardVariants = ["default", "outlined", "elevated", "accent", "ghost"] as const;

export function CardsSection() {
  return (
    <SectionLayout id="cards" title="Cards" description="Contenedor Card con 5 variantes y sub-componentes Header, Body, Footer.">
      <ComponentDemo
        name="Variantes de Card"
        description="5 estilos visuales diferentes"
        props={[
          { name: "variant", type: '"default" | "outlined" | "elevated" | "accent" | "ghost"', default: '"default"' },
          { name: "clickable", type: "boolean", default: "false" },
          { name: "fullWidth", type: "boolean", default: "false" },
        ]}
        code={`import { Card, CardHeader, CardBody, CardFooter } from "@agustin/ui/components";

<Card variant="default">
  <CardHeader title="Título" subtitle="Subtítulo" />
  <CardBody>Contenido aquí</CardBody>
  <CardFooter align="right">
    <Button>Aceptar</Button>
  </CardFooter>
</Card>`}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cardVariants.map((v) => (
            <Card key={v} variant={v}>
              <CardHeader title={`Card ${v}`} subtitle={`Variante: ${v}`} />
              <CardBody>
                <p className="text-sm text-text-secondary">Contenido de ejemplo para la tarjeta con variante {v}.</p>
              </CardBody>
              <CardFooter align="left">
                <Button variant="ghost" size="sm">Cancelar</Button>
                <Button size="sm">Aceptar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ComponentDemo>

      <ComponentDemo
        name="CardHeader"
        description="Encabezado con título, subtítulo, acción y divider"
        props={[
          { name: "title", type: "ReactNode", description: "Título (requerido)" },
          { name: "subtitle", type: "ReactNode", description: "Subtítulo opcional" },
          { name: "action", type: "ReactNode", description: "Elemento de acción a la derecha" },
          { name: "withDivider", type: "boolean", default: "false" },
          { name: "as", type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"', default: '"h4"' },
        ]}
        code={`<CardHeader title="Mi Título" subtitle="Descripción" action={<Button size="sm">+</Button>} withDivider />`}
      >
        <Card>
          <CardHeader
            title="Con acción"
            subtitle="Tiene un botón a la derecha"
            action={<Button size="sm" variant="outline">Editar</Button>}
            withDivider
          />
          <CardBody>
            <p className="text-sm text-text-secondary">El header tiene un divider y un botón de acción.</p>
          </CardBody>
        </Card>
      </ComponentDemo>
    </SectionLayout>
  );
}
