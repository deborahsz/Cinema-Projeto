import { Router } from 'express'
import { authenticate } from '../middlewares/authenticate'
import { index, create, destroy } from '../controllers/favorites.controller'

export const favoritesRouter = Router()

// Todas as rotas de favoritos exigem autenticação.
favoritesRouter.use(authenticate)

favoritesRouter.get('/favorites', index)
favoritesRouter.post('/favorites', create)
favoritesRouter.delete('/favorites/:movieId', destroy)
