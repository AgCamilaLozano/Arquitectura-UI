"use client"

import { useState } from "react"

export function Section({ id, title, description, children }: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-b border-border-default pb-12 mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading text-text-primary">{title}</h2>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      </div>
      {children}
    </section>
  )
}

export function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border-default rounded-lg p-6 mb-4">
      {children}
    </div>
  )
}

export function PropsTable({ props }: {
  props: { name: string; type: string; default?: string; description: string }[]
}) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-default">
            <th className="text-left py-2 px-3 font-medium text-text-secondary">Prop</th>
            <th className="text-left py-2 px-3 font-medium text-text-secondary">Tipo</th>
            <th className="text-left py-2 px-3 font-medium text-text-secondary">Default</th>
            <th className="text-left py-2 px-3 font-medium text-text-secondary">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-border-default/50">
              <td className="py-2 px-3 font-mono text-xs text-accent">{p.name}</td>
              <td className="py-2 px-3 font-mono text-xs text-text-muted">{p.type}</td>
              <td className="py-2 px-3 font-mono text-xs text-text-muted">{p.default ?? "—"}</td>
              <td className="py-2 px-3 text-text-secondary">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-[#1e1e2e] overflow-hidden mb-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-xs text-white/40 font-mono">Ejemplo de uso</span>
        <button
          onClick={handleCopy}
          className="text-xs text-white/50 hover:text-white/80 transition-colors font-mono"
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-[#cdd6f4] font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-xs font-medium text-text-secondary whitespace-nowrap min-w-[80px]">
        {label}
      </label>
      {children}
    </div>
  )
}

export function SelectControl({ value, onChange, options }: {
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
