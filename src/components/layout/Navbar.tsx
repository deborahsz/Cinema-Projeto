import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SearchBar } from '@/features/search/components/SearchBar'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/paths'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'Início', to: paths.home },
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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-lg'
          : 'border-b border-transparent bg-gradient-to-b from-background/80 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            to={paths.home}
            onClick={scrollToTop}
            className="font-display text-xl font-bold text-foreground"
          >
            Cine<span className="text-primary">Scope</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={scrollToTop}
                className={({ isActive }) =>
                  cn(
                    'rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                    isActive && 'text-foreground',
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

          <Button variant="ghost" size="icon" asChild aria-label="Perfil">
            <Link to={paths.profile}>
              <UserRound />
            </Link>
          </Button>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)

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
        </div>
      </SheetContent>
    </Sheet>
  )
}
