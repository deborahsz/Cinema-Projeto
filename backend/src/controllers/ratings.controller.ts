import type { Request, Response } from 'express'
import { upsertRatingSchema } from '../schemas/rating.schema'
import { getRating, listRatings, removeRating, upsertRating } from '../services/ratings.service'
import { AppError } from '../errors/AppError'

function parseMovieId(raw: unknown) {
  const movieId = Number(raw)

  if (!Number.isInteger(movieId) || movieId <= 0) {
    throw new AppError('Id de filme inválido.', 400)
  }

  return movieId
}

export async function index(req: Request, res: Response) {
  const ratings = await listRatings(req.userId!)
  res.status(200).json(ratings)
}

export async function show(req: Request, res: Response) {
  const movieId = parseMovieId(req.params.movieId)
  const rating = await getRating(req.userId!, movieId)
  res.status(200).json(rating)
}

export async function upsert(req: Request, res: Response) {
  const input = upsertRatingSchema.parse(req.body)
  const rating = await upsertRating(req.userId!, input)
  res.status(200).json(rating)
}

export async function destroy(req: Request, res: Response) {
  const movieId = parseMovieId(req.params.movieId)
  await removeRating(req.userId!, movieId)
  res.status(204).send()
}
