import type { MovieVideo } from '@/types/movie'

/**
 * Escolhe o melhor vídeo do YouTube para exibir como trailer.
 * Prioridade: Trailer oficial > Trailer > Teaser > qualquer vídeo do YouTube.
 */
export function selectTrailer(videos: MovieVideo[] | undefined): MovieVideo | null {
  if (!videos || videos.length === 0) return null

  const youtube = videos.filter((video) => video.site === 'YouTube')
  if (youtube.length === 0) return null

  return (
    youtube.find((video) => video.type === 'Trailer' && video.official) ??
    youtube.find((video) => video.type === 'Trailer') ??
    youtube.find((video) => video.type === 'Teaser') ??
    youtube[0]
  )
}
