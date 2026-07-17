export interface Rating {
  movieId: number
  score: number
  comment: string | null
  updatedAt: string
}

export interface UpsertRatingPayload {
  movieId: number
  score: number
  comment?: string | null
}
