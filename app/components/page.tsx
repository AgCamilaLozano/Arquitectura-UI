"use client"

import { useState } from "react"
import { Section, DemoBox, PropsTable, CodeBlock, ControlGroup, SelectControl } from "../_components/playground"
import { components as code } from "../_components/code-snippets"

import { LabelBadge, Label } from "@/src/components/Badges"
import { PasswordInput, PasswordStrength } from "@/src/components/Password"
import { Calendar } from "@/src/components/Calendario"
import GraficaBar from "@/src/components/charts/GraficaBar"
import GraficaDonut from "@/src/components/charts/GraficaDonut"
import GraficaLine from "@/src/components/charts/GraficaLine"
import { EmptyState } from "@/src/components/feedback/empty-state"
import { Card, CardHeader, CardBody, CardFooter } from "@/src/components/layout/Card"
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@/src/components/layout/Dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/src/components/layout/alert-dialog"
import { ConfirmDeleteDialog } from "@/src/components/layout/confirm-delete-dialog"
import { Pagination } from "@/src/components/navigation/pagination"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/src/components/navigation/breadcrumb"

import { Button, Input} from "@/src/primitives"
import { Inbox, AlertTriangle } from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-heading text-text-primary">Components</h1>
        <p className="text-text-secondary mt-2">
          Componentes compuestos y de dominio específico. Construidos sobre las Primitives para funcionalidades concretas.
        </p>
      </div>

      <LabelBadgeDemo />
      <LabelDemo />
      <PasswordInputDemo />
      <PasswordStrengthDemo />
      <CalendarDemo />
      <GraficaBarDemo />
      <GraficaDonutDemo />
      <GraficaLineDemo />
      <EmptyStateDemo />
      <CardDemo />
      <DialogDemo />
      <AlertDialogDemo />
      <ConfirmDeleteDialogDemo />
      <PaginationDemo />
      <BreadcrumbDemo />
    </div>
  )
}

function LabelBadgeDemo() {
  const [variant, setVariant] = useState("soft")
  const [color, setColor] = useState("neutral")
  const [size, setSize] = useState("sm")

  return (
    <Section id="LabelBadge" title="LabelBadge" description="Badge de etiqueta con múltiples colores, variantes y tamaños. Soporta ícono y botón de remover.">
      <DemoBox>
        <div className="flex flex-wrap gap-3 items-center">
          <LabelBadge label="Activo" variant={variant as any} color={color as any} size={size as any} />
          <LabelBadge label="Con ícono" variant={variant as any} color={color as any} size={size as any} icon={<AlertTriangle className="w-3 h-3" />} />
          <LabelBadge label="Removible" variant={variant as any} color={color as any} size={size as any} onRemove={() => alert("Removido")} />
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "filled", value: "filled" },
            { label: "soft", value: "soft" },
            { label: "outline", value: "outline" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Color">
          <SelectControl value={color} onChange={setColor} options={[
            { label: "neutral", value: "neutral" },
            { label: "accent", value: "accent" },
            { label: "success", value: "success" },
            { label: "error", value: "error" },
            { label: "warning", value: "warning" },
            { label: "info", value: "info" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Size">
          <SelectControl value={size} onChange={setSize} options={[
            { label: "sm", value: "sm" },
            { label: "md", value: "md" },
            { label: "lg", value: "lg" },
          ]} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "label", type: "string", default: "—", description: "Texto del badge" },
        { name: "variant", type: '"filled" | "soft" | "outline"', default: '"soft"', description: "Variante visual" },
        { name: "color", type: '"neutral" | "accent" | "success" | "error" | "warning" | "info"', default: '"neutral"', description: "Color del badge" },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"sm"', description: "Tamaño del badge" },
        { name: "icon", type: "React.ReactNode", default: "—", description: "Ícono a la izquierda" },
        { name: "onRemove", type: "() => void", default: "—", description: "Callback para botón de remover" },
      ]} />
      <CodeBlock code={code.labelBadge} />
    </Section>
  )
}

function LabelDemo() {
  return (
    <Section id="Label" title="Label" description="Etiqueta de formulario basada en Radix UI. Se asocia a inputs para accesibilidad.">
      <DemoBox>
        <div className="flex flex-col gap-3 max-w-sm">
          <div>
            <Label htmlFor="demo-email">Correo electrónico</Label>
            <input
              id="demo-email"
              type="email"
              placeholder="usuario@ejemplo.com"
              className="mt-1 w-full px-3 py-2 text-sm border border-border-default rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <Label htmlFor="demo-name">Nombre completo</Label>
            <input
              id="demo-name"
              type="text"
              placeholder="Juan Pérez"
              className="mt-1 w-full px-3 py-2 text-sm border border-border-default rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "htmlFor", type: "string", default: "—", description: "ID del elemento asociado (accesibilidad)" },
        { name: "children", type: "React.ReactNode", default: "—", description: "Contenido de la etiqueta" },
      ]} />
      <CodeBlock code={code.label} />
    </Section>
  )
}

function PasswordInputDemo() {
  return (
    <Section id="PasswordInput" title="PasswordInput" description="Campo de contraseña con botón de mostrar/ocultar. Gestiona internamente el estado de visibilidad.">
      <DemoBox>
        <div className="max-w-sm">
          <PasswordInput placeholder="Ingresa tu contraseña" />
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "placeholder", type: "string", default: "—", description: "Placeholder del input" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el input" },
        { name: "className", type: "string", default: "—", description: "Clases adicionales" },
      ]} />
      <CodeBlock code={code.passwordInput} />
    </Section>
  )
}

function PasswordStrengthDemo() {
  const [password, setPassword] = useState("")

  return (
    <Section id="PasswordStrength" title="PasswordStrength" description="Indicador de fortaleza de contraseña. Valida longitud mínima, mayúsculas y números.">
      <DemoBox>
        <div className="max-w-sm space-y-3">
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Escribe una contraseña..."
            className="text-sm"
          />
          <PasswordStrength password={password} />
        </div>
      </DemoBox>
      <PropsTable props={[
        { name: "password", type: "string", default: "—", description: "Contraseña a evaluar" },
      ]} />
      <CodeBlock code={code.passwordStrength} />
    </Section>
  )
}

function CalendarDemo() {
  const [variant, setVariant] = useState("full")
  const [selectionMode, setSelectionMode] = useState("date")

  return (
    <Section id="Calendar" title="Calendar" description="Calendario con selección de fechas, meses y años. Soporta variantes full e input (popover).">
      <DemoBox>
        <div className="max-w-md">
          <Calendar
            variant={variant as any}
            selectionMode={selectionMode as any}
            label="Seleccionar fecha"
          />
        </div>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "full", value: "full" },
            { label: "input", value: "input" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Selection">
          <SelectControl value={selectionMode} onChange={setSelectionMode} options={[
            { label: "date", value: "date" },
            { label: "month", value: "month" },
            { label: "year", value: "year" },
          ]} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "variant", type: '"full" | "input"', default: '"full"', description: "Calendario embebido o en popover" },
        { name: "selectionMode", type: '"date" | "month" | "year"', default: '"date"', description: "Modo de selección" },
        { name: "value", type: "Date | null", default: "null", description: "Fecha seleccionada" },
        { name: "onChange", type: "(date: Date | null) => void", default: "—", description: "Callback al cambiar fecha" },
        { name: "minDate", type: "Date", default: "—", description: "Fecha mínima permitida" },
        { name: "maxDate", type: "Date", default: "—", description: "Fecha máxima permitida" },
        { name: "label", type: "string", default: "—", description: "Etiqueta del campo" },
        { name: "disabled", type: "boolean", default: "false", description: "Deshabilita el calendario" },
      ]} />
      <CodeBlock code={code.calendar} />
    </Section>
  )
}

function GraficaBarDemo() {
  const data = [
    { label: "Ene", value: 40 },
    { label: "Feb", value: 65 },
    { label: "Mar", value: 55 },
    { label: "Abr", value: 80 },
    { label: "May", value: 70 },
    { label: "Jun", value: 90 },
  ]

  const [height, setHeight] = useState(240)
  const [barRadius, setBarRadius] = useState(4)

  return (
    <Section id="GraficaBar" title="GraficaBar" description="Gráfica de barras verticales con soporte de leyenda, eje Y y radio de bordes.">
      <DemoBox>
        <GraficaBar
          data={data}
          title="Ventas mensuales"
          description="Unidades vendidas por mes"
          height={height}
          barRadius={barRadius}
          legendLabel="Ventas"
          yLabel="Unidades"
        />
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Height">
          <select
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
          >
            <option value={160}>160</option>
            <option value={240}>240</option>
            <option value={320}>320</option>
          </select>
        </ControlGroup>
        <ControlGroup label="Bar Radius">
          <select
            value={barRadius}
            onChange={(e) => setBarRadius(Number(e.target.value))}
            className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
          >
            <option value={0}>0</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "data", type: "{ label: string; value: number }[]", default: "—", description: "Datos de la gráfica" },
        { name: "title", type: "string", default: "—", description: "Título de la gráfica" },
        { name: "description", type: "string", default: "—", description: "Subtítulo de la gráfica" },
        { name: "height", type: "number", default: "240", description: "Altura en pixeles" },
        { name: "barRadius", type: "number", default: "4", description: "Radio de bordes de las barras" },
        { name: "legendLabel", type: "string", default: "—", description: "Etiqueta de la leyenda" },
        { name: "yLabel", type: "string", default: "—", description: "Etiqueta del eje Y" },
      ]} />
      <CodeBlock code={code.graficaBar} />
    </Section>
  )
}

function GraficaDonutDemo() {
  const data = [
    { value: 45, label: "Ventas directas" },
    { value: 25, label: "Online" },
    { value: 20, label: "Mayoristas" },
    { value: 10, label: "Otros" },
  ]

  const [size, setSize] = useState(300)
  const [showTotal, setShowTotal] = useState(true)

  return (
    <Section id="GraficaDonut" title="GraficaDonut" description="Gráfica de dona/multi-dona con total central y formato personalizable.">
      <DemoBox>
        <GraficaDonut
          data={data}
          title="Canales de venta"
          description="Distribución por canal"
          size={size}
          showTotal={showTotal}
        />
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Size">
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
          >
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
          </select>
        </ControlGroup>
        <ControlGroup label="Show Total">
          <input type="checkbox" checked={showTotal} onChange={(e) => setShowTotal(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "data", type: "{ value: number; label: string; color?: string }[]", default: "—", description: "Segmentos de la gráfica" },
        { name: "title", type: "string", default: "—", description: "Título de la gráfica" },
        { name: "description", type: "string", default: "—", description: "Subtítulo" },
        { name: "size", type: "number", default: "300", description: "Tamaño en pixeles" },
        { name: "strokeWidth", type: "number", default: "40", description: "Grosor del anillo" },
        { name: "showTotal", type: "boolean", default: "true", description: "Muestra total central" },
        { name: "formatValue", type: "(value: number) => string", default: "(v) => v + '%'", description: "Formato del valor" },
      ]} />
      <CodeBlock code={code.graficaDonut} />
    </Section>
  )
}

function GraficaLineDemo() {
  const data = [
    { label: "Lun", value: 30 },
    { label: "Mar", value: 45 },
    { label: "Mié", value: 35 },
    { label: "Jue", value: 60 },
    { label: "Vie", value: 50 },
    { label: "Sáb", value: 75 },
    { label: "Dom", value: 40 },
  ]

  const [showArea, setShowArea] = useState(true)
  const [height, setHeight] = useState(240)

  return (
    <Section id="GraficaLine" title="GraficaLine" description="Gráfica de línea con área sombreada y color personalizable.">
      <DemoBox>
        <GraficaLine
          data={data}
          title="Actividad semanal"
          description="Usuarios activos por día"
          height={height}
          showArea={showArea}
          legendLabel="Usuarios"
          yLabel="Activos"
        />
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Show Area">
          <input type="checkbox" checked={showArea} onChange={(e) => setShowArea(e.target.checked)} />
        </ControlGroup>
        <ControlGroup label="Height">
          <select
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
          >
            <option value={160}>160</option>
            <option value={240}>240</option>
            <option value={320}>320</option>
          </select>
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "data", type: "{ label: string; value: number }[]", default: "—", description: "Puntos de datos" },
        { name: "title", type: "string", default: "—", description: "Título de la gráfica" },
        { name: "description", type: "string", default: "—", description: "Subtítulo" },
        { name: "height", type: "number", default: "240", description: "Altura en pixeles" },
        { name: "lineColor", type: "string", default: "var(--accent)", description: "Color de la línea" },
        { name: "showArea", type: "boolean", default: "true", description: "Muestra área sombreada" },
        { name: "legendLabel", type: "string", default: "—", description: "Etiqueta de leyenda" },
      ]} />
      <CodeBlock code={code.graficaLine} />
    </Section>
  )
}

function EmptyStateDemo() {
  return (
    <Section id="EmptyState" title="EmptyState" description="Estado vacío con ícono, título, descripción y acción opcional.">
      <DemoBox>
        <EmptyState
          icon={Inbox}
          title="No hay resultados"
          description="No se encontraron registros que coincidan con tu búsqueda. Intenta con otros filtros."
          action={<Button size="sm">Limpiar filtros</Button>}
        />
      </DemoBox>
      <PropsTable props={[
        { name: "icon", type: "React.ComponentType<{ className?: string }>", default: "—", description: "Ícono a mostrar" },
        { name: "title", type: "string", default: "—", description: "Título del estado vacío" },
        { name: "description", type: "string", default: "—", description: "Descripción o instrucción" },
        { name: "action", type: "React.ReactNode", default: "—", description: "Acción (botón, link, etc.)" },
      ]} />
      <CodeBlock code={code.emptyState} />
    </Section>
  )
}

function CardDemo() {
  const [variant, setVariant] = useState("default")
  const [clickable, setClickable] = useState(false)

  return (
    <Section id="Card" title="Card" description="Contenedor de contenido con variantes de estilo: default, outlined, elevated, accent, ghost.">
      <DemoBox>
        <Card variant={variant as any} clickable={clickable}>
          <CardHeader title="Título de la Card" subtitle="Descripción breve" action={<Button variant="ghost" size="sm">Acción</Button>} />
          <CardBody>
            <p className="text-sm text-text-secondary">
              Este es el contenido principal de la card. Puede contener cualquier componente.
            </p>
          </CardBody>
          <CardFooter align="right">
            <Button variant="ghost" size="sm">Cancelar</Button>
            <Button size="sm">Guardar</Button>
          </CardFooter>
        </Card>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "default", value: "default" },
            { label: "outlined", value: "outlined" },
            { label: "elevated", value: "elevated" },
            { label: "accent", value: "accent" },
            { label: "ghost", value: "ghost" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Clickable">
          <input type="checkbox" checked={clickable} onChange={(e) => setClickable(e.target.checked)} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "variant", type: '"default" | "outlined" | "elevated" | "accent" | "ghost"', default: '"default"', description: "Variante visual de la card" },
        { name: "clickable", type: "boolean", default: "false", description: "Hace la card clickeable con hover" },
        { name: "fullWidth", type: "boolean", default: "false", description: "Ocupa todo el ancho" },
      ]} />
      <CodeBlock code={code.card} />
    </Section>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState("default")
  const [size, setSize] = useState("md")

  return (
    <Section id="Dialog" title="Dialog" description="Modal de diálogo con header, body y footer. Soporta variantes: default, destructive, warning, info.">
      <DemoBox>
        <Button onClick={() => setOpen(true)}>Abrir Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} variant={variant as any} size={size as any}>
          <DialogHeader title="Título del diálogo" description="Esta es una descripción del diálogo." />
          <DialogBody>
            <p className="text-sm text-text-secondary">
              El contenido del diálogo va aquí. Puede incluir formularios, mensajes, o cualquier otro componente.
            </p>
          </DialogBody>
          <DialogFooter align="right">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Aceptar</Button>
          </DialogFooter>
        </Dialog>
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Variant">
          <SelectControl value={variant} onChange={setVariant} options={[
            { label: "default", value: "default" },
            { label: "destructive", value: "destructive" },
            { label: "warning", value: "warning" },
            { label: "info", value: "info" },
          ]} />
        </ControlGroup>
        <ControlGroup label="Size">
          <SelectControl value={size} onChange={setSize} options={[
            { label: "sm", value: "sm" },
            { label: "md", value: "md" },
            { label: "lg", value: "lg" },
            { label: "xl", value: "xl" },
          ]} />
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "open", type: "boolean", default: "—", description: "Estado de apertura (requerido)" },
        { name: "onClose", type: "() => void", default: "—", description: "Callback al cerrar (requerido)" },
        { name: "variant", type: '"default" | "destructive" | "warning" | "info"', default: '"default"', description: "Variante visual" },
        { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Tamaño del modal" },
        { name: "closeOnOverlay", type: "boolean", default: "true", description: "Cierra al hacer clic fuera" },
        { name: "hideCloseButton", type: "boolean", default: "false", description: "Oculta el botón X" },
      ]} />
      <CodeBlock code={code.dialog} />
    </Section>
  )
}

function AlertDialogDemo() {
  return (
    <Section id="AlertDialog" title="AlertDialog" description="Diálogo de confirmación basado en Radix UI. Bloquea la interacción hasta que se responda.">
      <DemoBox>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Eliminar elemento</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. El elemento será eliminado permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DemoBox>
      <PropsTable props={[
        { name: "open", type: "boolean", default: "—", description: "Estado de apertura (controlado, opcional)" },
        { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback al cambiar estado" },
      ]} />
      <CodeBlock code={code.alertDialog} />
    </Section>
  )
}

function ConfirmDeleteDialogDemo() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itemName, setItemName] = useState("Usuario #1234")

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
      alert("Eliminado correctamente")
    }, 1500)
  }

  return (
    <Section id="ConfirmDeleteDialog" title="ConfirmDeleteDialog" description="Diálogo de confirmación de eliminación con loading state y mensaje auto-generado.">
      <DemoBox>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <label className="text-xs text-text-secondary">Item:</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
            />
          </div>
          <div>
            <Button variant="destructive" onClick={() => setOpen(true)}>Eliminar item</Button>
          </div>
        </div>
        <ConfirmDeleteDialog
          open={open}
          onOpenChange={setOpen}
          itemName={itemName}
          onConfirm={handleConfirm}
          loading={loading}
        />
      </DemoBox>
      <PropsTable props={[
        { name: "open", type: "boolean", default: "—", description: "Estado de apertura (requerido)" },
        { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Callback al cambiar estado (requerido)" },
        { name: "title", type: "string", default: '"Confirmar eliminación"', description: "Título del diálogo" },
        { name: "description", type: "string", default: "Auto-generado con itemName", description: "Descripción personalizada" },
        { name: "itemName", type: "string", default: "—", description: "Nombre del item (genera descripción automática)" },
        { name: "onConfirm", type: "() => void", default: "—", description: "Callback al confirmar (requerido)" },
        { name: "loading", type: "boolean", default: "false", description: "Muestra estado de carga en botón" },
      ]} />
      <CodeBlock code={code.confirmDeleteDialog} />
    </Section>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  return (
    <Section id="Pagination" title="Pagination" description="Navegación paginada con elipsis automático cuando hay muchas páginas (>7).">
      <DemoBox>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </DemoBox>
      <div className="flex flex-wrap gap-4 mb-4">
        <ControlGroup label="Página">
          <span className="text-xs text-text-primary font-mono">{page} / {totalPages}</span>
        </ControlGroup>
        <ControlGroup label="Total">
          <select
            value={totalPages}
            onChange={(e) => { setTotalPages(Number(e.target.value)); setPage(1) }}
            className="px-2 py-1 text-xs border border-border-default rounded-md bg-surface text-text-primary"
          >
            {[3, 5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </ControlGroup>
      </div>
      <PropsTable props={[
        { name: "page", type: "number", default: "—", description: "Página actual (requerido)" },
        { name: "totalPages", type: "number", default: "—", description: "Total de páginas (requerido)" },
        { name: "onPageChange", type: "(page: number) => void", default: "—", description: "Callback al cambiar página (requerido)" },
      ]} />
      <CodeBlock code={code.pagination} />
    </Section>
  )
}

function BreadcrumbDemo() {
  return (
    <Section id="Breadcrumb" title="Breadcrumb" description="Navegación de migas de pan con separadores y página activa.">
      <DemoBox>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Módulos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Usuario actual</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </DemoBox>
      <PropsTable props={[
        { name: "BreadcrumbLink.href", type: "string", default: "—", description: "URL del enlace" },
        { name: "BreadcrumbLink.asChild", type: "boolean", default: "false", description: "Renderiza como child element" },
        { name: "BreadcrumbPage", type: "span", default: "—", description: "Página actual (no clickeable)" },
        { name: "BreadcrumbSeparator", type: "li", default: '"›"', description: "Separador (customizable via children)" },
      ]} />
      <CodeBlock code={code.breadcrumb} />
    </Section>
  )
}
