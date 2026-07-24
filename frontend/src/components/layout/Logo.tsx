import { Link } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/paths'

interface LogoProps {
  className?: string
  onClick?: () => void
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      to={paths.home}
      onClick={onClick}
      className={cn('group flex items-center gap-2', className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#b0060e] shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
        <Clapperboard className="size-4.5 text-white" />
      </span>
      <span className="hidden font-display text-xl font-bold tracking-tight text-foreground min-[380px]:inline">
        Cine<span className="text-primary">Scope</span>
      </span>
    </Link>
  )
}
