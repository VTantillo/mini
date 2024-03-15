import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

export function Nav() {
  return (
    <header className={cn('flex items-center justify-between px-4 py-2')}>
      <h1 className={cn('text-3xl')}>Mini Next</h1>

      <div className={cn('flex items-center gap-3')}>
        <ThemeToggle />
      </div>
    </header>
  )
}
