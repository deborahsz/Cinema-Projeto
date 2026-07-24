import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'
import { StarRating } from '@/features/ratings/components/StarRating'
import type { Rating } from '@/features/ratings/types'
import { paths } from '@/routes/paths'
import { formatDate } from '@/utils/format'
import { getTmdbImageUrl } from '@/utils/tmdb-image'

interface RatingListItemProps {
  rating: Rating
}

export function RatingListItem({ rating }: RatingListItemProps) {
  const posterUrl = getTmdbImageUrl(rating.posterPath, 'w185')
  const updatedAt = formatDate(rating.updatedAt)

  return (
    <Link
      to={paths.movieDetails(rating.movieId)}
      className="glass flex gap-4 rounded-xl p-3 transition-colors hover:bg-muted/40"
    >
      <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
        {posterUrl ? (
          <img src={posterUrl} alt="" className="size-full object-cover" loading="lazy" />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <Film className="size-5" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">
          {rating.title || `Filme #${rating.movieId}`}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <StarRating value={rating.score} readOnly size={16} />
          <span className="text-xs font-medium text-muted-foreground">{rating.score}/10</span>
        </div>
        {rating.comment && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{rating.comment}</p>
        )}
        {updatedAt && (
          <p className="mt-1 text-xs text-muted-foreground">Atualizado em {updatedAt}</p>
        )}
      </div>
    </Link>
  )
}
