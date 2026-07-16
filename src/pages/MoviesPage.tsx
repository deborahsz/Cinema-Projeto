import { useMemo, useState } from 'react'
import { Loader2, SearchX } from 'lucide-react'
import { MovieGrid } from '@/features/movies/components/MovieGrid'
import { MovieFilters, type MovieFiltersState } from '@/features/movies/components/MovieFilters'
import { useDiscoverMovies } from '@/features/movies/hooks/useDiscoverMovies'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import type { Movie } from '@/types/movie'

const initialFilters: MovieFiltersState = {
  genreId: null,
  sortBy: 'popularity.desc',
  year: null,
}

export function MoviesPage() {
  const [filters, setFilters] = useState<MovieFiltersState>(initialFilters)

  const { data, isPending, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useDiscoverMovies(filters)

  const movies = useMemo(() => {
    const unique = new Map<number, Movie>()
    data?.pages.forEach((page) => page.results.forEach((movie) => unique.set(movie.id, movie)))
    return [...unique.values()]
  }, [data])

  const sentinelRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Explorar filmes</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Filtre por gênero, ano e ordenação. Role para carregar mais.
          </p>
        </div>
        <MovieFilters filters={filters} onChange={setFilters} />
      </div>

      {isError ? (
        <p className="text-sm text-destructive">
          Não foi possível carregar os filmes. Tente novamente.
        </p>
      ) : !isPending && movies.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="text-muted-foreground">
            Nenhum filme encontrado com esses filtros. Tente ajustá-los.
          </p>
        </div>
      ) : (
        <>
          <MovieGrid movies={movies} isLoading={isPending} skeletonCount={18} />

          <div ref={sentinelRef} aria-hidden className="h-1" />

          {isFetchingNextPage && (
            <div className="flex justify-center py-8">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          )}

          {!hasNextPage && movies.length > 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Você chegou ao fim da lista.
            </p>
          )}
        </>
      )}
    </div>
  )
}
