'use client'

import { useState } from 'react'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/Modales/Modal'
import { Button, Input } from '@/components/ui'
import { AlertDialog } from '@/components/ui/Modales/AlertDialog'

export default function ExamplePage() {
  const [open, setOpen] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <div className="p-6">
      <Button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        Abrir modal
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Crear paquete"
        description="Completa la información del paquete"
        size="md"
        variant="default"
      >
        <ModalBody>
          <div className="space-y-4">
            <Input
              placeholder="Nombre"
            />
            <Input
              placeholder="Versión"
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border"
          >
            Cancelar
          </Button>

          <Button
            onClick={() => {
              setOpen(false)
              setShowDeleteAlert(true)
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
      <div>


        <AlertDialog
          isOpen={showDeleteAlert}
          onClose={() => setShowDeleteAlert(false)}
          variant="error"
          title="¿Eliminar proyecto?"
          description="Esta acción no se puede deshacer. Se borrarán permanentemente todos los archivos y datos asociados."
          confirmLabel="Eliminar permanentemente"
          cancelLabel="Mantener proyecto"
        />

      </div>
    </div>
  )
}