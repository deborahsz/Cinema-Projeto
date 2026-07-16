import { Router } from 'express'
import { prisma } from '../lib/prisma'

export const healthRouter = Router()

/**
 * Endpoint de diagnóstico: confirma que a API está no ar e que a conexão
 * com o banco de dados está funcionando (útil para checar o setup local e
 * para health-checks em produção).
 */
healthRouter.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', database: 'connected' })
  } catch (error) {
    console.error('[health] Falha ao conectar ao banco de dados:', error)
    res.status(503).json({ status: 'error', database: 'disconnected' })
  }
})
