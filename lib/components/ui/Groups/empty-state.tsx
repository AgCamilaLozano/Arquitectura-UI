"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {Icon && (
        <Icon className="size-12 text-text-secondary mb-3" />
      )}
      <h3 className="font-display text-lg font-medium text-text-primary">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-sm text-text-secondary max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  )
}

export { EmptyState }
