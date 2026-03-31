'use client'

import { Button } from '@/components/ui/buttonComponents'
import { toast } from '@/lib/toast'


export default function Inicio() {

  return (
    <div className='flex fex-col gap-4 p-10'>
      <Button
        onClick={() => {
          toast.error('Error')
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          toast.success('Exito correctamente')
        }}
      >
        Exito
      </Button>
    </div>
  )
}