"use client"

import "./globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Montserrat, Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";

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
    <html lang="es" data-scroll-behavior="smooth" suppressHydrationWarning>
    <body className={`${fontHeading.variable} ${fontBody.variable} bg-background antialiased scrollbar-soft`}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </ThemeProvider>
    </body>
    </html>
  )
}
