import { Router } from 'express'
import { authenticate } from '../middlewares/authenticate'
import { index, show, upsert, destroy } from '../controllers/ratings.controller'

export const ratingsRouter = Router()

// Todas as rotas de avaliações exigem autenticação.
ratingsRouter.use(authenticate)

ratingsRouter.get('/ratings', index)
ratingsRouter.get('/ratings/:movieId', show)
ratingsRouter.put('/ratings', upsert)
ratingsRouter.delete('/ratings/:movieId', destroy)
