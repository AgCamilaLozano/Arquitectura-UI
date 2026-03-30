'use client'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from "@/components/UI/buttonIcons/buttonComponents"
import { Tooltip } from '@/components/UI/Tooltip'
import { InfoIcon, TrashIcon, CopyIcon } from 'lucide-react'

export default function InicioArquitectura() {
  return (
    <main className="px-10 py-6 space-y-8 mx-auto w-full">

      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold">Arquitectura Y Convenciones Técnicas</h1>
        <p className="text-text-muted mt-2">
          Sistema de convenciones técnicas que define la estructura,
          organización y escalabilidad del código en AGUSTIN.
        </p>
      </section>

      {/* Enlace al repo */}
      <section className="bg-surface border border-accent rounded-xl p-4 w-full mx-auto flex flex-col items-center">
        <h3 className="font-semibold text-accent text-lg">Repositorio</h3>
        <p className="text-sm  mt-1">
          Accede a la implementación completa en GitHub.
        </p>

        <Button
        >
          <a
            href="https://github.com/AgCamilaLozano/Arquitectura"
            target="_blank"
            className="group flex items-center justify-center gap-3 mt-3 text-sm text-primary hover:underline hover:bg-accent-hover hover:text-accent rounded-md px-3 py-1 w-[200px]"
          >
            <SquareArrowOutUpRight className='w-4 h-4' />
            Ver repositorio
          </a>
        </Button>
      </section>
    </main>
  )
}
