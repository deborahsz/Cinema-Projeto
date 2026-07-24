import type { Request, Response } from 'express'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import { registerUser, loginUser, getUserById } from '../services/auth.service'

/**
 * Os handlers são `async` e podem lançar erros livremente: o Express 5
 * encaminha automaticamente promises rejeitadas para o middleware de erro.
 */
export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body)
  const result = await registerUser(input)
  res.status(201).json(result)
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body)
  const result = await loginUser(input)
  res.status(200).json(result)
}

export async function me(req: Request, res: Response) {
  const user = await getUserById(req.userId!)
  res.status(200).json({ user })
}
