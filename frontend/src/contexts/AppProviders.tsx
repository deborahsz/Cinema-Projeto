import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/queryClient'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { FavoritesProvider } from '@/features/favorites/context/FavoritesContext'
import { Toaster } from '@/components/ui/sonner'

/**
 * Ponto único para todos os provedores globais da aplicação
 * (React Query, autenticação, favoritos e notificações). Novos contextos
 * entram aqui.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </FavoritesProvider>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
