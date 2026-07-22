"use client"

import "./globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Montserrat, Lato } from "next/font/google";

const primitives = [
  "Button", "Input", "Textarea", "Select", "SearchableSelect",
  "Avatar", "Checkbox", "Switch", "RadioGroup", "Popover",
  "Collapsible", "DropdownMenu", "Separator", "Skeleton",
  "Sheet", "DataTable", "Tabs", "Tooltip"
]

const components = [
  "LabelBadge", "Label", "PasswordInput", "PasswordStrength",
  "Calendar", "GraficaBar", "GraficaDonut", "GraficaLine",
  "EmptyState", "Card", "Dialog", "AlertDialog",
  "ConfirmDeleteDialog", "Pagination", "Breadcrumb"
]

const fontHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading", // Se mapea con var(--font-heading)
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Configuración de Lato (Textos Transaccionales, Inputs, Tablas)
const fontBody = Lato({
  subsets: ["latin"],
  variable: "--font-sans",    // Se mapea con var(--font-sans)
  display: "swap",
  weight: ["300", "400", "700"],
});

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openSection, setOpenSection] = useState<"primitives" | "components">("primitives")

  return (
    <html lang="es" data-scroll-behavior="smooth" >
    <body className={`${fontHeading.variable} ${fontBody.variable} bg-background antialiased scrollbar-soft`}>
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`
          flex flex-col border-r border-border-default bg-surface
          transition-all duration-300 overflow-hidden
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-default">
          {!collapsed && (
            <h1 className="text-lg font-bold font-heading text-text-primary truncate">
              @agustin/ui
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-accent-soft text-text-secondary transition-colors shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? (
                <path d="M9 18l6-6-6-6" />
              ) : (
                <path d="M15 18l-6-6 6-6" />
              )}
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
          <Link
            href="/"
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors mb-1
              ${pathname === "/" ? "bg-accent-soft text-accent font-medium" : "text-text-secondary hover:bg-accent-soft hover:text-text-primary"}
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            {!collapsed && <span>Inicio</span>}
          </Link>

          <button
            onClick={() => setOpenSection(openSection === "primitives" ? "components" : "primitives")}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full transition-colors
              text-text-secondary hover:bg-accent-soft hover:text-text-primary font-medium
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Primitives</span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className={`transition-transform ${openSection === "primitives" ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </>
            )}
          </button>
          {!collapsed && openSection === "primitives" && (
            <div className="ml-4 mt-1 space-y-0.5">
              {primitives.map((name) => (
                <a
                  key={name}
                  href={`#${name}`}
                  className="block px-3 py-1.5 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-accent-soft transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() => setOpenSection(openSection === "components" ? "primitives" : "components")}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full transition-colors mt-1
              text-text-secondary hover:bg-accent-soft hover:text-text-primary font-medium
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Components</span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className={`transition-transform ${openSection === "components" ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </>
            )}
          </button>
          {!collapsed && openSection === "components" && (
            <div className="ml-4 mt-1 space-y-0.5">
              {components.map((name) => (
                <a
                  key={name}
                  href={`#${name}`}
                  className="block px-3 py-1.5 rounded-md text-xs text-text-muted hover:text-text-primary hover:bg-accent-soft transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
    </body>
    </html>
  )
}
