import { ThemeToggle } from '@/components/theme-toggle'
import { getSessionToken } from '@/lib/auth/auth.helpers'
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}
export default function AuthLayout({ children }: Props) {
  const token = getSessionToken()

  if (token) {
    redirect('/')
  }

  return (
    <>
      <header className={cn('flex items-center justify-between px-4 py-2')}>
        <h1 className={cn('text-3xl')}>Mini Prototype</h1>

        <ThemeToggle />
      </header>
      {children}
    </>
  )
}
