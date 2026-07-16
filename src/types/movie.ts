export interface Genre {
  id: number
  name: string
}

/** Formato retornado pelas listas do TMDB (populares, top rated, busca...) */
export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  adult: boolean
  original_language: string
}

/** Formato retornado por /movie/{id}, com dados adicionais */
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  status: string
  budget: number
  revenue: number
  homepage: string | null
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
}

export interface MovieCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface MovieVideo {
  id: string
  key: string
  name: string
  site: 'YouTube' | 'Vimeo'
  type: string
  official: boolean
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type TrendingTimeWindow = 'day' | 'week'
