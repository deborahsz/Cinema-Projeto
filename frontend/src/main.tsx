import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@/contexts/AppProviders'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { router } from '@/routes/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
)
