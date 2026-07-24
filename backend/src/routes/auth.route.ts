import { Router } from 'express'
import { register, login, me } from '../controllers/auth.controller'
import { authenticate } from '../middlewares/authenticate'

export const authRouter = Router()

authRouter.post('/auth/register', register)
authRouter.post('/auth/login', login)
authRouter.get('/auth/me', authenticate, me)
