/**
 * Fonte única de verdade para os caminhos de rota da aplicação.
 * Evita strings mágicas espalhadas pelo código (ex: `<Link to="/favoritos">`).
 */
export const paths = {
  home: '/',
  search: '/search',
  favorites: '/favorites',
  movieDetails: (id: string | number = ':id') => `/movie/${id}`,
  about: '/about',
  profile: '/profile',
} as const
