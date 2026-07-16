import type { TrendingTimeWindow } from '@/types/movie'

/**
 * Factory de query keys do TanStack Query. Centralizar aqui evita chaves
 * inconsistentes (ex: um hook usando ['movies','popular'] e outro ['popular-movies'])
 * e facilita invalidar caches relacionados de uma vez.
 */
export const movieKeys = {
  all: ['movies'] as const,
  trending: (timeWindow: TrendingTimeWindow) => [...movieKeys.all, 'trending', timeWindow] as const,
  popular: (page: number) => [...movieKeys.all, 'popular', page] as const,
  topRated: (page: number) => [...movieKeys.all, 'top-rated', page] as const,
  nowPlaying: (page: number) => [...movieKeys.all, 'now-playing', page] as const,
  upcoming: (page: number) => [...movieKeys.all, 'upcoming', page] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
  details: (id: number | string) => [...movieKeys.all, 'details', id] as const,
  credits: (id: number | string) => [...movieKeys.all, 'credits', id] as const,
  videos: (id: number | string) => [...movieKeys.all, 'videos', id] as const,
  recommendations: (id: number | string, page: number) =>
    [...movieKeys.all, 'recommendations', id, page] as const,
  search: (query: string, page: number) => [...movieKeys.all, 'search', query, page] as const,
}
