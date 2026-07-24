import { useInfiniteQuery } from '@tanstack/react-query'
import { movieKeys } from '@/services/tmdb/queryKeys'
import { getDiscoverMovies } from '@/services/tmdb/movies'
import type { DiscoverMoviesParams } from '@/types/movie'

const TMDB_MAX_PAGES = 500

/**
 * Lista paginada de filmes do endpoint /discover com suporte a scroll infinito.
 * Os filtros (gênero, ordenação, ano) fazem parte da query key, então mudá-los
 * reinicia a paginação automaticamente.
 */
export function useDiscoverMovies(filters: Omit<DiscoverMoviesParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: movieKeys.discover(filters),
    queryFn: ({ pageParam }) => getDiscoverMovies({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1
      const maxPage = Math.min(lastPage.total_pages, TMDB_MAX_PAGES)
      return nextPage <= maxPage ? nextPage : undefined
    },
  })
}
