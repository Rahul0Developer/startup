import * as React from 'react'
import { cn } from '@/lib/utils'

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      {
        'bg-slate-900 text-white hover:bg-slate-800': variant === 'default',
        'bg-slate-100 text-slate-900': variant === 'secondary',
        'border border-slate-300 text-slate-900': variant === 'outline',
        'bg-green-100 text-green-800': variant === 'success',
        'bg-yellow-100 text-yellow-800': variant === 'warning',
      },
      className
    )}
    {...props}
  />
))
Badge.displayName = 'Badge'

export { Badge }
