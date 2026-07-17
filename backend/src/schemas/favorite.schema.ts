import { z } from 'zod'

export const createFavoriteSchema = z.object({
  movieId: z.number().int().positive(),
  title: z.string().min(1),
  posterPath: z.string().nullable().optional(),
  voteAverage: z.number().default(0),
  releaseDate: z.string().nullable().optional(),
})

export type CreateFavoriteInput = z.infer<typeof createFavoriteSchema>
