import { tmdbClient } from '@/services/tmdb/client'
import type {
  DiscoverMoviesParams,
  Genre,
  Movie,
  MovieCredits,
  MovieDetails,
  MovieVideo,
  PaginatedResponse,
  TrendingTimeWindow,
} from '@/types/movie'

export async function getTrendingMovies(timeWindow: TrendingTimeWindow = 'week') {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`)
  return data
}

export async function getPopularMovies(page = 1) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/popular', {
    params: { page },
  })
  return data
}

export async function getTopRatedMovies(page = 1) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/top_rated', {
    params: { page },
  })
  return data
}

export async function getNowPlayingMovies(page = 1) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/now_playing', {
    params: { page },
  })
  return data
}

export async function getUpcomingMovies(page = 1) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>('/movie/upcoming', {
    params: { page },
  })
  return data
}

export async function getGenres() {
  const { data } = await tmdbClient.get<{ genres: Genre[] }>('/genre/movie/list')
  return data.genres
}

export async function getMovieDetails(id: number | string) {
  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`)
  return data
}

export async function getMovieCredits(id: number | string) {
  const { data } = await tmdbClient.get<MovieCredits>(`/movie/${id}/credits`)
  return data
}

export async function getMovieVideos(id: number | string) {
  const { data } = await tmdbClient.get<{ results: MovieVideo[] }>(`/movie/${id}/videos`)
  return data.results
}

export async function getMovieRecommendations(id: number | string, page = 1) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>(`/movie/${id}/recommendations`, {
    params: { page },
  })
  return data
}

export async function getDiscoverMovies({
  page = 1,
  genreId,
  sortBy = 'popularity.desc',
  year,
}: DiscoverMoviesParams) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>('/discover/movie', {
    params: {
      page,
      sort_by: sortBy,
      include_adult: false,
      'vote_count.gte': sortBy === 'vote_average.desc' ? 200 : undefined,
      with_genres: genreId ?? undefined,
      primary_release_year: year ?? undefined,
    },
  })
  return data
}

export async function searchMovies(query: string, page = 1) {
  const { data } = await tmdbClient.get<PaginatedResponse<Movie>>('/search/movie', {
    params: { query, page },
  })
  return data
}
