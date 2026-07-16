import { QueryClient } from '@tanstack/react-query'

/**
 * Configuração central do cache do TanStack Query.
 *
 * - `staleTime` alto: dados de catálogo de filmes não mudam a cada segundo,
 *   então evitamos refetches desnecessários ao trocar de aba/janela.
 * - `retry: 1`: uma tentativa extra em caso de falha de rede, sem martelar a API.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
