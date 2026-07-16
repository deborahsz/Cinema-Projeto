import { useTrendingMovies } from '@/features/movies/hooks/useMovies'
import { getTmdbImageUrl } from '@/utils/tmdb-image'
import { Skeleton } from '@/components/ui/skeleton'

export function HomePage() {
  const { data, isPending, isError } = useTrendingMovies('week')

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">Em alta esta semana</h1>
        <p className="text-sm text-muted-foreground">
          Prova de conceito da Etapa 6 (TanStack Query + TMDB) — o banner e os demais carrosséis
          chegam na próxima etapa.
        </p>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Não foi possível carregar os filmes. Verifique sua chave da API do TMDB.
        </p>
      )}

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {isPending &&
          Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[2/3] w-full rounded-lg" />
          ))}

        {data?.results.slice(0, 12).map((movie) => (
          <div key={movie.id} className="group">
            <div className="aspect-[2/3] overflow-hidden rounded-lg bg-secondary">
              {getTmdbImageUrl(movie.poster_path, 'w342') && (
                <img
                  src={getTmdbImageUrl(movie.poster_path, 'w342')!}
                  alt={movie.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <p className="mt-2 truncate text-sm font-medium text-foreground">{movie.title}</p>
            <p className="text-xs text-muted-foreground">&#9733; {movie.vote_average.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
