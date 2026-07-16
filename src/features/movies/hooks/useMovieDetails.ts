import { useQuery } from '@tanstack/react-query'
import { movieKeys } from '@/services/tmdb/queryKeys'
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getMovieVideos,
} from '@/services/tmdb/movies'

export function useMovieDetails(id: number | string) {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: () => getMovieDetails(id),
    enabled: Boolean(id),
  })
}

export function useMovieCredits(id: number | string) {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => getMovieCredits(id),
    enabled: Boolean(id),
  })
}

export function useMovieVideos(id: number | string) {
  return useQuery({
    queryKey: movieKeys.videos(id),
    queryFn: () => getMovieVideos(id),
    enabled: Boolean(id),
  })
}

export function useMovieRecommendations(id: number | string, page = 1) {
  return useQuery({
    queryKey: movieKeys.recommendations(id, page),
    queryFn: () => getMovieRecommendations(id, page),
    enabled: Boolean(id),
  })
}
