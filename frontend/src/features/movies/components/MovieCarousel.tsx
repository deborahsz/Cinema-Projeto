import type { ReactNode } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { MovieCard } from '@/features/movies/components/MovieCard'
import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton'
import type { MovieSummary } from '@/types/movie'

interface MovieCarouselProps {
  title: string
  description?: string
  movies?: MovieSummary[]
  isLoading?: boolean
  isError?: boolean
  emptyMessage?: string
  action?: ReactNode
}

const SKELETON_COUNT = 8

export function MovieCarousel({
  title,
  description,
  movies,
  isLoading,
  isError,
  emptyMessage = 'Nenhum filme encontrado por aqui.',
  action,
}: MovieCarouselProps) {
  const showEmpty = !isLoading && !isError && (!movies || movies.length === 0)

  return (
    <section className="py-6">
      <div className="mx-auto mb-5 flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6">
        <div className="section-accent">
          <h2 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h2>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>

      {isError && (
        <p className="mx-auto max-w-7xl px-4 text-sm text-destructive sm:px-6">
          Não foi possível carregar esta lista agora. Tente novamente em breve.
        </p>
      )}

      {showEmpty && (
        <p className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground sm:px-6">
          {emptyMessage}
        </p>
      )}

      {!isError && !showEmpty && (
        <Carousel
          opts={{ align: 'start', dragFree: true }}
          className="mx-auto max-w-7xl px-4 sm:px-6"
        >
          <CarouselContent>
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[42%] sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <MovieCardSkeleton />
                  </CarouselItem>
                ))
              : movies?.map((movie) => (
                  <CarouselItem
                    key={movie.id}
                    className="basis-[42%] sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  >
                    <MovieCard movie={movie} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:-left-4 sm:flex" />
          <CarouselNext className="hidden sm:-right-4 sm:flex" />
        </Carousel>
      )}
    </section>
  )
}
