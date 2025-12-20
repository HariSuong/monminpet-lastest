import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <div
        className={cn('animate-pulse rounded-md bg-primary/10', className)}
        {...props}
      />
    </div>
  )
}

export { Skeleton }
