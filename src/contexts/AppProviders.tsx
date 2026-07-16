import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/queryClient'
import { FavoritesProvider } from '@/features/favorites/context/FavoritesContext'
import { Toaster } from '@/components/ui/sonner'

/**
 * Ponto único para todos os provedores globais da aplicação
 * (React Query, favoritos e notificações). Novos contextos entram aqui.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        {children}
        <Toaster position="bottom-right" richColors />
      </FavoritesProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
