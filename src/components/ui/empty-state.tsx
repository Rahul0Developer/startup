import * as React from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
)
EmptyState.displayName = 'EmptyState'

export { EmptyState }
