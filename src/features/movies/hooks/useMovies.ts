import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { movieKeys } from '@/services/tmdb/queryKeys'
import {
  getGenres,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  searchMovies,
} from '@/services/tmdb/movies'
import type { TrendingTimeWindow } from '@/types/movie'

export function useTrendingMovies(timeWindow: TrendingTimeWindow = 'week') {
  return useQuery({
    queryKey: movieKeys.trending(timeWindow),
    queryFn: () => getTrendingMovies(timeWindow),
  })
}

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => getPopularMovies(page),
  })
}

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => getTopRatedMovies(page),
  })
}

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => getNowPlayingMovies(page),
  })
}

export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => getUpcomingMovies(page),
  })
}

export function useGenres() {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60,
  })
}

export function useSearchMovies(query: string, page = 1) {
  const trimmed = query.trim()

  return useQuery({
    queryKey: movieKeys.search(trimmed, page),
    queryFn: () => searchMovies(trimmed, page),
    enabled: trimmed.length > 0,
    placeholderData: keepPreviousData,
  })
}
