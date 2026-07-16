import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { paths } from '@/routes/paths'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: paths.home,
        lazy: async () => {
          const { HomePage } = await import('@/pages/HomePage')
          return { Component: HomePage }
        },
      },
      {
        path: paths.movieDetails(),
        lazy: async () => {
          const { MovieDetailsPage } = await import('@/pages/MovieDetailsPage')
          return { Component: MovieDetailsPage }
        },
      },
      {
        path: paths.movies,
        lazy: async () => {
          const { MoviesPage } = await import('@/pages/MoviesPage')
          return { Component: MoviesPage }
        },
      },
      {
        path: paths.search,
        lazy: async () => {
          const { SearchPage } = await import('@/pages/SearchPage')
          return { Component: SearchPage }
        },
      },
      {
        path: paths.favorites,
        lazy: async () => {
          const { FavoritesPage } = await import('@/pages/FavoritesPage')
          return { Component: FavoritesPage }
        },
      },
      {
        path: paths.about,
        lazy: async () => {
          const { AboutPage } = await import('@/pages/AboutPage')
          return { Component: AboutPage }
        },
      },
      {
        path: paths.profile,
        lazy: async () => {
          const { ProfilePage } = await import('@/pages/ProfilePage')
          return { Component: ProfilePage }
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundPage } = await import('@/pages/NotFoundPage')
          return { Component: NotFoundPage }
        },
      },
    ],
  },
])
