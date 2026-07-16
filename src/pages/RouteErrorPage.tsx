import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotFoundPage } from '@/pages/NotFoundPage'

/**
 * Renderizado pelo React Router quando uma rota lança um erro (ex.: falha ao
 * carregar um chunk lazy). Erros 404 reaproveitam a página de "não encontrado".
 */
export function RouteErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  console.error('[RouteError]', error)

  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="size-12 text-destructive" aria-hidden="true" />
      <h1 className="font-display text-2xl font-bold text-foreground">Não foi possível carregar</h1>
      <p className="max-w-sm text-muted-foreground">
        Tivemos um problema ao carregar esta página. Recarregue para tentar novamente.
      </p>
      <Button onClick={() => window.location.reload()}>Recarregar página</Button>
    </div>
  )
}
