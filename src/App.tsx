function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="rounded-full border border-border bg-surface px-4 py-1 text-xs font-medium tracking-wide text-muted uppercase">
        Etapa 3 · Tailwind CSS
      </span>
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Cine<span className="text-primary">Scope</span>
      </h1>
      <p className="max-w-md text-muted">
        Base visual em tema escuro configurada. As próximas etapas vão trazer o roteamento, a
        integração com o TMDB e a interface completa.
      </p>
    </main>
  )
}

export default App
