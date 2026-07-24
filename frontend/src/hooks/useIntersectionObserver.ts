import { useEffect, useRef } from 'react'

interface UseIntersectionObserverOptions {
  onIntersect: () => void
  enabled?: boolean
  rootMargin?: string
}

/**
 * Dispara `onIntersect` quando o elemento observado entra na viewport.
 * Ideal para gatilhos de scroll infinito (elemento "sentinela" no fim da lista).
 */
export function useIntersectionObserver<T extends HTMLElement>({
  onIntersect,
  enabled = true,
  rootMargin = '400px',
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<T | null>(null)
  const callbackRef = useRef(onIntersect)

  useEffect(() => {
    callbackRef.current = onIntersect
  }, [onIntersect])

  useEffect(() => {
    const element = targetRef.current
    if (!element || !enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callbackRef.current()
        }
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled, rootMargin])

  return targetRef
}
