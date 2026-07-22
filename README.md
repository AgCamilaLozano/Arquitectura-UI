# `@agustin/ui` — Sistema de Diseño & Librería UI Multitenant

> **Librería oficial de componentes atómicos, primitivas interactivas, tokens semánticos y arquitectura visual para el ERP de producción audiovisual AGUSTIN (AGAI / AgStudios).**

![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-161618?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwind-css)
![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-7c3aed?style=flat-square)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1_AA_Compliant-22c55e?style=flat-square)

---

## 1. Visión General & Principios de Arquitectura

`@agustin/ui` es la infraestructura de software visual optimizada para estandarizar las interfaces de los 30 módulos operacionales del ERP AGUSTIN (Contratación, Finanzas de Producción, Proyectos, Órdenes de Compra, Facturación, Presupuestos, etc.).

### Principios Inmutables de Ingeniería UI/UX

1. **Aislamiento Multi-Tenant Puro**: Los componentes están 100% desacoplados de la identidad de marca de los clientes. Ningún componente empaqueta estilos rígidos, colores en Hexadecimal (`#HEX`) ni valores RGB estáticos. La tematización opera dinámicamente en *runtime* a nivel de Edge.
2. **Neutralidad de Superficie**: El andamiaje (grids, tablas, celdas y fondos) utiliza variables pálidas de baja saturación (`--background`, `--surface`, `--border-default`) para mitigar la fatiga cognitiva durante jornadas extensas de análisis financiero y operativo.
3. **Intencionalidad Cromática (Morado MONTAJE Base)**: El uso del color de marca (`var(--accent)`) y colores de estado (`--destructive`, `--warning`, `--success`) se reserva estrictamente para disparadores interactivos, indicadores de estado y retroalimentación del sistema.
4. **Física de Enfoque Unificada (*Glow Effect*)**: Todos los elementos interactivos responden a la navegación por teclado con el anillo de enfoque corporativo unificado (`focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20`).
5. **Rendimiento RSC & A11y**: Estructuras complejas se renderizan como *React Server Components* (RSC) para reducir el bundle enviado al navegador y garantizar el cumplimiento nativo del estándar **WCAG 2.1 AA**.

---

## 2. Guía de Instalación e Integración

Sigue estos pasos para integrar `@agustin/ui` en cualquier proyecto cliente o módulo del ecosistema AGUSTIN:

### Paso 1: Instalación del Paquete

Instala la librería consumiendo **pnpm** (gestor oficial del repositorio):

```bash
pnpm add @agustin/ui
```

> **Nota:** Verifica que tu proyecto cuente con las *peer dependencies* requeridas: `react@^18 || ^19`, `tailwindcss@^4.0.0`, `lucide-react`, `next-themes` y `@radix-ui/react-*`.

### Paso 2: Importación de Tokens en el `globals.css` del ERP

La librería no empaqueta valores `:root` estáticos. En su lugar, expone su mapeo de Tailwind CSS v4 (`tokens.css`). Debes importarlo dentro del archivo `app/globals.css` de tu aplicación consumidora y declarar las variables HSL correspondientes:

```css
/* app/globals.css en la aplicación ERP */
@import "tailwindcss";
@import "@agustin/ui/tokens.css";

:root {
  /* Canales Inyectados dinámicamente según la Empresa (Sistema MONTAJE Base: 265 - Morado) */
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

### Paso 3: Configuración del Provider Raíz

Envuelve el árbol de la aplicación en tu layout principal (`app/layout.tsx`) con el `TooltipProvider` e inyecta las fuentes corporativas (**Montserrat** y **Lato**):

```tsx
import { TooltipProvider } from "@agustin/ui";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="font-sans bg-background text-text-primary antialiased">
        <TooltipProvider delayDuration="{200}">
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
```

---

## 3. Escala Tipográfica Operativa

Las familias tipográficas se consumen en las aplicaciones consumidoras mediante las clases del sistema:

| Token / Clase | Fuente | Peso | Tamaño / Interlínea | Aplicación Técnica |
| :--- | :--- | :--- | :--- | :--- |
| `text-display-xl` | Montserrat | Bold (700) | 2.25rem (36px) / 2.5rem | Títulos de Dashboard y Cabeceras de Módulos |
| `text-heading-lg` | Montserrat | SemiBold (600) | 1.5rem (24px) / 2.0rem | Encabezados de Paneles, Modales y Drawers |
| `text-body-base` | Lato | Regular (400) | 1.0rem (16px) / 1.5rem | Entradas de formularios, celdas y párrafos |
| `text-body-dense` | Lato | Medium (500) | 0.875rem (14px) / 1.25rem | Tablas densas ERP, Badges, Botones y Menús |
| `text-caption` | Lato | Regular (400) | 0.75rem (12px) / 1.0rem | Metadatos, Tooltips, Fechas y Ejes de Gráficos |

---

## 4. Reglas de Contribución para Desarrolladores

1. **Uso Obligatorio del Helper `cn()`**: Toda combinación condicional de clases de Tailwind debe procesarse mediante `cn()` (`clsx` + `tailwind-merge`) localizado en `@agustin/ui/utils`.
2. **Prohibición de Estilos Hardcodeados**: No se aceptan Pull Requests que contengan colores en Hexadecimal (`#HEX`), RGB estáticos o tokens cerrados fuera de la especificación oficial de `@theme inline`.
3. **Anillo de Enfoque Morado Unificado**: Todo nuevo componente interactivo debe incluir la firma corporativa de enfoque:
   ```tsx
   "focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20"
   ```

---

*Documentación oficial mantenida por el Equipo TI & UI/UX Lead — AGUSTIN Services V2.0.*