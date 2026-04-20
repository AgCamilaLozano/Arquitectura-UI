"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────
// Types & utils
// ─────────────────────────────────────────────
type Option = { value: string; label: string }

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
type Ctx = {
  value?: string
  onSelect: (v: string, l: string) => void

  open: boolean
  setOpen: (o: boolean) => void

  // registro híbrido
  items: Map<string, string>
  registerItem: (opt: Option) => void

  // búsqueda
  searchable: boolean
  query: string
  setQuery: (q: string) => void

  // teclado
  activeIndex: number
  setActiveIndex: (i: number) => void
  visibleOptions: Option[]
  setVisibleOptions: (opts: Option[]) => void

  // refs
  listRef: React.RefObject<HTMLDivElement | null>
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const SelectContext = React.createContext<Ctx | null>(null)
const useSelect = () => {
  const c = React.useContext(SelectContext)
  if (!c) throw new Error("Select must be used inside <Select>")
  return c
}

// ─────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────
function Select({
  value,
  onValueChange,
  options = [],
  searchable = false,
  children
}: {
  value?: string
  onValueChange: (v: string) => void
  options?: Option[]
  searchable?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const [visibleOptions, setVisibleOptions] = React.useState<Option[]>([])

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const items = React.useMemo(() => {
    const map = new Map<string, string>()
    options.forEach(o => map.set(o.value, o.label))
    return map
  }, [options])

  const registerItem = React.useCallback((opt: Option) => {
    if (!items.has(opt.value)) {
      items.set(opt.value, opt.label)
    }
  }, [items])

  const onSelect = (v: string, l: string) => {
    onValueChange(v)
    setOpen(false)
  }

  React.useEffect(() => {
    if (options.length === 0) return

    const filtered = searchable
      ? options.filter(o =>
        normalize(o.label).includes(normalize(query))
      )
      : options

    setVisibleOptions(filtered)
    setActiveIndex(filtered.length > 0 ? 0 : -1)
  }, [options, query, searchable])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault()
      setOpen(true)
      setActiveIndex(0)
      return
    }

    if (!open) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(i =>
        Math.min(i + 1, visibleOptions.length - 1)
      )
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    }

    if (e.key === "Enter") {
      e.preventDefault()
      const opt = visibleOptions[activeIndex]
      if (opt) onSelect(opt.value, opt.label)
    }

    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <SelectContext.Provider
      value={{
        value,
        onSelect,
        open,
        setOpen,
        items,
        registerItem,
        searchable,
        query,
        setQuery,
        activeIndex,
        setActiveIndex,
        visibleOptions,
        setVisibleOptions,
        listRef,
        triggerRef
      }}
    >
      <div className="relative w-full" onKeyDown={handleKeyDown}>
        {children}
      </div>
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
  const { open, setOpen, triggerRef } = useSelect()

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "border border-border flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
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
  const { value, items } = useSelect()
  const label = value ? items.get(value) : ""
  return <span>{label || placeholder}</span>
}

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────
function SelectContent({
  children
}: {
  children: React.ReactNode
}) {
  const { open, searchable, query, setQuery, listRef } = useSelect()
  if (!open) return null

  return (
    <div
      ref={listRef}
      className="absolute z-50 mt-1 w-full rounded-md border border-border bg-background shadow-md"
    >
      {searchable && (
        <div className="flex items-center gap-2 border-b px-2 py-1">
          <SearchIcon className="size-4 opacity-50" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full bg-transparent text-sm outline-none"
            autoFocus
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
  children,
  index
}: {
  value: string
  children: React.ReactNode
  index?: number
}) {
  const {
    value: selected,
    onSelect,
    registerItem,
    searchable,
    query,
    activeIndex,
    setActiveIndex
  } = useSelect()

  const label = String(children)

  React.useEffect(() => {
    registerItem({ value, label })
  }, [value, label, registerItem])

  const visible = searchable
    ? normalize(label).includes(normalize(query))
    : true

  if (!visible) return null

  const isSelected = selected === value
  const isActive = index === activeIndex

  return (
    <div
      onMouseEnter={() => index !== undefined && setActiveIndex(index)}
      onClick={() => onSelect(value, label)}
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm",
        "hover:bg-accent-hover",
        isActive && "bg-accent-hover",
        isSelected && "text-accent"
      )}
    >
      {children}
      {isSelected && <CheckIcon className="size-4" />}
    </div>
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
}