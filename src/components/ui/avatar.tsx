import * as React from 'react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    name?: string
    src?: string
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, name, src, size = 'md', ...props }, ref) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  if (src) {
    return (
      <span
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={name || 'Avatar'}
        />
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-slate-200 items-center justify-center font-medium text-slate-600',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {initials}
    </span>
  )
})
Avatar.displayName = 'Avatar'

export { Avatar }
