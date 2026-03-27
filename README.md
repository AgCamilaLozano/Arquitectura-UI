# Convenciones Técnicas 

Repositorio oficial de arquitectura y convenciones técnicas del proyecto.

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 14 | Framework principal (App Router) |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos utilitarios |
| PostCSS | Procesamiento de estilos |
| pnpm | Gestor de paquetes |

---

## 📁 Estructura del proyecto
```
convenciones-tecnicas/
├── app/                    # App Router de Next.js
│   ├── globals.css         # Estilos globales y variables CSS
│   ├── layout.tsx          # Layout raíz de la aplicación
│   └── page.tsx            # Página principal
├── components/
│   ├── Layout/             # Componentes estructurales
│   │   ├── Tema/           # Configuración del tema
│   │   ├── LayoutClient.tsx
│   │   └── SideBar.tsx
│   └── UI/                 # Componentes reutilizables
│       ├── buttonIcons/
│       ├── Breadcrumbs.tsx
│       ├── MultiSelect.tsx
│       └── Tooltip.tsx
├── lib/
│   └── utils.ts            # Utilidades compartidas
└── public/                 # Archivos estáticos
```

---

## 📐 Organización — Por tipo

El proyecto organiza el código por tipo de archivo, no por feature:

- `app/` → rutas y páginas (Next.js App Router)
- `components/` → componentes React reutilizables
- `lib/` → utilidades y helpers
- `public/` → assets estáticos

---

## 🎨 Estilos

- Los estilos globales viven en `app/globals.css`
- Variables de color, tipografía y espaciado como CSS custom properties
- Clases utilitarias con **Tailwind CSS**
- Sin CSS por componente — todo centralizado en globals o Tailwind

---

## 🧩 Componentes UI

| Componente | Descripción |
|---|---|
| `Breadcrumbs.tsx` | Navegación jerárquica de páginas |
| `MultiSelect.tsx` | Selector múltiple de opciones |
| `Tooltip.tsx` | Información contextual al hacer hover |
| `buttonIcons/` | Iconos con comportamiento de botón |

### Componentes de Layout

| Componente | Descripción |
|---|---|
| `SideBar.tsx` | Navegación lateral principal |
| `LayoutClient.tsx` | Wrapper client-side del layout |
| `Tema/` | Configuración del tema visual |

---

## ✏️ Convenciones de nombres

### Componentes
- **PascalCase** → `MultiSelect.tsx`, `SideBar.tsx`
- Una responsabilidad por componente
- Carpeta propia si el componente tiene subarchivos

### Funciones y hooks
- Handlers: prefijo `handle` → `handleSubmit`
- Hooks: prefijo `use` → `useFormState`
- Utilidades: verbos descriptivos → `formatDate`, `getFilteredItems`

### Archivos
- Componentes: `PascalCase.tsx`
- Utilidades: `camelCase.ts`
- Carpetas: `PascalCase/` para componentes, `camelCase/` para el restoambas
  