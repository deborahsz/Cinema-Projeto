# Arquitetura

Este projeto segue uma **arquitetura baseada em features**, combinada com uma camada de
recursos compartilhados. A ideia é que código relacionado a uma funcionalidade específica
fique próximo dela, enquanto código genuinamente reutilizável fica nas pastas compartilhadas.

- `assets/` — imagens, ícones e fontes estáticas.
- `components/` — componentes de UI reutilizáveis e agnósticos de feature (ex: Button, Card, Skeleton). Inclui os componentes gerados pelo shadcn/ui em `components/ui`.
- `contexts/` — Context API (ex: tema, autenticação local).
- `features/` — módulos de domínio (ex: `movies`, `favorites`, `search`), cada um podendo ter seus próprios `components`, `hooks` e `services` internos.
- `hooks/` — custom hooks genéricos, usados por mais de uma feature.
- `pages/` — componentes de página, ligados diretamente às rotas.
- `routes/` — configuração do React Router (rotas, layouts, guards).
- `services/` — camada de acesso a dados (ex: cliente Axios do TMDB).
- `styles/` — estilos globais complementares ao Tailwind.
- `types/` — tipos e interfaces TypeScript compartilhados.
- `utils/` — funções utilitárias puras, sem dependência de React.
