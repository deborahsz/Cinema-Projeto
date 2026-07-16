import { GithubIcon, LinkedinIcon } from '@/components/icons/brand-icons'
import { Logo } from '@/components/layout/Logo'

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: LinkedinIcon },
]

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border/80 bg-background/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Catálogo de filmes criado como projeto de portfólio, com dados fornecidos pelo TMDB.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} CineScope. Projeto sem fins comerciais.</p>
          <p>Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
        </div>
      </div>
    </footer>
  )
}
