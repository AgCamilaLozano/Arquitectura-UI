"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
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
  activeIndex: number
  setActiveIndex: (i: number) => void
  items: { value: string; ref: React.RefObject<HTMLDivElement> }[]
  registerItem: (item: any) => number
}

const SelectContext = React.createContext<SelectContextType | null>(null)

function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select components must be inside <Select>")
  return ctx
}

// ─────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────
function Select({
  value,
  onValueChange,
  children
}: {
  value?: string
  onValueChange: (value: string, label: string) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedLabel, setSelectedLabel] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const items = React.useRef<SelectContextType["items"]>([])
  const rootRef = React.useRef<HTMLDivElement>(null)

  const registerItem = (item: any) => {
    items.current.push(item)
    return items.current.length - 1
  }

  // click outside
  React.useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])

  React.useEffect(() => {
    if (open) {
      items.current = []
    }
  }, [open])

  return (
    <SelectContext.Provider
      value={{
        value,
        selectedLabel,
        onChange: (val, label) => {
          setSelectedLabel(label)
          onValueChange(val, label)
        },
        open,
        setOpen,
        activeIndex,
        setActiveIndex,
        items: items.current,
        registerItem
      }}
    >
      <div ref={rootRef} className="relative inline-block">
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
  const { open, setOpen, activeIndex, setActiveIndex, items } = useSelect()

  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      onClick={() => {
        setOpen(!open)
        if (!open) setActiveIndex(0)
      }}
      className={cn(
        "border-border flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-xs",
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
// Content
// ─────────────────────────────────────────────
function SelectContent({
  children
}: {
  children: React.ReactNode
}) {
  const { open } = useSelect()

  if (!open) return null

  return (
    <div
      role="listbox"
      className="bg-background absolute z-50 mt-1 min-w-[250px] rounded-md border shadow-md"
    >
      <div className="max-h-60 overflow-auto p-1">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Item
// ─────────────────────────────────────────────
function SelectItem({
  value,
  children
}: any) {
  const {
    value: selected,
    onChange,
    setOpen,
    registerItem,
    activeIndex,
    setActiveIndex
  } = useSelect()

  const ref = React.useRef<HTMLDivElement>(null)
  const label = String(children)

  const index = React.useMemo(
    () => registerItem({ value, ref }),
    []
  )

  const isActive = index === activeIndex
  const isSelected = selected === value

  // scroll automático
  React.useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ block: "nearest" })
    }
  }, [isActive])


  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(-1)}
      onClick={() => {
        onChange(value, label)
        setOpen(false)
      }}
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm",
        isActive && "bg-accent-hover/20 text-accent",
        isSelected && "bg-accent-hover/60 text-accent"
      )}
    >
      <span className="absolute right-2">
        {isSelected && <CheckIcon className="size-4" />}
      </span>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
}