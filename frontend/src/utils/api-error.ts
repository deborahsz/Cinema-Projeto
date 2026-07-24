import { isAxiosError } from 'axios'

interface ApiErrorBody {
  message?: string
}

/** Extrai uma mensagem amigável de erros vindos da nossa API (backend). */
export function getApiErrorMessage(error: unknown, fallback = 'Algo deu errado. Tente novamente.') {
  if (isAxiosError<ApiErrorBody>(error) && error.response?.data?.message) {
    return error.response.data.message
  }

  return fallback
}
