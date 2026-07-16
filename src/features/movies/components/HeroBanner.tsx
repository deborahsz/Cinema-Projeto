import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { paths } from '@/routes/paths'
import { getTmdbImageUrl } from '@/utils/tmdb-image'
import { cn } from '@/lib/utils'
import type { Movie } from '@/types/movie'

interface HeroBannerProps {
  movies?: Movie[]
  isLoading?: boolean
}

const ROTATE_INTERVAL_MS = 7000

export function HeroBanner({ movies, isLoading }: HeroBannerProps) {
  const slides = movies?.slice(0, 5) ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (slides.length < 2 || paused) return

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, ROTATE_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [slides.length, paused])

  if (isLoading) {
    return <Skeleton className="h-[56svh] w-full rounded-none sm:h-[70svh]" />
  }

  const movie = slides[activeIndex]
  if (!movie) return null

  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, 'original')

  return (
    <section
      className="relative h-[56svh] w-full overflow-hidden sm:h-[70svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt=""
              className="size-full object-cover"
              fetchPriority={activeIndex === 0 ? 'high' : undefined}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative flex h-full max-w-7xl flex-col justify-end gap-4 px-4 pb-12 sm:px-6 sm:pb-16 lg:mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <h1 className="font-display text-3xl font-bold text-foreground drop-shadow-lg sm:text-5xl">
              {movie.title}
            </h1>
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground sm:text-base">
              {movie.overview}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to={paths.movieDetails(movie.id)}>
                  <Play className="fill-current" />
                  Assistir trailer
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to={paths.movieDetails(movie.id)}>
                  <Info />
                  Mais informações
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ver destaque ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  index === activeIndex
                    ? 'w-8 bg-primary'
                    : 'w-4 bg-foreground/30 hover:bg-foreground/50',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
