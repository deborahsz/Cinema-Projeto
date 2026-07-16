import { type MouseEvent } from 'react'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/features/favorites/context/favorites-context'
import { cn } from '@/lib/utils'
import type { MovieSummary } from '@/types/movie'

interface FavoriteButtonProps {
  movie: MovieSummary
  variant?: 'icon' | 'full'
  className?: string
}

export function FavoriteButton({ movie, variant = 'icon', className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(movie.id)

  function handleClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    const added = toggleFavorite(movie)
    toast[added ? 'success' : 'info'](
      added ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
      { description: movie.title },
    )
  }

  const label = favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'

  if (variant === 'full') {
    return (
      <Button
        type="button"
        variant={favorited ? 'secondary' : 'outline'}
        size="lg"
        onClick={handleClick}
        aria-pressed={favorited}
        className={className}
      >
        <Heart className={cn('transition-colors', favorited && 'fill-primary text-primary')} />
        {favorited ? 'Nos favoritos' : 'Favoritar'}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={favorited}
      title={label}
      className={cn('size-9 rounded-full bg-black/60 hover:bg-black/80', className)}
    >
      <Heart
        className={cn(
          'size-4 text-white transition-colors',
          favorited && 'fill-primary text-primary',
        )}
      />
    </Button>
  )
}
