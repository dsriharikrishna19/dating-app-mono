import * as React from 'react'

const badgeVariants = {
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variant: {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'border-gray-200 text-foreground',
    success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-100/80',
  },
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const classes = [badgeVariants.base, badgeVariants.variant[variant], className]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} {...props} />
}

export { Badge, badgeVariants }
