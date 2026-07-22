# `@agustin/ui` — Sistema de Diseño & Librería UI Multitenant

> **Librería oficial de componentes atómicos y compuestos, tokens semánticos y arquitectura visual para el ERP de producción audiovisual AGUSTIN (AGAI / AgStudios).**

![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)
![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618?style=flat-square)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1_AA_Compliant-green?style=flat-square)

---

## 1. Visión General & Principios de Arquitectura

`@agustin/ui` es el núcleo de interfaz encargado de estandarizar la experiencia visual de los 30 módulos operacionales del ERP AGUSTIN (Contratación, Finanzas de Producción, Proyectos, Corporativo, Órdenes de Compra, Facturación y Presupuestos).

### Principios Inmutables de Ingeniería UI/UX

1. **Aislamiento Multi-Tenant Puro**: Los componentes están 100% desacoplados de la identidad de marca del cliente. Ningún componente empaqueta colores estáticos en Hexadecimal (`#HEX`) ni valores RGB rígidos. La tematización opera dinámicamente en *runtime* a nivel de Edge.
2. **Neutralidad de Superficie**: El andamiaje (grids, tablas, celdas y fondos) utiliza variables pálidas de baja saturación (`--background`, `--surface`, `--border-default`) para mitigar la fatiga cognitiva durante jornadas extensas de análisis financiero.
3. **Intencionalidad Cromática**: El uso del color de marca (`var(--accent)`) y colores de estado (`--destructive`, `--warning`, `--success`) se reserva estrictamente para disparadores interactivos, indicadores de estado y retroalimentación.
4. **Física de Enfoque Unificada (*Glow Effect*)**: Todos los elementos interactivos responden al teclado con el anillo de enfoque corporativo unificado.
5. **Rendimiento RSC & A11y**: Estructuras complejas se renderizan como *React Server Components* (RSC) para reducir el bundle de cliente y garantizar el estándar **WCAG 2.1 AA**.

---

## 2. Arquitectura de Design Tokens & Multi-Tenancy

El sistema opera mediante la inyección de canales HSL separados en el `:root` del DOM.

### Configuración Global (`globals.css`)

```css
@import "tailwindcss";

:root {
  /* Canales Inyectados dinámicamente por Tenant (Sistema MONTAJE Base: 265) */
  --tenant-hue: 265;
  --tenant-saturation: 84%;

  /* Geometría e Interacción Inmutables */
  --radius: 0.5rem;
  --font-montserrat: 'Montserrat', sans-serif;
  --font-lato: 'Lato', sans-serif;

  /* Superficie y Estructura (Modo Claro) */
  --background: 0 0% 100%;                  /* Blanco Puro */
  --surface: 240 4% 97%;                    /* Gris pálido de baja saturación */
  --border-default: 240 5% 90%;             /* Línea divisoria sutil */
  --border-strong: var(--tenant-hue) var(--tenant-saturation) 48%; /* Anillo Glow */

  /* Tipografía Semántica */
  --text-primary: 240 4% 18%;               /* Gris Core Sólido (#2D2D2E) */
  --text-secondary: 240 2% 47%;             /* Descripciones y metadatos */

  /* Dinámica de Marca (Tenant Accent) */
  --accent: var(--tenant-hue) var(--tenant-saturation) 58%;
  --accent-foreground: 0 0% 100%;
  --accent-soft: var(--tenant-hue) var(--tenant-saturation) 95%;

  /* Semántica de Estados Operativos */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
  --success: 142 76% 36%;
  --success-foreground: 138 76% 97%;
}

/* Contrato de Inversión Semántica para Modo Oscuro (.dark) */
.dark {
  --background: 240 5% 8%;               /* Gris Oscuro Transaccional (#14161A) */
  --surface: 240 4% 12%;                 /* Fondo de tarjetas y sidebars */
  --border-default: 240 3% 19%;          /* Líneas estructurales oscuras */
  --border-strong: var(--tenant-hue) var(--tenant-saturation) 55%;

  --text-primary: 240 2% 93%;            /* Blanco roto de alta legibilidad */
  --text-secondary: 240 2% 72%;          /* Texto secundario atenuado */

  --accent: var(--tenant-hue) var(--tenant-saturation) 65%;
  --accent-soft: var(--tenant-hue) 20% 15%;
}
```

---

## 3. Escala Tipográfica Operativa

Las tipografías son inyectadas desde el Layout Raíz (`app/layout.tsx`):

| Token / Clase | Fuente | Peso | Tamaño / Interlínea | Aplicación Técnica |
| :--- | :--- | :--- | :--- | :--- |
| `text-display-xl` | Montserrat | Bold (700) | 2.25rem (36px) / 2.5rem | Títulos de Dashboard y Cabeceras de Módulos |
| `text-heading-lg` | Montserrat | SemiBold (600) | 1.5rem (24px) / 2.0rem | Encabezados de Paneles, Modales y Métricas |
| `text-body-base` | Lato | Regular (400) | 1.0rem (16px) / 1.5rem | Entradas de formularios, celdas y párrafos |
| `text-body-dense` | Lato | Medium (500) | 0.875rem (14px) / 1.25rem | Tablas densas ERP, Badges, Botones y Menús |
| `text-caption` | Lato | Regular (400) | 0.75rem (12px) / 1.0rem | Metadatos, Tooltips, Fechas y Ejes de Gráficos |

---

## 4. Componentes UI Core Refactorizados

### 4.1 Navegación: `Breadcrumb`
Soporta polimorfismo mediante Radix UI `Slot` evitando etiquetas `<a>` invalidadas en el App Router.

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/app">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem>
          <BreadcrumbLink href="/app/proyectos">Proyectos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem>
          <BreadcrumbPage>Ordenes de Compra</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

---

### 4.2 Información Contextual: `Tooltip`
Primitiva contextual basada en Radix UI Tooltip con variantes `default` y `rich`, con soporte nativo para inversión de color en modo oscuro (`.dark`).

```tsx
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function TooltipDemo() {
  return (
    <Tooltip content="Aprobar esta orden compromete el presupuesto del proyecto" variant="rich">
      <Button variant="outline">Aprobar Orden</Button>
    </Tooltip>
  );
}
```

---

## 5. Reglas de Contribución para Desarrolladores

1. **Uso Obligatorio del Helper `cn()`**: Toda combinación condicional de clases debe procesarse mediante `cn()` (`clsx` + `tailwind-merge`) localizado en `@/src/utils/utils`.
2. **Prohibición de Estilos Cheados**: No se aceptan Pull Requests que contengan colores en Hexadecimal (`#HEX`), RGB estáticos o tokens cerrados fuera del diccionario oficial de `globals.css`.
3. **Anillo de Enfoque Unificado**: Todo componente interactivo debe incluir la clase corporativa de enfoque:
   ```tsx
   "focus-visible:border-border-strong focus-visible:ring-3 focus-visible:ring-border-strong/20"
   ```

---

*Documentación oficial mantenida por el Equipo TI & UI/UX Lead — AGUSTIN Services V2.0.* 