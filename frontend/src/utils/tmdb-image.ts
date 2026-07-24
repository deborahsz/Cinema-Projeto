const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original'

/**
 * Monta a URL completa de uma imagem do TMDB a partir do path retornado pela API.
 * Retorna `null` quando não há imagem, para o componente decidir o fallback.
 */
export function getTmdbImageUrl(
  path: string | null,
  size: PosterSize | BackdropSize | ProfileSize = 'w500',
): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}
