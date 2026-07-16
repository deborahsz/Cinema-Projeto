import { z } from 'zod'
import 'dotenv/config'

/**
 * Valida e tipa as variáveis de ambiente na inicialização. Se algo estiver
 * faltando ou mal formatado, o servidor falha rápido (fail-fast) com uma
 * mensagem clara, em vez de quebrar de forma obscura em tempo de execução.
 */
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  PORT: z.coerce.number().int().positive().default(3333),
  CORS_ORIGIN: z.string().min(1).default('http://localhost:5173'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET deve ter pelo menos 16 caracteres'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('[env] Variáveis de ambiente inválidas:')
  console.error(parsed.error.format())
  process.exit(1)
}

export const env = parsed.data
