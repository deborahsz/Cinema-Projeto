import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env'
import { healthRouter } from './routes/health.route'
import { authRouter } from './routes/auth.route'
import { favoritesRouter } from './routes/favorites.route'
import { ratingsRouter } from './routes/ratings.route'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(express.json())
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))

app.use(healthRouter)
app.use(authRouter)
app.use(favoritesRouter)
app.use(ratingsRouter)

app.use(notFoundHandler)
app.use(errorHandler)
