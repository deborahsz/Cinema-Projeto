import { useCallback, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FavoritesContext } from '@/features/favorites/context/favorites-context'
import type { MovieSummary } from '@/types/movie'

const STORAGE_KEY = 'cinescope:favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<MovieSummary[]>(STORAGE_KEY, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some((movie) => movie.id === id),
    [favorites],
  )

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => prev.filter((movie) => movie.id !== id))
    },
    [setFavorites],
  )

  /** Alterna o favorito e retorna `true` se o filme passou a ser favorito. */
  const toggleFavorite = useCallback(
    (movie: MovieSummary) => {
      const alreadyFavorite = favorites.some((item) => item.id === movie.id)

      setFavorites((prev) =>
        alreadyFavorite ? prev.filter((item) => item.id !== movie.id) : [movie, ...prev],
      )

      return !alreadyFavorite
    },
    [favorites, setFavorites],
  )

  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
