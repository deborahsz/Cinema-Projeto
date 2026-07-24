import { createContext, useContext } from 'react'
import type { MovieSummary } from '@/types/movie'

export interface FavoritesContextValue {
  favorites: MovieSummary[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (movie: MovieSummary) => boolean
  removeFavorite: (id: number) => void
  clearFavorites: () => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um <FavoritesProvider>')
  }

  return context
}
