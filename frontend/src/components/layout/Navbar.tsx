import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SearchBar } from '@/features/search/components/SearchBar'
import { Logo } from '@/components/layout/Logo'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/paths'
import { useScrolled } from '@/hooks/useScrolled'
import { useAuth } from '@/features/auth/context/auth-context'

const navLinks = [
  { label: 'Início', to: paths.home },
  { label: 'Filmes', to: paths.movies },
  { label: 'Favoritos', to: paths.favorites },
  { label: 'Sobre', to: paths.about },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Navbar() {
  const scrolled = useScrolled()
  const { pathname } = useLocation()
  const isSearchPage = pathname === paths.search
  const { user, status, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate(paths.home)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-background/90 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Logo onClick={scrollToTop} />

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={scrollToTop}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                    'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:after:scale-x-100',
                    isActive && 'text-foreground after:scale-x-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {!isSearchPage && <SearchBar className="hidden w-56 sm:block" />}

          {status === 'authenticated' ? (
            <div className="hidden items-center gap-1 sm:flex">
              <Button variant="ghost" size="icon" asChild aria-label={`Perfil de ${user?.name}`}>
                <Link to={paths.profile}>
                  <UserRound />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Sair" onClick={handleLogout}>
                <LogOut />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to={paths.login}>Entrar</Link>
            </Button>
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { user, status, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setOpen(false)
    navigate(paths.home)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetTitle className="font-display px-4 pt-4 text-lg">
          Cine<span className="text-primary">Scope</span>
        </SheetTitle>
        <div className="flex flex-col gap-1 p-4">
          <SearchBar className="mb-4 w-full" onSearch={() => setOpen(false)} />
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                  isActive && 'bg-secondary text-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Separator className="my-2" />

          {status === 'authenticated' ? (
            <>
              <NavLink
                to={paths.profile}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                    isActive && 'bg-secondary text-foreground',
                  )
                }
              >
                {user?.name ?? 'Perfil'}
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={paths.login}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Entrar
              </NavLink>
              <NavLink
                to={paths.register}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Cadastrar
              </NavLink>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
