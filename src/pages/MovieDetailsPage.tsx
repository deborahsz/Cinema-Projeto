import { useParams } from 'react-router-dom'

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-2 px-4 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Detalhes do filme</h1>
      <p className="text-muted-foreground">ID do filme: {id}</p>
    </div>
  )
}
