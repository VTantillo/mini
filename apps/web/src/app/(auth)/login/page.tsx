import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LoginForm } from './login-form'

export default function Login() {
  return (
    <main className={cn('grid min-h-full place-content-center gap-4')}>
      <h1 className={cn('mb-4 text-center text-3xl')}>Login</h1>

      <LoginForm />

      <div className={cn('text-center')}>
        <p>Or</p>
        <Link href={'/register'}>Register</Link>
      </div>
    </main>
  )
}
