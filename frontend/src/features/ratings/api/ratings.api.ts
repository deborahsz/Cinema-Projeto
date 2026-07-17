import { apiClient } from '@/services/api/client'
import type { Rating, UpsertRatingPayload } from '@/features/ratings/types'

export async function fetchRatings() {
  const { data } = await apiClient.get<Rating[]>('/ratings')
  return data
}

export async function fetchRating(movieId: number) {
  const { data } = await apiClient.get<Rating | null>(`/ratings/${movieId}`)
  return data
}

export async function upsertRating(payload: UpsertRatingPayload) {
  const { data } = await apiClient.put<Rating>('/ratings', payload)
  return data
}

export async function removeRating(movieId: number) {
  await apiClient.delete(`/ratings/${movieId}`)
}
