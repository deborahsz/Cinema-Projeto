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
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
      <Link
        to={paths.movieDetails(movie.id)}
        className={cn('group block focus-visible:outline-none', className)}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-secondary shadow-lg shadow-black/30 ring-1 ring-white/5 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:ring-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-primary">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex size-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
              {movie.title}
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white ring-1 ring-white/10 backdrop-blur-md">
            <Star className="size-3 fill-rating text-rating" />
            {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : '—'}
          </div>

          <FavoriteButton
            movie={movie}
            className="absolute top-2 left-2 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
          />
        </div>

        <p className="mt-2.5 truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {movie.title}
        </p>
      </Link>
    </motion.div>
  )
}
