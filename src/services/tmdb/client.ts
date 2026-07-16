import axios from 'axios'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

if (!apiKey) {
  console.warn(
    '[TMDB] Nenhuma chave de API encontrada. Defina VITE_TMDB_API_KEY no arquivo .env (veja .env.example).',
  )
}

/**
 * O TMDB aceita dois formatos de credencial:
 * - API Read Access Token (v4): um JWT, sempre começa com "eyJ", enviado via header `Authorization: Bearer`.
 * - API Key (v3): uma string curta, enviada via query param `api_key`.
 * Detectamos automaticamente qual foi fornecida para simplificar a configuração.
 */
const isV4Token = apiKey?.startsWith('eyJ')

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: isV4Token ? { Authorization: `Bearer ${apiKey}` } : undefined,
  params: {
    language: 'pt-BR',
    ...(isV4Token ? {} : { api_key: apiKey }),
  },
})
