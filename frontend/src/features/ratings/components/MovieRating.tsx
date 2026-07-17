import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StarRating } from '@/features/ratings/components/StarRating'
import {
  useMovieRating,
  useRemoveRating,
  useUpsertRating,
} from '@/features/ratings/hooks/useMovieRating'
import { useAuth } from '@/features/auth/context/auth-context'
import { getApiErrorMessage } from '@/utils/api-error'
import { paths } from '@/routes/paths'

interface MovieRatingProps {
  movieId: number
}

export function MovieRating({ movieId }: MovieRatingProps) {
  const { status } = useAuth()
  const { data: rating, isPending } = useMovieRating(movieId)
  const upsert = useUpsertRating()
  const remove = useRemoveRating()

  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')

  // Sincroniza o formulário com a avaliação carregada do servidor ajustando o
  // estado durante a renderização (padrão recomendado pelo React em vez de um
  // efeito): só reseta quando a avaliação vinda do servidor realmente muda.
  const [syncedRating, setSyncedRating] = useState(rating)
  if (rating !== syncedRating) {
    setSyncedRating(rating)
    setScore(rating?.score ?? 0)
    setComment(rating?.comment ?? '')
  }

  if (status !== 'authenticated') {
    return (
      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Sua avaliação</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <Link to={paths.login} className="font-medium text-primary hover:underline">
            Entre na sua conta
          </Link>{' '}
          para avaliar este filme e guardar suas notas.
        </p>
      </section>
    )
  }

  async function handleSave() {
    if (score === 0) {
      toast.error('Escolha uma nota antes de salvar.')
      return
    }

    try {
      await upsert.mutateAsync({ movieId, score, comment: comment.trim() || null })
      toast.success('Avaliação salva!')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Não foi possível salvar a avaliação.'))
    }
  }

  async function handleRemove() {
    try {
      await remove.mutateAsync(movieId)
      setScore(0)
      setComment('')
      toast.info('Avaliação removida.')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Não foi possível remover a avaliação.'))
    }
  }

  const isSaving = upsert.isPending || remove.isPending

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl font-semibold text-foreground">Sua avaliação</h2>
        {rating && (
          <span className="text-sm text-muted-foreground">Você deu {rating.score}/10</span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <StarRating value={score} onChange={setScore} />
        <span className="text-sm font-medium text-foreground">
          {score > 0 ? `${score}/10` : 'Sem nota'}
        </span>
      </div>

      <Textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Escreva um comentário (opcional)..."
        maxLength={500}
        className="mt-4 min-h-24 resize-none"
        disabled={isPending}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={handleSave} disabled={isSaving}>
          {rating ? 'Atualizar avaliação' : 'Salvar avaliação'}
        </Button>
        {rating && (
          <Button variant="ghost" onClick={handleRemove} disabled={isSaving} className="gap-2">
            <Trash2 className="size-4" />
            Remover
          </Button>
        )}
      </div>
    </section>
  )
}
