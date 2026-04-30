"use client";

import React, { useState } from "react";
import {
    Plus,
    Settings,
    User,
    Bell,
    Mail,
    Search,
    Info,
    AlertTriangle,
    CheckCircle2,
    XCircle
} from "lucide-react";

// Importación de componentes siguiendo la estructura del proyecto
import { Tabs } from "@/components/ui/DataDisplay/Tabs";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "@/components/ui/Compuesto/Modals/Card";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@/components/ui/Compuesto/Modals/Dialog";

// Nota: Asumiendo que estos componentes están exportados según el .d.ts y README
import {
    Button,
    Input,
    Textarea
} from "@/components/ui/Base";
import {
    LabelBadge,
    StatusBadge,
} from "@/components/ui/Compuesto/Badges";
import {
    DataTable,
    GraficaBar,
    GraficaDonut,
} from "@/components/ui/DataDisplay";
import {
    ThemeToggle
} from "@/components/ui/Tema/ThemeToggle";

export default function ShowcasePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Mock Data para componentes de datos
    const chartData = [
        { label: "Ene", value: 400 },
        { label: "Feb", value: 300 },
        { label: "Mar", value: 600 },
        { label: "Abr", value: 800 },
    ];

    const tableColumns = [
        { key: "id", header: "ID" },
        { key: "name", header: "Usuario" },
        { key: "role", header: "Rol" },
        {
            key: "status",
            header: "Estado",
            render: (row: any) => (
                <StatusBadge
                    status={row.status === 'Activo' ? 'success' : 'idle'}
                    label={row.status}
                />
            )
        },
    ];

    const tableData = [
        { id: "1", name: "Agustín AI", role: "Arquitecto", status: "Activo" },
        { id: "2", name: "Camila", role: "Admin", status: "Inactivo" },
    ];

    return (
        <main className="min-h-screen bg-background p-8 space-y-12">
            {/* --- HEADER --- */}
            <header className="flex justify-between items-center border-b pb-6">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-text-primary">UI Component Library</h1>
                    <p className="text-text-secondary">Showcase de componentes y variantes para captura de diseño.</p>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </header>

            {/* --- SECCIÓN: BOTONES --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold font-heading">Base: Buttons</h2>
                <div className="p-6 bg-surface rounded-xl border space-y-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button variant="default">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="default">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><Settings size={18} /></Button>
                        <Button variant="outline" className="gap-2"><Plus size={16} /> New Project</Button>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN: BADGES --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-medium flex items-center gap-2"><CheckCircle2 className="size-5 text-success" /> Status Badges</h3>
                    <div className="flex flex-wrap gap-3 p-4 border rounded-xl bg-background">
                        <StatusBadge status="success" label="Online" animated />
                        <StatusBadge status="error" label="Error" />
                        <StatusBadge status="warning" label="Warning" />
                        <StatusBadge status="info" label="Info" />
                        <StatusBadge status="idle" label="Offline" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-medium flex items-center gap-2"><Info className="size-5 text-accent" /> Label Badges</h3>
                    <div className="flex flex-wrap gap-3 p-4 border rounded-xl bg-background">
                        <LabelBadge label="Default" />
                        <LabelBadge label="Accent Filled" variant="filled" color="accent" />
                        <LabelBadge label="Success Soft" variant="soft" color="success" icon={<CheckCircle2 size={12} />} />
                        <LabelBadge label="Warning Outline" variant="outline" color="warning" />
                        <LabelBadge label="Removible" variant="soft" color="error" onRemove={() => alert('Remove')} />
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN: TABS --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold font-heading">Navigation: Tabs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Tabs
                        variant="underline"
                        tabs={[
                            { id: "1", label: "Profile", icon: <User />, content: <div className="p-4 border rounded-lg bg-surface">Contenido de Perfil (Underline)</div> },
                            { id: "2", label: "Settings", icon: <Settings />, content: "Settings Content" }
                        ]}
                    />
                    <Tabs
                        variant="pill"
                        tabs={[
                            { id: "1", label: "Overview", content: <div className="p-4 bg-muted/30 rounded-lg">Vista General (Pill)</div> },
                            { id: "2", label: "Analytics", content: "Analytics Content" }
                        ]}
                    />
                </div>
            </section>

            {/* --- SECCIÓN: CARDS --- */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold font-heading">Compuesto: Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card Default */}
                    <Card variant="default" clickable>
                        <CardHeader title="Default Card" subtitle="Variante básica del sistema" />
                        <CardBody>Borde sutil y fondo blanco. Ideal para listas de contenido regular.</CardBody>
                        <CardFooter withDivider><Button variant="outline" size="sm">Configurar</Button></CardFooter>
                    </Card>

                    {/* Card Outlined */}
                    <Card variant="outlined">
                        <CardHeader title="Outlined Strong" action={<StatusBadge status="info" label="Sugerencia" />} />
                        <CardBody>Usa un borde más grueso con el color primario/fuerte del tema.</CardBody>
                        <CardFooter align="left"><Button size="sm">Entendido</Button></CardFooter>
                    </Card>

                    {/* Card Accent */}
                    <Card variant="accent">
                        <CardHeader
                            title="Brand Accent"
                            subtitle="Borde lateral de marca"
                        />
                        <CardBody>Destaca visualmente mediante un borde a la izquierda con el color accent.</CardBody>
                        <CardFooter align="between" className="pt-2">
                            <span className="text-xs text-text-muted italic">Última actualización: Hoy</span>
                            <Settings className="size-4 text-text-muted" />
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* --- SECCIÓN: DATA & FORMS --- */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-full">
                    <CardHeader title="Data Visualization" subtitle="DataTable & Charts" withDivider />
                    <CardBody className="flex flex-col gap-6">
                        <div className="h-48 w-full bg-muted/10 rounded-xl flex items-center justify-center border border-dashed">
                            <GraficaBar data={chartData} height={150} animated />
                        </div>
                        <DataTable
                            columns={tableColumns}
                            data={tableData}
                            rowKey="id"
                            size="sm"
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader title="Form Inputs" subtitle="Variaciones de entrada" withDivider />
                    <CardBody className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Búsqueda</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 size-4 text-text-muted" />
                                <Input className="pl-10" placeholder="Buscar registros..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Comentarios</label>
                            <Textarea placeholder="Escribe aquí tu mensaje..." rows={4} />
                        </div>
                        <div className="pt-4">
                            <Button onClick={() => setIsDialogOpen(true)} className="w-full gap-2">
                                Probar Modal (Dialog)
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </section>

            {/* --- DIALOG DEMO --- */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} variant="info" size="md">
                <DialogHeader
                    title="Confirmación de Sistema"
                    description="¿Estás seguro de que deseas aplicar estos cambios a la biblioteca?"
                    icon={<Info />}
                    withDivider
                />
                <DialogBody scrollable>
                    <p>Al confirmar, se actualizarán todos los tokens de diseño en el archivo `globals.css` y se refrescará el caché de los componentes.</p>
                    <div className="mt-4 p-3 bg-accent-soft rounded-lg text-accent border border-accent/20">
                        Esta acción es reversible desde el panel de administración.
                    </div>
                </DialogBody>
                <DialogFooter withDivider>
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Aceptar</Button>
                </DialogFooter>
            </Dialog>

        </main>
    );
}
