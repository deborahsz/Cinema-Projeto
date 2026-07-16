import { Link } from 'react-router-dom'
import { HeartCrack, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovieGrid } from '@/features/movies/components/MovieGrid'
import { useFavorites } from '@/features/favorites/context/favorites-context'
import { paths } from '@/routes/paths'

export function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()
  const isEmpty = favorites.length === 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Meus favoritos</h1>
          {!isEmpty && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {favorites.length} filme(s) salvo(s)
            </p>
          )}
        </div>

        {!isEmpty && (
          <Button variant="ghost" size="sm" onClick={clearFavorites}>
            <Trash2 />
            Limpar tudo
          </Button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <HeartCrack className="size-12 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Você ainda não favoritou nenhum filme
            </h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Toque no coração de qualquer filme para salvá-lo aqui e assistir depois.
            </p>
          </div>
          <Button asChild>
            <Link to={paths.home}>Explorar filmes</Link>
          </Button>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  )
}
