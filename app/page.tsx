const stack = ["Next.js", "TypeScript", "Tailwind CSS", "pnpm"];

const components = [
  {
    number: 1,
    tag: "UI / Navegación",
    title: "Breadcrumbs.tsx",
    desc: "Navegación jerárquica de páginas. Muestra la ruta actual del usuario dentro de la aplicación.",
    ref: "components/UI/Breadcrumbs.tsx",
  },
  {
    number: 2,
    tag: "UI / Formulario",
    title: "MultiSelect.tsx",
    desc: "Selector múltiple de opciones. Permite al usuario elegir varios items de una lista.",
    ref: "components/UI/MultiSelect.tsx",
  },
  {
    number: 3,
    tag: "UI / Feedback",
    title: "Tooltip.tsx",
    desc: "Información contextual al hacer hover sobre un elemento. Uso no intrusivo para hints y descripciones.",
    ref: "components/UI/Tooltip.tsx",
  },
  {
    number: 4,
    tag: "UI / Acción",
    title: "buttonIcons/",
    desc: "Colección de iconos con comportamiento de botón. Cada icono es un componente independiente.",
    ref: "components/UI/buttonIcons/",
  },
  {
    number: 5,
    tag: "Layout / Estructura",
    title: "SideBar.tsx",
    desc: "Navegación lateral principal de la aplicación. Contiene los links globales de la plataforma.",
    ref: "components/Layout/SideBar.tsx",
  },
  {
    number: 6,
    tag: "Layout / Cliente",
    title: "LayoutClient.tsx",
    desc: "Wrapper client-side del layout. Maneja lógica que requiere acceso al browser.",
    ref: "components/Layout/LayoutClient.tsx",
  },
];

const styles = [
  {
    number: 1,
    tag: "Estilos / Global",
    title: "globals.css",
    desc: "Fuente única de verdad para estilos base. Variables CSS de color, tipografía y espaciado definidas aquí.",
    code: `--accent: #5E17A6;\n--bg-base: #f8f8f8;\n--font-sans: var(--font-geist-sans);`,
    ref: "app/globals.css",
  },
  {
    number: 2,
    tag: "Estilos / Utilidades",
    title: "Tailwind CSS",
    desc: "Clases utilitarias para estilos a nivel de componente. Sin CSS separado por componente — todo en Tailwind o globals.",
    ref: "postcss.config.mjs",
  },
];

const conventions = [
  {
    number: 1,
    tag: "Nombres / Componentes",
    title: "PascalCase",
    desc: "Todos los componentes React usan PascalCase. Una sola responsabilidad por componente. Carpeta propia si tiene subarchivos.",
    code: `✓  MultiSelect.tsx\n✓  SideBar.tsx\n✗  multiSelect.tsx`,
    ref: "components/**/*.tsx",
  },
  {
    number: 2,
    tag: "Nombres / Funciones",
    title: "Prefijos por tipo",
    desc: "Las funciones siguen prefijos según su rol para mantener consistencia en toda la base de código.",
    code: `handle → handleSubmit, handleDelete\nuse    → useFormState, useModuleData\nget    → getFilteredItems\non     → onPageLoad, onFilterChange`,
    ref: "Aplicado en todos los archivos",
  },
  {
    number: 3,
    tag: "Nombres / Archivos",
    title: "Por tipo de archivo",
    desc: "El proyecto organiza por tipo, no por feature. Cada carpeta tiene una responsabilidad clara.",
    code: `app/        → rutas y páginas\ncomponents/ → componentes React\nlib/        → utilidades y helpers\npublic/     → assets estáticos`,
    ref: "Estructura raíz del proyecto",
  },
];

const treeLines = [
  { text: "convenciones-tecnicas/", isFolder: true, comment: "" },
  { text: "├── app/", isFolder: true, comment: "# App Router de Next.js" },
  { text: "│   ├── globals.css", isFolder: false, comment: "# Estilos globales" },
  { text: "│   ├── layout.tsx", isFolder: false, comment: "# Layout raíz" },
  { text: "│   └── page.tsx", isFolder: false, comment: "# Página principal" },
  { text: "├── components/", isFolder: true, comment: "" },
  { text: "│   ├── Layout/", isFolder: true, comment: "# Componentes estructurales" },
  { text: "│   └── UI/", isFolder: true, comment: "# Componentes reutilizables" },
  { text: "├── lib/", isFolder: true, comment: "" },
  { text: "│   └── utils.ts", isFolder: false, comment: "# Utilidades compartidas" },
  { text: "└── public/", isFolder: true, comment: "# Assets estáticos" },
];

type Entry = {
  number: number;
  tag: string;
  title: string;
  desc: string;
  code?: string;
  ref: string;
};

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className="grid border-b border-border py-6 gap-4" style={{ gridTemplateColumns: "2.5rem 1fr" }}>
      <span
        className="text-lg pt-0.5"
        style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          color: "var(--border-default)",
        }}
      >
        {entry.number}
      </span>
      <div>
        <p
          className="text-xs tracking-widest uppercase mb-1"
          style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
        >
          {entry.tag}
        </p>
        <p
          className="text-sm font-medium mb-2"
          style={{ fontFamily: "var(--font-geist-mono)", color: "var(--text-primary)" }}
        >
          {entry.title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {entry.desc}
        </p>
        {entry.code && (
          <pre
            className="mt-3 p-3 text-xs leading-loose rounded-sm border-l-2"
            style={{
              background: "var(--bg-muted)",
              borderColor: "var(--accent)",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {entry.code}
          </pre>
        )}
        <p
          className="mt-3 pt-2 text-xs tracking-wider uppercase border-t border-dashed border-border"
          style={{ color: "var(--border-strong)", fontFamily: "var(--font-geist-mono)" }}
        >
          {entry.ref}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4 pb-4 mb-6 border-b border-border">
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
      >
        {index}
      </span>
      <h2
        className="text-xl font-normal"
        style={{ fontFamily: "Georgia, serif", color: "var(--text-primary)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export default function ArquitecturaPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* HEADER */}
      <header
        className="flex items-center gap-3 px-8 py-4 border-b-2"
        style={{ borderColor: "var(--accent)" }}
      >
        <span
          className="text-xs tracking-widest uppercase font-medium"
          style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
        >
          Antigravity
        </span>
        <div className="w-px h-4" style={{ background: "var(--border-default)" }} />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
        >
          Convenciones Técnicas
        </span>
      </header>

      {/* HERO */}
      <div
        className="text-center py-16 px-6 border-b"
        style={{ borderColor: "var(--border-default)" }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)" }}
        >
          Repositorio oficial
        </p>
        <h1
          className="text-5xl font-bold leading-tight"
          style={{ fontFamily: "Georgia, serif", color: "var(--text-primary)" }}
        >
          Arquitectura &{" "}
          <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Convenciones</span>
        </h1>
        <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
          Estructura, patrones y reglas técnicas del proyecto.
        </p>

        {/* STACK BADGES */}
        <div className="flex justify-center gap-2 flex-wrap mt-8">
          {stack.map((s) => (
            <span
              key={s}
              className="text-xs tracking-widest uppercase px-3 py-1.5 border rounded-sm transition-colors"
              style={{
                fontFamily: "var(--font-geist-mono)",
                borderColor: "var(--border-default)",
                color: "var(--text-muted)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* ESTRUCTURA */}
        <section>
          <SectionHeader index="01" title="Estructura del proyecto" />
          <div
            className="p-5 rounded-sm border text-xs leading-loose"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border-default)",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--text-secondary)",
            }}
          >
            {treeLines.map((line, i) => (
              <div key={i}>
                <span style={{ color: line.isFolder ? "var(--accent)" : "var(--text-secondary)" }}>
                  {line.text}
                </span>
                {line.comment && (
                  <span style={{ color: "var(--text-muted)" }}> &nbsp;{line.comment}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* COMPONENTES UI */}
        <section>
          <SectionHeader index="02" title="Componentes UI" />
          <div>
            {components.map((c) => (
              <EntryCard key={c.number} entry={c} />
            ))}
          </div>
        </section>

        {/* ESTILOS */}
        <section>
          <SectionHeader index="03" title="Estilos" />
          <div>
            {styles.map((s) => (
              <EntryCard key={s.number} entry={s} />
            ))}
          </div>
        </section>

        {/* CONVENCIONES */}
        <section>
          <SectionHeader index="04" title="Convenciones de nombres" />
          <div>
            {conventions.map((c) => (
              <EntryCard key={c.number} entry={c} />
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer
        className="text-center py-6 border-t border-border"
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--border-default)",
        }}
      >
        Antigravity · Convenciones Técnicas
      </footer>
    </div>
  );
}