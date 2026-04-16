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
  items: { value: string; label: string; ref: React.RefObject<HTMLDivElement> }[]
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

  const registerItem = (item: {
    value: string
    label: string
    ref: React.RefObject<HTMLDivElement>
  }) => {
    items.current.push(item)
    return items.current.length - 1
  }

  React.useEffect(() => {
    const item = items.current.find((i) => i.value === value)
    if (item) {
      setSelectedLabel(item.label)
    }
  }, [value])

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
          console.log("SELECT:", val, label)
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
  children,
  className,
  align = "start"
}: {
  children: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
}) {
  const { open } = useSelect()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  const [position, setPosition] = React.useState<"top" | "bottom">("bottom")

  React.useEffect(() => {
    if (!open) return

    const trigger = document.querySelector(
      '[role="combobox"]'
    ) as HTMLButtonElement

    if (!trigger) return

    triggerRef.current = trigger

    const rect = trigger.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    const dropdownHeight = 240 // aprox (max-h-60)

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setPosition("top")
    } else {
      setPosition("bottom")
    }
  }, [open])

  const alignClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align]

  if (!open) return null

  return (
    <div
      ref={contentRef}
      role="listbox"

      className={cn(
        "bg-background absolute z-[9999] min-w-[150px] rounded-md border border-border shadow-md",
        position === "bottom" && "mt-1 top-full",
        position === "top" && "mb-1 bottom-full",
        alignClass,
        className
      )}
    >
      <div className="p-1">
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
  label,
  children
}: {
  value: string
  label: string
  children: React.ReactNode
}) {
  const {
    value: selected,
    onChange,
    setOpen,
    registerItem,
    activeIndex,
    setActiveIndex
  } = useSelect()

  const ref = React.useRef<HTMLDivElement>(null)

  const index = React.useMemo(
    () => registerItem({ value, label, ref }),
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
        "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm z-[99]",
        isActive && "bg-accent-hover/20 text-accent",
        isSelected && "text-accent"
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
