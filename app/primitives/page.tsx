"use client"

import { useState } from "react"
import { Section, DemoBox, PropsTable, CodeBlock, ControlGroup, SelectControl } from "../_components/playground"
import { primitives as code } from "../_components/code-snippets"

import { Button } from "@/src/primitives/button/button"
import { Input } from "@/src/primitives/input/input"
import { Textarea } from "@/src/primitives/textarea/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/src/primitives/select/select"
import { SearchableSelect } from "@/src/primitives/select/searchable-select"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/primitives/avatar"
import { Checkbox } from "@/src/primitives/checkbox"
import { Switch } from "@/src/primitives/switch"
import { RadioGroup, RadioGroupItem } from "@/src/primitives/radio-group"
import { Popover, PopoverTrigger, PopoverContent } from "@/src/primitives/popover"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/src/primitives/collapsible"
import { DropdownMenu } from "@/src/primitives/dropdown-menu"
import { Separator } from "@/src/primitives/separator"
import { Skeleton } from "@/src/primitives/skeleton"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/src/primitives/Sheet"
import { DataTable } from "@/src/primitives/Table"
import { Tabs } from "@/src/primitives/Tabs"
import { Tooltip } from "@/src/primitives/Tooltip"

import { Search, ChevronDown, MoreHorizontal, User, Settings, AlertTriangle } from "lucide-react"

export default function PrimitivesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-heading text-text-primary">Primitives</h1>
        <p className="text-text-secondary mt-2">
          Componentes base y atómicos del design system. Son los ladrillos fundamentales sobre los que se construyen los componentes compuestos.
        </p>
      </div>

      <ButtonDemo />
      <InputDemo />
      <TextareaDemo />
      <SelectDemo />
      <SearchableSelectDemo />
      <AvatarDemo />
      <CheckboxDemo />
      <SwitchDemo />
      <RadioGroupDemo />
      <PopoverDemo />
      <CollapsibleDemo />
      <DropdownMenuDemo />
      <SeparatorDemo />
      <SkeletonDemo />
      <SheetDemo />
      <DataTableDemo />
      <TabsDemo />
      <TooltipDemo />
    </div>
  )
}

function ButtonDemo() {
  const [variant, setVariant] = useState("default")
  const [size, setSize] = useState("default")
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="Button" title="Button" description="Botón con múltiples variantes y tamaños. Basado en cva para variantes de estilo.">
      <DemoBox>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant={variant as any} size={size as any} disabled={disabled}>
            Click me
          </Button>
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "default", value: "default" },
            { label: "outline", value: "outline" },
            { label: "secondary", value: "secondary" },
            { label: "ghost", value: "ghost" },
            { label: "link", value: "link" },
            { label: "destructive", value: "destructive" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Size">
          <SelectControl value={size} onChange={setSize} options={[
            { label: "default", value: "default" },
            { label: "sm", value: "sm" },
            { label: "lg", value: "lg" },
            { label: "icon", value: "icon" },
            { label: "icon-sm", value: "icon-sm" },
            { label: "icon-lg", value: "icon-lg" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive"', default: '"default"', description: "Variante visual del botón" },
        { name: "size", type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"', default: '"default"', description: "Tamaño del botón" },
        { name: "asChild", type: "boolean", default: "false", description: "Renderiza como child element" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el botón" },
      ]} />
      <CodeBlock code={code.button} />
    </Section>
  )
}

function InputDemo() {
  const [variant, setVariant] = useState("default")
  const [placeholder, setPlaceholder] = useState("Escribir...")
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="Input" title="Input" description="Campo de texto con soporte para iconos izquierda/derecha y variantes.">
      <DemoBox>
        <div className="max-w-md">
          <Input
            variant={variant as any}
            placeholder={placeholder}
            disabled={disabled}
            iconLeft={<Search className="w-4 h-4 text-text-muted" />}
          />
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "default", value: "default" },
            { label: "destructive", value: "destructive" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Placeholder">
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
          />
        </ControlGroup>
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Variante visual del input" },
        { name: "iconLeft", type: "React.ReactNode", default: "—", description: "Icono a la izquierda del input" },
        { name: "iconRight", type: "React.ReactNode", default: "—", description: "Icono a la derecha del input" },
        { name: "containerClassName", type: "string", default: "—", description: "Clases del contenedor" },
      ]} />
      <CodeBlock code={code.input} />
    </Section>
  )
}

function TextareaDemo() {
  const [variant, setVariant] = useState("default")
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="Textarea" title="Textarea" description="Área de texto multilinea con variantes de estilo.">
      <DemoBox>
        <div className="max-w-md">
          <Textarea
            variant={variant as any}
            placeholder="Escribe tu mensaje aquí..."
            disabled={disabled}
            rows={4}
          />
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "default", value: "default" },
            { label: "destructive", value: "destructive" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Variante visual del textarea" },
      ]} />
      <CodeBlock code={code.textarea} />
    </Section>
  )
}

function SelectDemo() {
  const [value, setValue] = useState("")
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="Select" title="Select" description="Selector desplegable basado en Radix UI. Soporta grupos, items y scroll.">
      <DemoBox>
        <div className="max-w-xs">
          <Select value={value} onValueChange={setValue} disabled={disabled}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Manzana</SelectItem>
              <SelectItem value="banana">Plátano</SelectItem>
              <SelectItem value="cherry">Cereza</SelectItem>
              <SelectItem value="grape">Uva</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "SelectTrigger.size", type: '"sm" | "default"', default: '"default"', description: "Tamaño del trigger" },
        { name: "SelectContent.position", type: '"popper" | "item-aligned"', default: '"popper"', description: "Posición del contenido" },
        { name: "SelectContent.align", type: '"start" | "center" | "end"', default: '"center"', description: "Alineación del contenido" },
      ]} />
      <CodeBlock code={code.select} />
    </Section>
  )
}

function SearchableSelectDemo() {
  const [value, setValue] = useState("")
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
  ]

  return (
    <Section id="SearchableSelect" title="SearchableSelect" description="Selector con búsqueda de texto integrada. Permite filtrar opciones escribiendo.">
      <DemoBox>
        <div className="max-w-xs">
          <SearchableSelect
            value={value}
            onValueChange={setValue}
            options={options}
            placeholder="Framework..."
            searchPlaceholder="Buscar..."
          />
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "value", type: "string", default: "—", description: "Valor seleccionado (controlado)" },
        { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback al cambiar valor" },
        { name: "options", type: "readonly { value: string; label: string }[]", default: "—", description: "Opciones disponibles" },
        { name: "placeholder", type: "string", default: '"Seleccionar..."', description: "Placeholder del trigger" },
        { name: "searchPlaceholder", type: "string", default: '"Buscar..."', description: "Placeholder del campo de búsqueda" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el select" },
        { name: "allowCustom", type: "boolean", default: "false", description: "Permite valores personalizados" },
      ]} />
      <CodeBlock code={code.searchableSelect} />
    </Section>
  )
}

function AvatarDemo() {
  const [size, setSize] = useState("default")

  return (
    <Section id="Avatar" title="Avatar" description="Avatar con imagen, fallback y tamaños. Basado en Radix UI.">
      <DemoBox>
        <div className="flex gap-4 items-center">
          <Avatar size={size as any}>
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          <Avatar size={size as any}>
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Size">
          <SelectControl value={size} onChange={setSize} options={[
            { label: "sm", value: "sm" },
            { label: "default", value: "default" },
            { label: "lg", value: "lg" },
          ]} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Tamaño del avatar" },
      ]} />
      <CodeBlock code={code.avatar} />
    </Section>
  )
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="Checkbox" title="Checkbox" description="Casilla de verificación basada en Radix UI.">
      <DemoBox>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
            disabled={disabled}
          />
          <label className="text-sm text-text-primary">Aceptar términos</label>
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "checked", type: "boolean | 'indeterminate'", default: "—", description: "Estado de verificación" },
        { name: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", default: "—", description: "Callback al cambiar estado" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el checkbox" },
      ]} />
      <CodeBlock code={code.checkbox} />
    </Section>
  )
}

function SwitchDemo() {
  const [checked, setChecked] = useState(false)
  const [size, setSize] = useState("default")
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="Switch" title="Switch" description="Toggle switch con dos tamaños. Basado en Radix UI.">
      <DemoBox>
        <div className="flex items-center gap-3">
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            size={size as any}
            disabled={disabled}
          />
          <span className="text-sm text-text-primary">{checked ? "Activo" : "Inactivo"}</span>
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Size">
          <SelectControl value={size} onChange={setSize} options={[
            { label: "sm", value: "sm" },
            { label: "default", value: "default" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "size", type: '"sm" | "default"', default: '"default"', description: "Tamaño del switch" },
        { name: "checked", type: "boolean", default: "—", description: "Estado del switch" },
        { name: "onCheckedChange", type: "(checked: boolean) => void", default: "—", description: "Callback al cambiar estado" },
      ]} />
      <CodeBlock code={code.switch} />
    </Section>
  )
}

function RadioGroupDemo() {
  const [value, setValue] = useState("option-1")
  const [disabled, setDisabled] = useState(false)

  return (
    <Section id="RadioGroup" title="RadioGroup" description="Grupo de botones de radio basado en Radix UI.">
      <DemoBox>
        <RadioGroup value={value} onValueChange={setValue} disabled={disabled} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" />
            <label htmlFor="r1" className="text-sm text-text-primary">Opción 1</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" />
            <label htmlFor="r2" className="text-sm text-text-primary">Opción 2</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="r3" />
            <label htmlFor="r3" className="text-sm text-text-primary">Opción 3</label>
          </div>
        </RadioGroup>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Disabled">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "value", type: "string", default: "—", description: "Valor seleccionado" },
        { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback al cambiar selección" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita todo el grupo" },
      ]} />
      <CodeBlock code={code.radioGroup} />
    </Section>
  )
}

function PopoverDemo() {
  return (
    <Section id="Popover" title="Popover" description="Panel flotante que se ancla a un trigger. Basado en Radix UI.">
      <DemoBox>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Abrir Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-text-primary">Configuración</h4>
                <p className="text-xs text-text-secondary">
                  Ajusta las preferencias de tu cuenta desde aquí.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </DemoBox>
      <PropsTable props={[
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alineación del popover" },
        { name: "sideOffset", type: "number", default: "4", description: "Distancia del trigger" },
      ]} />
      <CodeBlock code={code.popover} />
    </Section>
  )
}

function CollapsibleDemo() {
  const [open, setOpen] = useState(false)

  return (
    <Section id="Collapsible" title="Collapsible" description="Sección colapsable que muestra/oculta contenido. Basado en Radix UI.">
      <DemoBox>
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-text-primary">Detalle del pedido</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2">
            <div className="rounded-md border border-border-default p-3 text-sm text-text-secondary">
              Aquí va el contenido colapsable. Puede contener cualquier elemento.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </DemoBox>
      <PropsTable props={[
        { name: "open", type: "boolean", default: "—", description: "Estado de apertura (controlado)" },
        { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback al cambiar estado" },
      ]} />
      <CodeBlock code={code.collapsible} />
    </Section>
  )
}

function DropdownMenuDemo() {
  return (
    <Section id="DropdownMenu" title="DropdownMenu" description="Menú desplegable con grupos, íconos, separadores y variantes de color.">
      <DemoBox>
        <DropdownMenu 
          trigger={<span className="">Menú</span>}
          groups={[
            {
              items: [
                { label: "Perfil", icon: <User className="h-4 w-4" />, onClick: () => {} },
                { label: "Configuración", icon: <Settings className="h-4 w-4" />, onClick: () => {} },
              ]
            },
            {
              groupLabel: "Acciones",
              items: [
                { label: "Exportar", onClick: () => {} },
                { label: "Eliminar", variant: "danger", separator: true, onClick: () => {} },
              ]
            }
          ]}
        />
      </DemoBox>
      <PropsTable props={[
        { name: "trigger", type: "React.ReactNode", default: "—", description: "Elemento trigger del menú" },
        { name: "groups", type: "DropdownGroup[]", default: "—", description: "Grupos de items del menú" },
        { name: "align", type: '"start" | "end" | "center"', default: '"start"', description: "Alineación del menú" },
        { name: "width", type: "string", default: '"w-52"', description: "Ancho del menú" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el menú" },
      ]} />
      <CodeBlock code={code.dropdownMenu} />
    </Section>
  )
}

function SeparatorDemo() {
  return (
    <Section id="Separator" title="Separator" description="Línea divisoria visual horizontal o vertical.">
      <DemoBox>
        <div>
          <h4 className="text-sm font-medium text-text-primary">Sección superior</h4>
          <Separator className="my-3" />
          <h4 className="text-sm font-medium text-text-secondary">Sección inferior</h4>
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Orientación del separador" },
        { name: "decorative", type: "boolean", default: "true", description: "Si es decorativo (accesibilidad)" },
      ]} />
      <CodeBlock code={code.separator} />
    </Section>
  )
}

function SkeletonDemo() {
  return (
    <Section id="Skeleton" title="Skeleton" description="Placeholder de carga con animación de pulso.">
      <DemoBox>
        <div className="flex flex-col gap-3 max-w-sm">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "className", type: "string", default: "—", description: "Clases de Tailwind para personalizar tamaño/forma" },
      ]} />
      <CodeBlock code={code.skeleton} />
    </Section>
  )
}

function SheetDemo() {
  return (
    <Section id="Sheet" title="Sheet" description="Panel lateral deslizante. Soporta posiciones top, right, bottom, left.">
      <DemoBox>
        <div className="flex gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">{side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Panel lateral</SheetTitle>
                  <SheetDescription>
                    Este es un Sheet abierto desde el lado <strong>{side}</strong>.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p className="text-sm text-text-secondary">
                    Contenido del panel. Puede contener formularios, listas, o cualquier otro componente.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "Posición del panel" },
        { name: "showCloseButton", type: "boolean", default: "true", description: "Muestra botón de cerrar" },
      ]} />
      <CodeBlock code={code.sheet} />
    </Section>
  )
}

function DataTableDemo() {
  const data = [
    { id: 1, name: "Juan Pérez", email: "juan@mail.com", role: "Admin" },
    { id: 2, name: "María López", email: "maria@mail.com", role: "Editor" },
    { id: 3, name: "Carlos García", email: "carlos@mail.com", role: "Viewer" },
    { id: 4, name: "Ana Martínez", email: "ana@mail.com", role: "Admin" },
  ]

  const columns = [
    { key: "name", header: "Nombre", align: "left" as const },
    { key: "email", header: "Email", align: "left" as const },
    { key: "role", header: "Rol", align: "center" as const },
  ]

  const [size, setSize] = useState("md")
  const [headerVariant, setHeaderVariant] = useState("default")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Section id="DataTable" title="DataTable" description="Tabla de datos con soporte de carga, estados vacíos, variantes de header y tamaños.">
      <DemoBox>
        <DataTable
          data={data}
          columns={columns}
          rowKey="id"
          size={size as any}
          headerVariant={headerVariant as any}
          isLoading={isLoading}
        />
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Size">
          <SelectControl value={size} onChange={setSize} options={[
            { label: "sm", value: "sm" },
            { label: "md", value: "md" },
            { label: "lg", value: "lg" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Header">
          <SelectControl value={headerVariant} onChange={setHeaderVariant} options={[
            { label: "default", value: "default" },
            { label: "accent", value: "accent" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Loading">
          <input type="checkbox" checked={isLoading} onChange={(e) => setIsLoading(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "data", type: "T[]", default: "[]", description: "Array de datos a mostrar" },
        { name: "columns", type: "Column<T>[]", default: "[]", description: "Definición de columnas" },
        { name: "rowKey", type: "keyof T", default: "—", description: "Clave única de cada fila" },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamaño de la tabla" },
        { name: "headerVariant", type: '"default" | "accent"', default: '"default"', description: "Variante del header" },
        { name: "isLoading", type: "boolean", default: "false", description: "Muestra estado de carga" },
        { name: "maxHeight", type: "string", default: '"70vh"', description: "Altura máxima con scroll" },
        { name: "emptyState", type: "React.ReactNode", default: "Texto por defecto", description: "Contenido cuando no hay datos" },
      ]} />
      <CodeBlock code={code.dataTable} />
    </Section>
  )
}

function TabsDemo() {
  const [variant, setVariant] = useState("underline")
  const [align, setAlign] = useState("start")

  const tabs = [
    { id: "tab1", label: "General", content: <p className="text-sm text-text-secondary p-4">Contenido de la pestaña General.</p> },
    { id: "tab2", label: "Seguridad", content: <p className="text-sm text-text-secondary p-4">Configuración de seguridad y contraseñas.</p> },
    { id: "tab3", label: "Notificaciones", content: <p className="text-sm text-text-secondary p-4">Preferencias de notificaciones por email.</p> },
  ]

  return (
    <Section id="Tabs" title="Tabs" description="Navegación por pestañas con múltiples variantes y alineaciones.">
      <DemoBox>
        <Tabs tabs={tabs} variant={variant as any} align={align as any} />
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "underline", value: "underline" },
            { label: "pill", value: "pill" },
            { label: "card", value: "card" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Align">
          <SelectControl value={align} onChange={setAlign} options={[
            { label: "start", value: "start" },
            { label: "center", value: "center" },
            { label: "end", value: "end" },
            { label: "stretch", value: "stretch" },
          ]} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "tabs", type: "TabItem[]", default: "—", description: "Array de pestañas con id, label y content" },
        { name: "variant", type: '"underline" | "pill" | "card"', default: '"underline"', description: "Variante visual" },
        { name: "align", type: '"start" | "center" | "end" | "stretch"', default: '"start"', description: "Alineación de las pestañas" },
        { name: "defaultTab", type: "string", default: "Primera pestaña", description: "ID de la pestaña activa por defecto" },
        { name: "onChange", type: "(id: string) => void", default: "—", description: "Callback al cambiar pestaña" },
      ]} />
      <CodeBlock code={code.tabs} />
    </Section>
  )
}

function TooltipDemo() {
  const [side, setSide] = useState("top")
  const [variant, setVariant] = useState("default")

  return (
    <Section id="Tooltip" title="Tooltip" description="Tooltip flotante con múltiples posiciones y variantes. Basado en Radix UI.">
      <DemoBox>
        <div className="flex gap-4">
          <Tooltip content="Tooltip simple" side={side as any} variant={variant as any} size={'default'}>
            <Button variant="outline">Hover me</Button>
          </Tooltip>
          <Tooltip content="Hola" side={side as any} variant={variant as any} size={'small'}>
            <Button variant="outline">Small tooltip</Button>
          </Tooltip>
          <Tooltip content="Con descripción adicional" side={side as any} variant={variant as any} size={'rich'}>
            <Button variant="outline">Rich tooltip</Button>
          </Tooltip>
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Side">
          <SelectControl value={side} onChange={setSide} options={[
            { label: "top", value: "top" },
            { label: "bottom", value: "bottom" },
            { label: "left", value: "left" },
            { label: "right", value: "right" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "default", value: "default" },
            { label: "rich", value: "rich" },
          ]} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "content", type: "React.ReactNode", default: "—", description: "Contenido del tooltip" },
        { name: "children", type: "React.ReactNode", default: "—", description: "Elemento trigger" },
        { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Posición del tooltip" },
        { name: "variant", type: '"default" | "rich"', default: '"default"', description: "Variante visual" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el tooltip" },
      ]} />
      <CodeBlock code={code.tooltip} />
    </Section>
  )
}
