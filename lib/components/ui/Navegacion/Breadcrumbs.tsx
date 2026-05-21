'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

export interface BreadcrumbsProps {
  className?: string
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Filtramos los segmentos vacíos de la URL
  const segments = pathname.split('/').filter((segment) => segment !== '')

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn(
        "flex items-center space-x-2 text-xs tracking-widest font-semibold text-text-muted whitespace-nowrap overflow-x-auto scrollbar-none py-1", 
        className
      )}
    >
      {/* Nodo Raíz: INICIO */}
      {segments.length === 0 ? (
        <span className="text-text-primary" aria-current="page">
          INICIO
        </span>
      ) : (
        <Link href="/" className="hover:text-text-primary text-text-muted transition-colors flex items-center outline-none focus-visible:text-accent">
          INICIO
        </Link>
      )}

      {/* Mapeo dinámico de segmentos */}
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1

        // Normalizamos el texto (reemplazo de guiones y URIs)
        const name = decodeURIComponent(segment)
          .replace(/[-_]/g, ' ')
          .toUpperCase()

        return (
          <div key={href} className="flex items-center space-x-2">
            {/* Separador Estético */}
            <span 
              className="text-text-muted/40 select-none text-md" 
              aria-hidden="true" 
            >
              ›
            </span>

            {isLast ? (
             
              <span 
                className="text-text-primary font-bold" 
                aria-current="page" 
              >
                {name}
              </span>
            ) : (
              // Elementos intermedios navegables
              <Link 
                href={href} 
                className="hover:text-text-primary text-text-muted transition-colors outline-none focus-visible:text-accent"
              >
                {name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}