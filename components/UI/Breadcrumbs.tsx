'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Breadcrumbs() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter((segment) => segment !== '')

  return (
    <nav className="flex items-center space-x-2 text-xs tracking-widest font-semibold text-text-muted whitespace-nowrap overflow-x-auto scrollbar-hide">

      {segments.length === 0 ? (
        <span className="text-text-primary">
          INICIO
        </span>
      ) : (
        <Link href="/" className="hover:text-text-primary transition-colors flex items-center">
          INICIO
        </Link>
      )}

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1

        let name = decodeURIComponent(segment)
          .replace(/[-_]/g, ' ')
          .toUpperCase()

        return (
          <div key={href} className="flex items-center space-x-2">
            <span className="text-text-muted/50">/</span>
            {isLast ? (
              <span className="text-text-primary">
                {name}
              </span>
            ) : (
              <Link href={href} className="hover:text-text-primary transition-colors">
                {name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}