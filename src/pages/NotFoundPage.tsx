import { Link } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { paths } from '@/routes/paths'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center gap-4 px-4 text-center">
      <Clapperboard className="size-12 text-muted-foreground" aria-hidden="true" />
      <span className="font-display text-7xl font-bold text-foreground sm:text-8xl">404</span>
      <h1 className="text-xl font-semibold text-foreground">Essa cena não existe</h1>
      <p className="max-w-sm text-muted-foreground">
        A página que você procura foi cortada da edição final. Que tal voltar para a sessão
        principal?
      </p>
      <Button asChild>
        <Link to={paths.home}>Voltar para a Home</Link>
      </Button>
    </div>
  )
}
