import { PrismaClient } from '@prisma/client'
import { env } from '../config/env'

/**
 * Instância única do Prisma Client, compartilhada por toda a aplicação.
 * Evita esgotar o pool de conexões do Postgres com múltiplas instâncias.
 */
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
})
