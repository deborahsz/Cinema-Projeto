import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useAuth } from '@/features/auth/context/auth-context'
import { FavoritesContext } from '@/features/favorites/context/favorites-context'
import * as favoritesApi from '@/features/favorites/api/favorites.api'
import type { MovieSummary } from '@/types/movie'

const STORAGE_KEY = 'cinescope:favorites'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { status } = useAuth()
  const isAuthenticated = status === 'authenticated'

  // Favoritos de visitantes (não logados) ficam apenas no localStorage.
  const [guestFavorites, setGuestFavorites] = useLocalStorage<MovieSummary[]>(STORAGE_KEY, [])
  // Favoritos de usuários logados vêm do banco (fonte da verdade).
  const [serverFavorites, setServerFavorites] = useState<MovieSummary[]>([])

  const favorites = isAuthenticated ? serverFavorites : guestFavorites

  // Ao autenticar: busca os favoritos do banco e migra os do visitante que
  // ainda não estejam salvos, depois limpa o armazenamento local de visitante.
  // Quando deslogado, a lista exibida volta a ser a do visitante (guestFavorites),
  // então não é necessário limpar serverFavorites aqui.
  useEffect(() => {
    if (!isAuthenticated) return

    let isCancelled = false

    async function syncFavorites() {
      try {
        const remote = await favoritesApi.fetchFavorites()
        const remoteIds = new Set(remote.map((movie) => movie.id))
        const toMigrate = guestFavorites.filter((movie) => !remoteIds.has(movie.id))

        const migrated = await Promise.all(
          toMigrate.map((movie) => favoritesApi.addFavorite(movie)),
        )

        if (isCancelled) return

        setServerFavorites([...migrated, ...remote])
        if (toMigrate.length > 0) setGuestFavorites([])
      } catch (error) {
        console.error('[favorites] Falha ao sincronizar favoritos:', error)
      }
    }

    syncFavorites()

    return () => {
      isCancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sincroniza apenas na transição de autenticação
  }, [isAuthenticated])

  const isFavorite = useCallback(
    (id: number) => favorites.some((movie) => movie.id === id),
    [favorites],
  )

  const setFavorites = isAuthenticated ? setServerFavorites : setGuestFavorites

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => prev.filter((movie) => movie.id !== id))
      if (isAuthenticated) {
        favoritesApi.removeFavorite(id).catch((error) => {
          console.error('[favorites] Falha ao remover favorito:', error)
        })
      }
    },
    [setFavorites, isAuthenticated],
  )

  /** Alterna o favorito e retorna `true` se o filme passou a ser favorito. */
  const toggleFavorite = useCallback(
    (movie: MovieSummary) => {
      const alreadyFavorite = favorites.some((item) => item.id === movie.id)

      setFavorites((prev) =>
        alreadyFavorite ? prev.filter((item) => item.id !== movie.id) : [movie, ...prev],
      )

      if (isAuthenticated) {
        const request = alreadyFavorite
          ? favoritesApi.removeFavorite(movie.id)
          : favoritesApi.addFavorite(movie)

        request.catch((error) => {
          console.error('[favorites] Falha ao atualizar favorito:', error)
        })
      }

      return !alreadyFavorite
    },
    [favorites, setFavorites, isAuthenticated],
  )

  const clearFavorites = useCallback(() => {
    const current = favorites
    setFavorites([])

    if (isAuthenticated) {
      Promise.all(current.map((movie) => favoritesApi.removeFavorite(movie.id))).catch((error) => {
        console.error('[favorites] Falha ao limpar favoritos:', error)
      })
    }
  }, [favorites, setFavorites, isAuthenticated])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
