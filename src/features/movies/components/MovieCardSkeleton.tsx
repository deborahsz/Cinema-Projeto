import { Skeleton } from '@/components/ui/skeleton'

export function MovieCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <Skeleton className="mt-2 h-4 w-3/4 rounded" />
    </div>
  )
}
