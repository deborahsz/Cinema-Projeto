import { useCallback, useEffect, useState } from 'react'

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback

  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback
  } catch (error) {
    console.warn(`[useLocalStorage] Falha ao ler a chave "${key}":`, error)
    return fallback
  }
}

/**
 * Estado sincronizado com o LocalStorage. Reflete alterações feitas em outras
 * abas (via evento `storage`) e serializa o valor automaticamente.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => readValue(key, initialValue))

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value

        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue))
        } catch (error) {
          console.warn(`[useLocalStorage] Falha ao gravar a chave "${key}":`, error)
        }

        return nextValue
      })
    },
    [key],
  )

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === key) {
        setStoredValue(readValue(key, initialValue))
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key, initialValue])

  return [storedValue, setValue] as const
}
