import { z } from 'zod'

export const upsertRatingSchema = z.object({
  movieId: z.number().int().positive(),
  score: z.number().int().min(1, 'Nota mínima é 1.').max(10, 'Nota máxima é 10.'),
  comment: z.string().trim().max(500, 'Comentário muito longo.').nullable().optional(),
})

export type UpsertRatingInput = z.infer<typeof upsertRatingSchema>
