import type { ReactNode } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { MovieVideo } from '@/types/movie'

interface TrailerDialogProps {
  trailer: MovieVideo
  title: string
  children: ReactNode
}

export function TrailerDialog({ trailer, title, children }: TrailerDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton
        className="w-[calc(100%-2rem)] max-w-3xl overflow-hidden border-border bg-background p-0 sm:w-full sm:max-w-4xl"
      >
        <DialogTitle className="sr-only">{`Trailer de ${title}`}</DialogTitle>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
