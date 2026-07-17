import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/auth/context/auth-context'
import { ratingKeys } from '@/features/ratings/queryKeys'
import { fetchRating, removeRating, upsertRating } from '@/features/ratings/api/ratings.api'
import type { Rating, UpsertRatingPayload } from '@/features/ratings/types'

/** Busca a avaliação do usuário logado para um filme específico. */
export function useMovieRating(movieId: number) {
  const { status } = useAuth()

  return useQuery({
    queryKey: ratingKeys.detail(movieId),
    queryFn: () => fetchRating(movieId),
    enabled: status === 'authenticated' && Boolean(movieId),
  })
}

export function useUpsertRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpsertRatingPayload) => upsertRating(payload),
    onSuccess: (rating: Rating) => {
      queryClient.setQueryData(ratingKeys.detail(rating.movieId), rating)
      queryClient.invalidateQueries({ queryKey: ratingKeys.list() })
    },
  })
}

export function useRemoveRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (movieId: number) => removeRating(movieId),
    onSuccess: (_data, movieId) => {
      queryClient.setQueryData(ratingKeys.detail(movieId), null)
      queryClient.invalidateQueries({ queryKey: ratingKeys.list() })
    },
  })
}
