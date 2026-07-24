import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Heart, LogOut, Star, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAuth } from '@/features/auth/context/auth-context'
import { useFavorites } from '@/features/favorites/context/favorites-context'
import { RatingListItem } from '@/features/ratings/components/RatingListItem'
import { useUserRatings } from '@/features/ratings/hooks/useMovieRating'
import { paths } from '@/routes/paths'

function averageScore(scores: number[]) {
  if (scores.length === 0) return null
  const total = scores.reduce((sum, score) => sum + score, 0)
  return Math.round((total / scores.length) * 10) / 10
}

export function ProfilePage() {
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()
  const { data: ratings = [], isPending: isRatingsPending } = useUserRatings()

  const favoritesCount = favorites.length
  const ratingsCount = ratings.length
  const avgScore = averageScore(ratings.map((rating) => rating.score))

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader title="Perfil" description="Suas informações, estatísticas e avaliações." />

      <section className="glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:flex-row sm:text-left">
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
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Heart className="size-4" aria-hidden="true" />}
          label="Favoritos"
          value={String(favoritesCount)}
          href={paths.favorites}
        />
        <StatCard
          icon={<Star className="size-4" aria-hidden="true" />}
          label="Avaliações"
          value={String(ratingsCount)}
        />
        <StatCard
          icon={<Star className="size-4 fill-current" aria-hidden="true" />}
          label="Nota média"
          value={avgScore !== null ? `${avgScore}/10` : '—'}
        />
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Suas avaliações</h2>
            <p className="text-sm text-muted-foreground">
              Notas e comentários que você salvou nos filmes.
            </p>
          </div>
          {favoritesCount > 0 && (
            <Button asChild variant="ghost" size="sm">
              <Link to={paths.favorites}>Ver favoritos</Link>
            </Button>
          )}
        </div>

        {isRatingsPending ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="glass h-24 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : ratingsCount === 0 ? (
          <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-12 text-center">
            <Star className="size-10 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="font-medium text-foreground">Nenhuma avaliação ainda</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Abra um filme e use a seção &quot;Sua avaliação&quot; para guardar suas notas.
              </p>
            </div>
            <Button asChild>
              <Link to={paths.movies}>Explorar filmes</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {ratings.map((rating) => (
              <li key={rating.movieId}>
                <RatingListItem rating={rating} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string
  href?: string
}

function StatCard({ icon, label, value, href }: StatCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</p>
    </>
  )

  if (href) {
    return (
      <Link to={href} className="glass block rounded-2xl p-5 transition-colors hover:bg-muted/40">
        {content}
      </Link>
    )
  }

  return <div className="glass rounded-2xl p-5">{content}</div>
}
