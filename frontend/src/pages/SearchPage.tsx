import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SearchX } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { MovieGrid } from '@/features/movies/components/MovieGrid'
import { PageHeader } from '@/components/layout/PageHeader'
import { useSearchMovies } from '@/features/movies/hooks/useMovies'
import { useDebounce } from '@/hooks/useDebounce'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [term, setTerm] = useState(() => searchParams.get('q') ?? '')
  const debouncedTerm = useDebounce(term, 400)
  const trimmedTerm = debouncedTerm.trim()

  useEffect(() => {
    const currentQuery = searchParams.get('q') ?? ''
    if (trimmedTerm === currentQuery) return

    setSearchParams(trimmedTerm ? { q: trimmedTerm } : {}, { replace: true })
  }, [trimmedTerm, searchParams, setSearchParams])

  const { data, isFetching, isError } = useSearchMovies(trimmedTerm)
  const results = data?.results ?? []
  const hasQuery = trimmedTerm.length > 0
  const isSearching = hasQuery && isFetching && results.length === 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader title="Buscar filmes" description="Encontre qualquer filme do acervo do TMDB." />

      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Digite o nome de um filme..."
          className="h-11 pl-9 text-base"
          aria-label="Buscar filmes"
        />
      </div>

      <div className="mt-8">
        {isError ? (
          <p className="text-sm text-destructive">
            Não foi possível realizar a busca. Tente novamente.
          </p>
        ) : !hasQuery ? (
          <EmptyState
            icon={<Search className="size-10 text-muted-foreground" />}
            message="Comece a digitar para encontrar filmes."
          />
        ) : isSearching ? (
          <MovieGrid isLoading />
        ) : results.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {data?.total_results.toLocaleString('pt-BR')} resultado(s) para{' '}
              <span className="font-medium text-foreground">&quot;{trimmedTerm}&quot;</span>
            </p>
            <MovieGrid movies={results} />
          </>
        ) : (
          <EmptyState
            icon={<SearchX className="size-10 text-muted-foreground" />}
            message={`Nenhum filme encontrado para "${trimmedTerm}".`}
          />
        )}
      </div>
    </div>
  )
}

interface EmptyStateProps {
  icon: React.ReactNode
  message: string
}

function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      {icon}
      <p className="text-muted-foreground">{message}</p>
    </div>
  )
}
