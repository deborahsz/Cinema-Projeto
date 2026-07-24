import type { Request, Response } from 'express'
import { createFavoriteSchema } from '../schemas/favorite.schema'
import { addFavorite, listFavorites, removeFavorite } from '../services/favorites.service'
import { AppError } from '../errors/AppError'

export async function index(req: Request, res: Response) {
  const favorites = await listFavorites(req.userId!)
  res.status(200).json(favorites)
}

export async function create(req: Request, res: Response) {
  const input = createFavoriteSchema.parse(req.body)
  const favorite = await addFavorite(req.userId!, input)
  res.status(201).json(favorite)
}

export async function destroy(req: Request, res: Response) {
  const movieId = Number(req.params.movieId)

  if (!Number.isInteger(movieId) || movieId <= 0) {
    throw new AppError('Id de filme inválido.', 400)
  }

  await removeFavorite(req.userId!, movieId)
  res.status(204).send()
}
