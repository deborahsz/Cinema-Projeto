import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/auth-context'
import { PageLoader } from '@/components/layout/PageLoader'
import { paths } from '@/routes/paths'

/**
 * Bloqueia o acesso de usuários não autenticados, redirecionando para o
 * login e preservando a rota de origem em `state.from` para retorno após
 * autenticar.
 */
export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <PageLoader />
  }

  if (status === 'unauthenticated') {
    return <Navigate to={paths.login} state={{ from: location }} replace />
  }

  return <Outlet />
}
