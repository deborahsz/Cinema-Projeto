import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { AUTH_TOKEN_STORAGE_KEY } from '@/features/auth/constants'
import { getCurrentUser, loginUser, registerUser } from '@/features/auth/api/auth.api'
import { AuthContext, type AuthStatus } from '@/features/auth/context/auth-context'
import type { AuthUser } from '@/features/auth/types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage<string | null>(AUTH_TOKEN_STORAGE_KEY, null)
  const [user, setUser] = useState<AuthUser | null>(null)
  /** Só é falso enquanto aguardamos a validação do token salvo contra a API. */
  const [hasHydrated, setHasHydrated] = useState(!token)

  useEffect(() => {
    if (!token) return

    let isCancelled = false

    getCurrentUser()
      .then((currentUser) => {
        if (isCancelled) return
        setUser(currentUser)
        setHasHydrated(true)
      })
      .catch(() => {
        if (isCancelled) return
        setToken(null)
        setUser(null)
        setHasHydrated(true)
      })

    return () => {
      isCancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só deve re-executar quando o token mudar
  }, [token])

  const status = useMemo<AuthStatus>(() => {
    if (!token) return 'unauthenticated'
    if (!hasHydrated) return 'loading'
    return user ? 'authenticated' : 'unauthenticated'
  }, [token, hasHydrated, user])

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginUser({ email, password })
      setUser(result.user)
      setHasHydrated(true)
      setToken(result.token)
    },
    [setToken],
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await registerUser({ name, email, password })
      setUser(result.user)
      setHasHydrated(true)
      setToken(result.token)
    },
    [setToken],
  )

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setHasHydrated(true)
  }, [setToken])

  const value = useMemo(
    () => ({ user, status, login, register, logout }),
    [user, status, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
