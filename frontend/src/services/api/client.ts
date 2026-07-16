import axios from 'axios'
import { AUTH_TOKEN_STORAGE_KEY } from '@/features/auth/constants'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

/**
 * Cliente para a nossa própria API (backend Express), diferente do
 * `tmdbClient` que fala com a TMDB. Injeta o token JWT automaticamente
 * quando o usuário está autenticado.
 */
export const apiClient = axios.create({ baseURL: API_BASE_URL })

apiClient.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  const token = rawToken ? (JSON.parse(rawToken) as string) : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
