import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError'
import { env } from '../config/env'

/**
 * Middleware de erro global (deve ser o último registrado no Express).
 * Padroniza toda resposta de erro da API no formato { message, ...details }.
 */
export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(422).json({
      message: 'Dados inválidos.',
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  console.error('[errorHandler] Erro não tratado:', error)

  return res.status(500).json({
    message: 'Erro interno no servidor.',
    ...(env.NODE_ENV === 'development' && {
      detail: error instanceof Error ? error.message : String(error),
    }),
  })
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` })
}
