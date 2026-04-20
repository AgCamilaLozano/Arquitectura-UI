"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
type SelectContextType = {
  value?: string
  selectedLabel?: string
  onChange: (value: string, label: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  registerItem: (value: string, label: string) => void
  query: string
  setQuery: (q: string) => void
}

const SelectContext = React.createContext<SelectContextType | null>(null)

function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select must be inside <Select>")
  return ctx
}

// util búsqueda
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

// ─────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────
function Select({
  value,
  onValueChange,
  children
}: {
  value?: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const itemsMap = React.useRef<Map<string, string>>(new Map())
  itemsMap.current = new Map()

  const [selectedLabel, setSelectedLabel] = React.useState("")

  const registerItem = (value: string, label: string) => {
    itemsMap.current.set(value, label)
  }

  React.useEffect(() => {
    const label = itemsMap.current.get(value ?? "")
    setSelectedLabel(label ?? "")
  })

  return (
    <SelectContext.Provider
      value={{
        value,
        selectedLabel,
        onChange: (val, label) => {
          setSelectedLabel(label)
          onValueChange(val)
          setOpen(false)
          setQuery("") // reset búsqueda
        },
        open,
        setOpen,
        registerItem,
        query,
        setQuery
      }}
    >
      <div className="relative inline-block w-full">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

// ─────────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────────
function SelectTrigger({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, setOpen } = useSelect()

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "border-border flex w-full items-center justify-between px-3 py-2 text-sm border rounded-md",
        className
      )}
    >
      {children}
      <ChevronDownIcon className="size-4 opacity-50" />
    </button>
  )
}

// ─────────────────────────────────────────────
// Value
// ─────────────────────────────────────────────
function SelectValue({ placeholder }: { placeholder?: string }) {
  const { selectedLabel } = useSelect()
  return <span>{selectedLabel || placeholder}</span>
}

// ─────────────────────────────────────────────
// Content (con buscador)
// ─────────────────────────────────────────────
function SelectContent({ children }: { children: React.ReactNode }) {
  const { open, query, setQuery } = useSelect()

  if (!open) return null

  return (
    <div className="absolute mt-1 w-full bg-background border rounded-md shadow-md z-50">
      {/* 🔍 buscador */}
      <div className="flex items-center gap-2 px-2 py-1 border-b">
        <SearchIcon className="size-4 opacity-50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className="w-full outline-none text-sm bg-transparent"
        />
      </div>

      <div className="p-1 max-h-60 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Item (con filtro)
// ─────────────────────────────────────────────
function SelectItem({
  value,
  children
}: {
  value: string
  children: React.ReactNode
}) {
  const { value: selected, onChange, registerItem, query } = useSelect()

  const label = String(children)

  registerItem(value, label)

  // 🔍 filtro inteligente
  const visible = normalize(label).includes(normalize(query))

  if (!visible) return null

  const isSelected = selected === value

  return (
    <div
      onClick={() => onChange(value, label)}
      className={cn(
        "flex items-center justify-between px-2 py-1.5 cursor-pointer rounded-sm text-sm",
        "hover:bg-accent-hover/20",
        isSelected && "text-accent"
      )}
    >
      {label}
      {isSelected && <CheckIcon className="size-4" />}
    </div>
  )
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
}