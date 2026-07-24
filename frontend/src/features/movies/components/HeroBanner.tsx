import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, Play, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton'
import { useGenres } from '@/features/movies/hooks/useMovies'
import { paths } from '@/routes/paths'
import { getTmdbImageUrl } from '@/utils/tmdb-image'
import { formatYear } from '@/utils/format'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'

interface HeroBannerProps {
  movies?: Movie[]
  isLoading?: boolean
}

const ROTATE_INTERVAL_MS = 8000

export function HeroBanner({ movies, isLoading }: HeroBannerProps) {
  const slides = movies?.slice(0, 5) ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { data: genres } = useGenres()

  const genreMap = useMemo(() => new Map(genres?.map((genre) => [genre.id, genre.name])), [genres])

  useEffect(() => {
    if (slides.length < 2 || paused) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [slides.length, paused])

  if (isLoading) {
    return <Skeleton className="h-[70svh] w-full rounded-none sm:h-[82svh]" />
  }

  const movie = slides[activeIndex]
  if (!movie) return null

  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, 'original')
  const year = formatYear(movie.release_date)
  const movieGenres = movie.genre_ids
    .map((id) => genreMap.get(id))
    .filter(Boolean)
    .slice(0, 3) as string[]

  return (
    <section
      className="relative h-[70svh] w-full overflow-hidden sm:h-[82svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt=""
              className="size-full object-cover object-top"
              fetchPriority={activeIndex === 0 ? 'high' : undefined}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_100%,transparent_40%,var(--background))]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end gap-5 px-4 pb-14 sm:px-6 sm:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Em destaque
            </span>

            <h1 className="mt-4 line-clamp-3 font-display text-3xl leading-[1.05] font-extrabold tracking-tight text-white drop-shadow-2xl break-words sm:text-5xl lg:text-6xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/90">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="size-4 fill-rating text-rating" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              {year && <span className="text-white/70">{year}</span>}
              {movieGenres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movieGenres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              {movie.overview}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 w-full shadow-lg shadow-primary/25 sm:w-auto"
              >
                <Link to={paths.movieDetails(movie.id)}>
                  <Play className="fill-current" />
                  Assistir trailer
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-11 w-full border border-white/10 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
              >
                <Link to={paths.movieDetails(movie.id)}>
                  <Info />
                  Mais informações
                </Link>
              </Button>
              <FavoriteButton movie={movie} className="size-11" />
            </div>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="flex items-center gap-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ver destaque ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className="flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    index === activeIndex ? 'w-9 bg-primary' : 'w-4 bg-white/30 hover:bg-white/50',
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
