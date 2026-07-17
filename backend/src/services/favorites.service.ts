import { prisma } from '../lib/prisma'
import type { CreateFavoriteInput } from '../schemas/favorite.schema'

/** Formato de favorito devolvido ao cliente (sem campos internos do banco). */
function toFavoriteDTO(favorite: {
  movieId: number
  title: string
  posterPath: string | null
  voteAverage: number
  releaseDate: string | null
}) {
  return {
    id: favorite.movieId,
    title: favorite.title,
    poster_path: favorite.posterPath,
    vote_average: favorite.voteAverage,
    release_date: favorite.releaseDate ?? '',
  }
}

export async function listFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return favorites.map(toFavoriteDTO)
}

export async function addFavorite(userId: string, input: CreateFavoriteInput) {
  const favorite = await prisma.favorite.upsert({
    where: { userId_movieId: { userId, movieId: input.movieId } },
    create: {
      userId,
      movieId: input.movieId,
      title: input.title,
      posterPath: input.posterPath ?? null,
      voteAverage: input.voteAverage,
      releaseDate: input.releaseDate ?? null,
    },
    update: {
      title: input.title,
      posterPath: input.posterPath ?? null,
      voteAverage: input.voteAverage,
      releaseDate: input.releaseDate ?? null,
    },
  })

  return toFavoriteDTO(favorite)
}

export async function removeFavorite(userId: string, movieId: number) {
  await prisma.favorite.deleteMany({ where: { userId, movieId } })
}
