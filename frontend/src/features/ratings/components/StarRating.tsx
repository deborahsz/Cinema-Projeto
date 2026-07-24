import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  /** Nota atual na escala de 1 a 10 (0 = sem nota). */
  value: number
  onChange?: (value: number) => void
  readOnly?: boolean
  size?: number
  className?: string
}

const STARS = [1, 2, 3, 4, 5]

/**
 * Seletor de estrelas com suporte a meia-estrela. Internamente a nota é de
 * 1 a 10 (cada estrela vale 2 pontos), permitindo incrementos de 0,5 estrela.
 */
export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = 32,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const displayValue = hoverValue ?? value

  function handleSelect(score: number) {
    if (readOnly || !onChange) return
    onChange(score)
  }

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role={readOnly ? undefined : 'radiogroup'}
      aria-label="Sua nota"
      onMouseLeave={() => setHoverValue(null)}
    >
      {STARS.map((star) => {
        const fullScore = star * 2
        const halfScore = fullScore - 1
        const isFull = displayValue >= fullScore
        const isHalf = !isFull && displayValue >= halfScore

        return (
          <div key={star} className="relative" style={{ width: size, height: size }}>
            <Star
              className="absolute inset-0 text-muted-foreground/40"
              style={{ width: size, height: size }}
              strokeWidth={1.5}
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: isFull ? size : isHalf ? size / 2 : 0 }}
            >
              <Star
                className="text-amber-400"
                style={{ width: size, height: size }}
                fill="currentColor"
                strokeWidth={1.5}
              />
            </div>

            {!readOnly && (
              <>
                {/* `before` amplia a área de toque sem alterar o tamanho visual da estrela. */}
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer before:absolute before:-inset-y-2 before:-left-1 before:content-['']"
                  aria-label={`${halfScore / 2} estrelas`}
                  onMouseEnter={() => setHoverValue(halfScore)}
                  onClick={() => handleSelect(halfScore)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer before:absolute before:-inset-y-2 before:-right-1 before:content-['']"
                  aria-label={`${fullScore / 2} estrelas`}
                  onMouseEnter={() => setHoverValue(fullScore)}
                  onClick={() => handleSelect(fullScore)}
                />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
