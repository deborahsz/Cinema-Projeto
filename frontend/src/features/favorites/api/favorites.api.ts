import { apiClient } from '@/services/api/client'
import type { MovieSummary } from '@/types/movie'

export async function fetchFavorites() {
  const { data } = await apiClient.get<MovieSummary[]>('/favorites')
  return data
}

export async function addFavorite(movie: MovieSummary) {
  const { data } = await apiClient.post<MovieSummary>('/favorites', {
    movieId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
  })
  return data
}

export async function removeFavorite(movieId: number) {
  await apiClient.delete(`/favorites/${movieId}`)
}
