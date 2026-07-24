import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { AppError } from '../errors/AppError'
import { signAccessToken } from '../utils/jwt'
import type { RegisterInput, LoginInput } from '../schemas/auth.schema'

const SALT_ROUNDS = 12

export interface AuthResult {
  user: { id: string; name: string; email: string }
  token: string
}

function toPublicUser(user: { id: string; name: string; email: string }) {
  return { id: user.id, name: user.name, email: user.email }
}

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const existingUser = await prisma.user.findUnique({ where: { email: input.email } })

  if (existingUser) {
    throw new AppError('Este e-mail já está cadastrado.', 409)
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS)

  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash },
  })

  const token = signAccessToken({ sub: user.id })

  return { user: toPublicUser(user), token }
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const user = await prisma.user.findUnique({ where: { email: input.email } })

  if (!user) {
    throw new AppError('E-mail ou senha inválidos.', 401)
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash)

  if (!isPasswordValid) {
    throw new AppError('E-mail ou senha inválidos.', 401)
  }

  const token = signAccessToken({ sub: user.id })

  return { user: toPublicUser(user), token }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new AppError('Usuário não encontrado.', 404)
  }

  return toPublicUser(user)
}
