export interface Rating {
  movieId: number
  title: string
  posterPath: string | null
  score: number
  comment: string | null
  updatedAt: string
}

export interface UpsertRatingPayload {
  movieId: number
  title: string
  posterPath?: string | null
  score: number
  comment?: string | null
}
