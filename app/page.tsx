'use client'

import { useState } from 'react'

import {
  Button,
  Input,
  Textarea,
} from '@/components/ui/Base'

import {
  StatusBadge,
  LabelBadge,
} from '@/components/ui/Compuesto/Badges'

import {
  Card,
  CardHeader,
  CardBody,
} from '@/components/ui/Compuesto/Modals/Card'

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@/components/ui/Compuesto/Modals/Dialog'

import { Tooltip } from '@/components/ui/Compuesto/Tooltip'

import {
  GraficaBar,
  GraficaDonut,
  GraficaLine,
} from '@/components/ui/DataDisplay/Graficas'

import { DataTable } from '@/components/ui/DataDisplay/Table'

import { Breadcrumbs } from '@/components/ui/Navegacion/Breadcrumbs'

import { AlertDialog } from '@/components/Prueba'

export default function UIShowcase() {
  const [alertOpen, setAlertOpen] = useState<{ type: string; open: boolean }>({ type: 'info', open: false })
  return (
    <div className="p-8 space-y-12">


      {/* 🧭 NAVEGACIÓN */}
      <section>
        <h2 className="text-xl font-bold mb-4">navegación</h2>

        <Breadcrumbs />

      </section>

      {/* ⚠️ ALERTDIALOG */}
      <section>
        <h2 className="text-xl font-bold mb-4">AlertDialog</h2>

        <div className="flex gap-4 flex-wrap">
          <Button variant="secondary" className="!bg-error !text-white !hover:bg-error/90" onClick={() => setAlertOpen({ type: 'destructive', open: true })}>
            Eliminar
          </Button>
          <Button variant="secondary" className="!bg-warning !text-white !hover:bg-warning/90" onClick={() => setAlertOpen({ type: 'warning', open: true })}>
            Advertencia
          </Button>
          <Button variant="secondary" className="!bg-success !text-white !hover:bg-success/90" onClick={() => setAlertOpen({ type: 'success', open: true })}>
            Éxito
          </Button>
          <Button variant="secondary" className="!bg-info !text-white !hover:bg-info/90" onClick={() => setAlertOpen({ type: 'info', open: true })}>
            Info
          </Button>
        </div>

        <AlertDialog
          open={alertOpen.open && alertOpen.type === 'destructive'}
          onClose={() => setAlertOpen({ type: 'info', open: false })}
          variant="destructive"
          title="¿Eliminar usuario?"
          description="Esta acción no se puede deshacer. El usuario será eliminado permanentemente."
          confirmLabel="Eliminar"
          onConfirm={() => setAlertOpen({ type: 'destructive', open: false })}
          onCancel={() => setAlertOpen({ type: 'destructive', open: false })}
        />

        <AlertDialog
          open={alertOpen.open && alertOpen.type === 'warning'}
          onClose={() => setAlertOpen({ type: 'warning', open: false })}
          variant="warning"
          title="¿Continuar con la operación?"
          description="Esta acción requiere confirmación especial. ¿Desea proceder?"
          confirmLabel="Continuar"
          onConfirm={() => setAlertOpen({ type: 'warning', open: false })}
          onCancel={() => setAlertOpen({ type: 'warning', open: false })}
        />

        <AlertDialog
          open={alertOpen.open && alertOpen.type === 'success'}
          onClose={() => setAlertOpen({ type: 'success', open: false })}
          variant="success"
          title="¡Operación exitosa!"
          description="Los cambios se han guardado correctamente."
          confirmLabel="Aceptar"
          onConfirm={() => setAlertOpen({ type: 'success', open: false })}
        />

        <AlertDialog
          open={alertOpen.open && alertOpen.type === 'info'}
          onClose={() => setAlertOpen({ type: 'info', open: false })}
          variant="info"
          title="Información importante"
          description="Tu sesión expirará en 5 minutos. Guarda tu trabajo antes de continuar."
          confirmLabel="Entendido"
          onConfirm={() => setAlertOpen({ type: 'info', open: false })}
        />

      </section>

    </div>
  )
}