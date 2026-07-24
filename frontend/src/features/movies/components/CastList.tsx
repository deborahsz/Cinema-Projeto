import { User } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { getTmdbImageUrl } from '@/utils/tmdb-image'
import type { CastMember } from '@/types/movie'

interface CastListProps {
  cast: CastMember[]
  limit?: number
}

export function CastList({ cast, limit = 15 }: CastListProps) {
  const members = cast.slice(0, limit)
  if (members.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">Elenco principal</h2>

      <Carousel opts={{ align: 'start', dragFree: true }}>
        <CarouselContent>
          {members.map((member) => {
            const photo = getTmdbImageUrl(member.profile_path, 'w185')

            return (
              <CarouselItem key={member.id} className="basis-[38%] sm:basis-1/4 md:basis-1/6">
                <div className="flex flex-col">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-secondary">
                    {photo ? (
                      <img
                        src={photo}
                        alt={member.name}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <User className="size-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-foreground">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{member.character}</p>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:-left-4 sm:flex" />
        <CarouselNext className="hidden sm:-right-4 sm:flex" />
      </Carousel>
    </section>
  )
}
