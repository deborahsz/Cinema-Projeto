import { motion } from 'framer-motion'
import { Calendar, Clock, Play, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrailerDialog } from '@/features/movies/components/TrailerDialog'
import { getTmdbImageUrl } from '@/utils/tmdb-image'
import { formatRuntime, formatYear } from '@/utils/format'
import type { MovieDetails, MovieVideo } from '@/types/movie'

interface MovieDetailsHeroProps {
  movie: MovieDetails
  director?: string | null
  trailer?: MovieVideo | null
}

export function MovieDetailsHero({ movie, director, trailer }: MovieDetailsHeroProps) {
  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, 'original')
  const posterUrl = getTmdbImageUrl(movie.poster_path, 'w500')
  const year = formatYear(movie.release_date)
  const runtime = formatRuntime(movie.runtime)

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[45svh] overflow-hidden sm:h-[60svh]">
        {backdropUrl && <img src={backdropUrl} alt="" className="size-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-[28svh] sm:px-6 sm:pt-[38svh]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            src={posterUrl ?? undefined}
            alt={movie.title}
            className="mx-auto aspect-[2/3] w-40 shrink-0 rounded-lg object-cover shadow-2xl ring-1 ring-border sm:mx-0 sm:w-56"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-1 text-sm text-muted-foreground italic">{movie.tagline}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Star className="size-4 fill-rating text-rating" />
                  {movie.vote_average.toFixed(1)}
                  <span className="font-normal text-muted-foreground">
                    ({movie.vote_count.toLocaleString('pt-BR')})
                  </span>
                </span>
              )}
              {year && (
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {year}
                </span>
              )}
              {runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {runtime}
                </span>
              )}
            </div>

            {movie.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {movie.overview && (
              <div className="mt-5 max-w-2xl">
                <h2 className="mb-1 text-sm font-semibold text-foreground">Sinopse</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{movie.overview}</p>
              </div>
            )}

            {director && (
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Direção:</span> {director}
              </p>
            )}

            {trailer && (
              <div className="mt-6">
                <TrailerDialog trailer={trailer} title={movie.title}>
                  <Button size="lg">
                    <Play className="fill-current" />
                    Assistir trailer
                  </Button>
                </TrailerDialog>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
