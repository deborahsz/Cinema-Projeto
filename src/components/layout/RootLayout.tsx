import { Outlet, useNavigation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageLoader } from '@/components/layout/PageLoader'
import { useScrollToTopOnNavigate } from '@/hooks/useScrollToTopOnNavigate'

export function RootLayout() {
  useScrollToTopOnNavigate()
  const navigation = useNavigation()
  const isLoadingRoute = navigation.state === 'loading'

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{isLoadingRoute ? <PageLoader /> : <Outlet />}</main>
      <Footer />
    </div>
  )
}
