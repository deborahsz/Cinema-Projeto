import { Loader2 } from 'lucide-react'

/**
 * Fallback exibido pelo React Router enquanto o chunk lazy da rota carrega.
 */
export function PageLoader() {
  return (
    <div className="flex min-h-[60svh] w-full items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">Carregando...</span>
    </div>
  )
}
