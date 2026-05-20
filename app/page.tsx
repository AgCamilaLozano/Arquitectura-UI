'use client'

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Textarea } from "@/lib/components/ui/Base/Entradas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/Base/Selects/select";
import { MultiSelect } from "@/lib/components/ui/Base/Selects/MultiSelect";
import { DropdownMenu } from "@/lib/components/ui/Compuesto/dropdown-menu";
import { Tooltip } from "@/lib/components/ui/Compuesto/Tooltip";
import { Breadcrumbs } from "@/lib/components/ui/Navegacion/Breadcrumbs";
import { DataTable } from "@/lib/components/ui/DataDisplay/Table";
import { Tabs } from "@/lib/components/ui/DataDisplay/Tabs";
import GraficaBar from "@/lib/components/ui/DataDisplay/Graficas/GraficaBar";
import GraficaDonut from "@/lib/components/ui/DataDisplay/Graficas/GraficaDonut";
import GraficaLine from "@/lib/components/ui/DataDisplay/Graficas/GraficaLine";
import { LabelBadge, StatusBadge } from "@/lib/components/ui/Compuesto/Badges";
import Dialog, {
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/lib/components/ui/Compuesto/Modals/Dialog";
import AlertDialog from "@/lib/components/ui/Compuesto/Modals/AlertDialog";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/lib/components/ui/Compuesto/Modals/Card";
import { ChatWidget } from "@/lib/components/Idt-Mascota/ChatBox";
import { Calendar } from "@/lib/components/ui/Compuesto/Calendario";
import { Info } from "lucide-react";

const sampleTableData: Array<{ id: string; name: string; role: string; status: string }> = [
  { id: "1", name: "Alicia", role: "Diseñadora", status: "Activo" },
  { id: "2", name: "Bruno", role: "Desarrollador", status: "Revisión" },
  { id: "3", name: "Carolina", role: "PM", status: "Completado" },
];

const tableColumns: Array<{
  key: string;
  header: string;
  accessor: keyof (typeof sampleTableData)[number];
}> = [
  { key: "name", header: "Nombre", accessor: "name" },
  { key: "role", header: "Rol", accessor: "role" },
  { key: "status", header: "Estado", accessor: "status" },
];

const barData = [
  { label: "Ene", value: 420 },
  { label: "Feb", value: 310 },
  { label: "Mar", value: 520 },
  { label: "Abr", value: 410 },
  { label: "May", value: 590 },
];

const donutData = [
  { label: "Ventas", value: 35 },
  { label: "Marketing", value: 25 },
  { label: "Soporte", value: 20 },
  { label: "Infra", value: 20 },
];

const lineData = [
  { label: "Lun", value: 30 },
  { label: "Mar", value: 70 },
  { label: "Mié", value: 45 },
  { label: "Jue", value: 90 },
  { label: "Vie", value: 60 },
];

const tabItems = [
  {
    id: "principales",
    label: "Principales",
    content: (
      <div className="space-y-3 text-sm text-text-secondary">
        <p>Esta pestaña muestra el contenido principal de la página de demo.</p>
        <p>Usa los botones, inputs y toggles para validar la interfaz.</p>
      </div>
    ),
  },
  {
    id: "informacion",
    label: "Información",
    content: (
      <div className="space-y-3 text-sm text-text-secondary">
        <p>Prueba aquí la interacción con selectores y modales.</p>
        <p>Los estados activos se ven con badges y cards.</p>
      </div>
    ),
  },
  {
    id: "extras",
    label: "Extras",
    content: (
      <div className="space-y-3 text-sm text-text-secondary">
        <p>El calendario y el chat permiten validar componentes más complejos.</p>
      </div>
    ),
  },
];

export default function HomePage() {
  const [inputValue, setInputValue] = useState("Texto de ejemplo");
  const [textareaValue, setTextareaValue] = useState("Una nota rápida...");
  const [selectValue, setSelectValue] = useState("opcion-2");
  const [multiSelected, setMultiSelected] = useState<string[]>(["frontend"]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [calendarValue, setCalendarValue] = useState<Date | null>(new Date());

  const selectedMultiLabel = useMemo(
    () => (multiSelected.length ? multiSelected.join(", ") : "Sin selección"),
    [multiSelected]
  );

  return (
    <main className="min-h-screen bg-background px-4 py-6 md:px-8 lg:px-12">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Breadcrumbs />
              <h1 className="mt-4 text-3xl font-semibold text-text-primary">
                Página de prueba de la librería UI
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-text-secondary">
                Verifica botones, formularios, cards, gráficos, tablas, modales, calendario y chat.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" onClick={() => toast.success("Toast de éxito mostrado")}>Toast exitosa</Button>
              <Button variant="outline" onClick={() => toast.error("Error simulado")}>Toast error</Button>
              <Tooltip content="Abrir diálogo de ejemplo" side="bottom">
                <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                  Abrir diálogo
                </Button>
              </Tooltip>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <Card padding="lg" className="space-y-6">
              <CardHeader title="Controles básicos" subtitle="Botones, inputs y selectores" />
              <CardBody className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <p className="font-semibold text-text-primary">Botones</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default">Default</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-text-primary">Inputs</p>
                    <div className="grid gap-3">
                      <Input
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Ingresa texto"
                      />
                      <Textarea
                        value={textareaValue}
                        onChange={(event) => setTextareaValue(event.target.value)}
                        rows={4}
                        placeholder="Descripción breve"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <p className="font-semibold text-text-primary">Select</p>
                    <Select value={selectValue} onValueChange={setSelectValue}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opcion-1">Opción 1</SelectItem>
                        <SelectItem value="opcion-2">Opción 2</SelectItem>
                        <SelectItem value="opcion-3">Opción 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-text-muted">Valor seleccionado: {selectValue}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-text-primary">MultiSelect</p>
                    <MultiSelect
                      options={["frontend", "backend", "diseño", "qa"]}
                      selected={multiSelected}
                      onChange={setMultiSelected}
                      placeholder="Áreas"
                    />
                    <p className="text-xs text-text-muted">Seleccionado: {selectedMultiLabel}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-text-primary">Dropdown Menu</p>
                  <DropdownMenu
                    trigger={<span className="font-medium">Abrir menú</span>}
                    groups={[
                      {
                        groupLabel: "Acciones",
                        items: [
                          {
                            label: "Editar",
                            onClick: () => toast(`Seleccionaste editar`),
                          },
                          {
                            label: "Duplicar",
                            onClick: () => toast(`Seleccionaste duplicar`),
                          },
                        ],
                      },
                      {
                        groupLabel: "Peligro",
                        items: [
                          {
                            label: "Eliminar",
                            variant: "danger",
                            onClick: () => toast.error("Eliminar acción") ,
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </CardBody>
            </Card>

            <Card padding="lg" className="space-y-6">
              <CardHeader title="Datos y visualizaciones" subtitle="Tablas, badges y gráficas" />
              <CardBody className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-text-primary">Badges</p>
                  <div className="flex flex-wrap gap-3">
                    <LabelBadge label="Nuevo" color="accent" variant="filled" />
                    <LabelBadge label="Revisión" color="warning" variant="soft" />
                    <LabelBadge label="Activo" color="success" variant="outline" />
                    <StatusBadge status="success" label="Operativo" animated />
                    <StatusBadge status="warning" label="Atención" />
                    <StatusBadge status="error" label="Error" />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-text-primary">Tabs</p>
                  <Tabs tabs={tabItems} defaultTab="principales" />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-text-primary">Tabla de ejemplo</p>
                  <DataTable
                    data={sampleTableData}
                    columns={tableColumns}
                    rowKey="id"
                    maxHeight="280px"
                    headerVariant="accent"
                    size="md"
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-6">
            <Card padding="lg" className="space-y-5">
              <CardHeader title="Gráficas" subtitle="Barr, donut y línea" />
              <CardBody className="grid gap-5">
                <GraficaBar title="Ventas mensuales" description="Valores en miles" data={barData} />
                <GraficaDonut title="Distribución" description="Porcentaje por categoría" data={donutData} />
                <GraficaLine
                  title="Tendencia semanal"
                  description="Interacción por día"
                  data={lineData}
                  showArea
                  legendLabel="Usuarios"
                />
              </CardBody>
            </Card>

            <Card padding="lg" className="space-y-5">
              <CardHeader title="Componentes avanzados" subtitle="Modales, calendario y chat" />
              <CardBody className="space-y-5">
                <div className="grid gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default" onClick={() => setDialogOpen(true)}>
                      Abrir Dialog
                    </Button>
                    <Button variant="secondary" onClick={() => setAlertOpen(true)}>
                      Abrir AlertDialog
                    </Button>
                    <Button variant="ghost" onClick={() => toast("¡Ejemplo ghost!")}>Ghost toast</Button>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-text-primary">Calendario</p>
                    <Calendar
                      variant="full"
                      value={calendarValue}
                      onChange={setCalendarValue}
                      selectionMode="date"
                      minDate={new Date(2023, 0, 1)}
                      maxDate={new Date(2026, 11, 31)}
                    />
                    <p className="text-xs text-text-muted">
                      Fecha seleccionada:{' '}
                      {calendarValue ? calendarValue.toLocaleDateString('es-CO') : 'Ninguna'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-text-primary">Chat widget</p>
                    <div className="rounded-2xl border border-border p-4 bg-surface">
                      <ChatWidget />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} size="lg">
        <DialogHeader
          title="Diálogo de prueba"
          description="Este diálogo utiliza Header, Body y Footer del componente Dialog."
          icon={<Info className="w-5 h-5" />}
          withDivider
        />
        <DialogBody>
          <p className="text-sm text-text-secondary">
            Aquí puedes validar el render del modal y cerrar con Escape o clic fuera.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={() => {
            setDialogOpen(false);
            toast.success("Dialog confirmado");
          }}>
            Confirmar
          </Button>
        </DialogFooter>
      </Dialog>

      <AlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        variant="warning"
        title="Atención requerida"
        description="Confirma o cancela esta acción de prueba."
        confirmLabel="Sí, continuar"
        cancelLabel="No, cerrar"
        onConfirm={() => {
          setAlertOpen(false);
          toast.success("Acción confirmada");
        }}
        onCancel={() => {
          setAlertOpen(false);
          toast("Cancelado");
        }}
      />
    </main>
  );
}
