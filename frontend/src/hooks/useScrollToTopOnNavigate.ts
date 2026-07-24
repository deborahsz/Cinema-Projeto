import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Rola a página para o topo sempre que a rota muda, evitando que o usuário
 * "herde" a posição de scroll da página anterior ao navegar.
 */
export function useScrollToTopOnNavigate() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}
