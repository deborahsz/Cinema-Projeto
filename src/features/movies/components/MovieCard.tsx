import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { paths } from '@/routes/paths'
import { getTmdbImageUrl } from '@/utils/tmdb-image'
import { cn } from '@/lib/utils'
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton'
import type { MovieSummary } from '@/types/movie'

interface MovieCardProps {
  movie: MovieSummary
  className?: string
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, 'w342')
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
      <Link
        to={paths.movieDetails(movie.id)}
        className={cn('group block focus-visible:outline-none', className)}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary shadow-md ring-1 ring-border/50 transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-primary/40 group-focus-visible:ring-primary/60">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex size-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
              {movie.title}
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="line-clamp-2 text-sm font-semibold text-white">{movie.title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-0.5">
                  <Star className="size-3 fill-rating text-rating" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              {year && <span>{year}</span>}
            </div>
          </div>

          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            <Star className="size-3 fill-rating text-rating" />
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : '—'}
          </div>

          <FavoriteButton
            movie={movie}
            className="absolute top-2 left-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
          />
        </div>

        <p className="mt-2 truncate text-sm font-medium text-foreground">{movie.title}</p>
      </Link>
    </motion.div>
  )
}
