"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <span className="text-sm leading-none font-bold">✓</span>,
        info: <span className="text-sm leading-none font-bold">i</span>,
        warning: <span className="text-sm leading-none font-bold">!</span>,
        error: <span className="text-sm leading-none font-bold">×</span>,
        loading: <span className="text-sm leading-none animate-spin">⟳</span>,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
