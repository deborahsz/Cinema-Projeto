export function FavoritesPage() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-2 px-4 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Favoritos</h1>
      <p className="text-muted-foreground">
        Seus filmes favoritos (salvos no LocalStorage) vão aparecer aqui.
      </p>
    </div>
  )
}
