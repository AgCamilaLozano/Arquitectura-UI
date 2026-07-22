"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold font-heading text-text-primary mb-4">
          @agustin/ui
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          Design System &amp; Component Library Playground
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/primitives"
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Primitives
          </Link>
          <Link
            href="/components"
            className="px-6 py-3 rounded-lg border border-border-default text-text-primary font-medium hover:bg-accent-soft transition-colors"
          >
            Components
          </Link>
        </div>
      </div>
    </div>
  )
}
