"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
type Item = {
  value: string
  label: string
}

type SelectContextType = {
  value?: string
  onChange: (value: string, label: string) => void

  open: boolean
  setOpen: (v: boolean) => void

  items: Map<string, string>
  registerItem: (item: Item) => void

  searchable: boolean
  query: string
  setQuery: (q: string) => void
}

const SelectContext = React.createContext<SelectContextType | null>(null)

function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select must be used inside <Select>")
  return ctx
}

// ─────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────
function Select({
  value,
  onValueChange,
  children,
  searchable = false
}: {
  value?: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  searchable?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const items = React.useRef<Map<string, string>>(new Map())

  const registerItem = React.useCallback((item: Item) => {
    if (!items.current.has(item.value)) {
      items.current.set(item.value, item.label)
    }
  }, [])

  const onChange = (val: string, label: string) => {
    onValueChange(val)
    setOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{
        value,
        onChange,
        open,
        setOpen,
        items: items.current,
        registerItem,
        searchable,
        query,
        setQuery
      }}
    >
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  )
}

// ─────────────────────────────────────────────
// Trigger
// ─────────────────────────────────────────────
function SelectTrigger({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  const { open, setOpen } = useSelect()

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "border-border flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
        className
      )}
    >
      {children}
      <ChevronDownIcon className="size-4 opacity-50" />
    </button>
  )
}

// ─────────────────────────────────────────────
// Value (label dinámico)
// ─────────────────────────────────────────────
function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, items } = useSelect()

  const label = value ? items.get(value) : ""

  return <span>{label || placeholder}</span>
}

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────
function SelectContent({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  const { open, searchable, query, setQuery } = useSelect()

  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 w-full rounded-md border bg-background shadow-md",
        className
      )}
    >
      {searchable && (
        <div className="flex items-center gap-2 border-b px-2 py-1">
          <SearchIcon className="size-4 opacity-50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      )}

      <div className="max-h-60 overflow-y-auto p-1">{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Item
// ─────────────────────────────────────────────
function SelectItem({
  value,
  children
}: {
  value: string
  children: React.ReactNode
}) {
  const { value: selected, onChange, registerItem, searchable, query } = useSelect()

  const label = String(children)

  // registrar UNA vez
  React.useEffect(() => {
    registerItem({ value, label })
  }, [value, label, registerItem])

  const visible = searchable
    ? normalize(label).includes(normalize(query))
    : true

  if (!visible) return null

  const isSelected = selected === value

  return (
    <div
      onClick={() => onChange(value, label)}
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm",
        "hover:bg-accent-hover",
        isSelected && "text-accent"
      )}
    >
      {children}
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