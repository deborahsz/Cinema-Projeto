import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/paths'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchBarProps {
  className?: string
  autoFocus?: boolean
  /** Chamado após uma navegação de busca (ex.: para fechar o menu mobile). */
  onSearch?: () => void
}

/**
 * Campo de busca reutilizável. Enquanto o usuário digita, navega (com debounce)
 * para a página de resultados, oferecendo busca em tempo real a partir de
 * qualquer tela. O Enter força a navegação imediata.
 */
export function SearchBar({ className, autoFocus, onSearch }: SearchBarProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState(() => searchParams.get('q') ?? '')
  const debouncedValue = useDebounce(value, 350)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const query = debouncedValue.trim()
    if (!query) return

    navigate(`${paths.search}?q=${encodeURIComponent(query)}`)
    onSearch?.()
  }, [debouncedValue, navigate, onSearch])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = value.trim()
    if (!query) return

    navigate(`${paths.search}?q=${encodeURIComponent(query)}`)
    onSearch?.()
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={cn('relative', className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        autoFocus={autoFocus}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar filmes..."
        className="pl-9"
        aria-label="Buscar filmes"
      />
    </form>
  )
}
