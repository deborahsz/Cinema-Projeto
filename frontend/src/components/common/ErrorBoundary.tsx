import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Captura erros de renderização em qualquer parte da árvore filha, evitando que
 * a aplicação inteira quebre (tela branca). Exibe uma UI de recuperação.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Erro capturado:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.assign('/')
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
          <AlertTriangle className="size-12 text-destructive" aria-hidden="true" />
          <h1 className="font-display text-2xl font-bold text-foreground">Algo deu errado</h1>
          <p className="max-w-sm text-muted-foreground">
            Ocorreu um erro inesperado ao exibir esta tela. Você pode voltar ao início e tentar
            novamente.
          </p>
          <Button onClick={this.handleReset}>Voltar para o início</Button>
        </div>
      )
    }

    return this.props.children
  }
}
