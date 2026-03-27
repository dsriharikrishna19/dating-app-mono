function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['animate-pulse rounded-md bg-muted', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

export { Skeleton }
