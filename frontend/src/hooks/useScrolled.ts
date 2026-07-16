import { useEffect, useState } from 'react'

/**
 * Retorna `true` quando a página foi rolada além de `threshold` pixels.
 * Usado para alternar o visual da Navbar entre transparente e sólida.
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
