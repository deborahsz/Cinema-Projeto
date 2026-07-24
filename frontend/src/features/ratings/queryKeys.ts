export const ratingKeys = {
  all: ['ratings'] as const,
  list: () => [...ratingKeys.all, 'list'] as const,
  detail: (movieId: number) => [...ratingKeys.all, 'detail', movieId] as const,
}
