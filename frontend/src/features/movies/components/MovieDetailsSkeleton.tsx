import { Skeleton } from '@/components/ui/skeleton'

export function MovieDetailsSkeleton() {
  return (
    <div>
      <Skeleton className="h-[45svh] w-full rounded-none sm:h-[60svh]" />
      <div className="mx-auto -mt-24 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="mx-auto aspect-[2/3] w-40 shrink-0 rounded-lg sm:mx-0 sm:w-56" />
          <div className="flex-1 space-y-4 pt-4">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-5 w-1/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  )
}
