import { LogOut, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuth } from '@/features/auth/context/auth-context'

export function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader title="Perfil" description="Suas informações e preferências." />

      <div className="glass mt-6 flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:flex-row sm:text-left">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound className="size-8" aria-hidden="true" />
        </div>

        <div className="flex-1">
          <p className="font-display text-xl font-semibold text-foreground">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        <Button variant="outline" onClick={logout} className="gap-2">
          <LogOut className="size-4" aria-hidden="true" />
          Sair
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Estatísticas e avaliações do usuário — em breve.
      </p>
    </div>
  )
}
