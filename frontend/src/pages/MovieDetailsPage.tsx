import { useParams } from 'react-router-dom'
import { MovieDetailsHero } from '@/features/movies/components/MovieDetailsHero'
import { MovieDetailsSkeleton } from '@/features/movies/components/MovieDetailsSkeleton'
import { CastList } from '@/features/movies/components/CastList'
import { MovieCarousel } from '@/features/movies/components/MovieCarousel'
import {
  useMovieCredits,
  useMovieDetails,
  useMovieRecommendations,
  useMovieVideos,
} from '@/features/movies/hooks/useMovieDetails'
import { selectTrailer } from '@/features/movies/utils/select-trailer'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const movieId = id ?? ''

  const details = useMovieDetails(movieId)
  const credits = useMovieCredits(movieId)
  const videos = useMovieVideos(movieId)
  const recommendations = useMovieRecommendations(movieId)

  if (details.isPending) {
    return <MovieDetailsSkeleton />
  }

  if (details.isError || !details.data) {
    return <NotFoundPage />
  }

  const director = credits.data?.crew.find((member) => member.job === 'Director')?.name ?? null
  const trailer = selectTrailer(videos.data)

  return (
    <div className="flex flex-col gap-12 pb-12">
      <MovieDetailsHero movie={details.data} director={director} trailer={trailer} />

      {credits.data && credits.data.cast.length > 0 && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <CastList cast={credits.data.cast} />
        </div>
      )}

      {recommendations.data && recommendations.data.results.length > 0 && (
        <MovieCarousel
          title="Recomendações"
          description="Filmes parecidos que você também pode gostar"
          movies={recommendations.data.results}
          isLoading={recommendations.isPending}
          isError={recommendations.isError}
        />
      )}
    </div>
  )
}
