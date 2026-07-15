import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="rounded-full border border-border bg-card px-4 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Etapa 4 · Shadcn/UI
      </span>

      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Cine<span className="text-primary">Scope</span>
      </h1>

      <p className="max-w-md text-muted-foreground">
        Componentes do shadcn/ui integrados ao nosso tema escuro, com a cor de marca e a tipografia
        definidas na Etapa 3.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Assistir agora</Button>
        <Button variant="secondary">Adicionar aos favoritos</Button>
        <Button variant="outline">Ver detalhes</Button>
        <Button variant="ghost">Compartilhar</Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Ação</Badge>
        <Badge variant="secondary">Ficção Científica</Badge>
        <Badge variant="outline" className="gap-1">
          <Star className="fill-rating text-rating" />
          8.7
        </Badge>
        <Badge variant="destructive">+18</Badge>
      </div>
    </main>
  )
}

export default App
