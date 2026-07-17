import { prisma } from '../lib/prisma'
import type { UpsertRatingInput } from '../schemas/rating.schema'

function toRatingDTO(rating: {
  movieId: number
  score: number
  comment: string | null
  updatedAt: Date
}) {
  return {
    movieId: rating.movieId,
    score: rating.score,
    comment: rating.comment,
    updatedAt: rating.updatedAt.toISOString(),
  }
}

export async function listRatings(userId: string) {
  const ratings = await prisma.rating.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  })

  return ratings.map(toRatingDTO)
}

export async function getRating(userId: string, movieId: number) {
  const rating = await prisma.rating.findUnique({
    where: { userId_movieId: { userId, movieId } },
  })

  return rating ? toRatingDTO(rating) : null
}

export async function upsertRating(userId: string, input: UpsertRatingInput) {
  const rating = await prisma.rating.upsert({
    where: { userId_movieId: { userId, movieId: input.movieId } },
    create: {
      userId,
      movieId: input.movieId,
      score: input.score,
      comment: input.comment ?? null,
    },
    update: {
      score: input.score,
      comment: input.comment ?? null,
    },
  })

  return toRatingDTO(rating)
}

export async function removeRating(userId: string, movieId: number) {
  await prisma.rating.deleteMany({ where: { userId, movieId } })
}
