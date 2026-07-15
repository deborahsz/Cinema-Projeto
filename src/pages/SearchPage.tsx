import { useSearchParams } from 'react-router-dom'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-2 px-4 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Pesquisa</h1>
      <p className="text-muted-foreground">
        {query ? `Resultados para "${query}"` : 'Digite algo na busca acima.'}
      </p>
    </div>
  )
}
