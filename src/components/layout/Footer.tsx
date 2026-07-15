import { Link } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from '@/components/icons/brand-icons'
import { paths } from '@/routes/paths'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link to={paths.home} className="font-display text-lg font-bold text-foreground">
              Cine<span className="text-primary">Scope</span>
            </Link>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Catálogo de filmes criado como projeto de portfólio, com dados fornecidos pelo TMDB.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} CineScope. Projeto sem fins comerciais.</p>
          <p>Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
        </div>
      </div>
    </footer>
  )
}
