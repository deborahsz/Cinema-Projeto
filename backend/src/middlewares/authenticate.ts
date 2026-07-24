import type { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../utils/jwt'
import { AppError } from '../errors/AppError'

/**
 * Middleware de autenticação: exige um header `Authorization: Bearer <token>`
 * válido e injeta o id do usuário autenticado em `req.userId`.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Token de autenticação não informado.', 401)
  }

  const token = authHeader.slice('Bearer '.length)

  try {
    const payload = verifyAccessToken(token)
    req.userId = payload.sub
    next()
  } catch {
    throw new AppError('Token de autenticação inválido ou expirado.', 401)
  }
}
