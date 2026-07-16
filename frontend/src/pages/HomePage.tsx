import { HeroBanner } from '@/features/movies/components/HeroBanner'
import { MovieCarousel } from '@/features/movies/components/MovieCarousel'
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useTrendingMovies,
} from '@/features/movies/hooks/useMovies'

export function HomePage() {
  const trending = useTrendingMovies('week')
  const popular = usePopularMovies()
  const topRated = useTopRatedMovies()
  const nowPlaying = useNowPlayingMovies()

  return (
    <div className="flex flex-col">
      {/* -mt-16 cancela o padding-top do layout para o banner ficar atrás da navbar (transparente no topo) */}
      <div className="-mt-16">
        <HeroBanner movies={trending.data?.results} isLoading={trending.isPending} />
      </div>

      <div className="relative z-10 -mt-8 flex flex-col gap-4 pb-8">
        <MovieCarousel
          title="Em alta esta semana"
          movies={trending.data?.results}
          isLoading={trending.isPending}
          isError={trending.isError}
        />
        <MovieCarousel
          title="Mais populares"
          movies={popular.data?.results}
          isLoading={popular.isPending}
          isError={popular.isError}
        />
        <MovieCarousel
          title="Melhores avaliados"
          movies={topRated.data?.results}
          isLoading={topRated.isPending}
          isError={topRated.isError}
        />
        <MovieCarousel
          title="Lançamentos"
          movies={nowPlaying.data?.results}
          isLoading={nowPlaying.isPending}
          isError={nowPlaying.isError}
        />
      </div>
    </div>
  )
}
