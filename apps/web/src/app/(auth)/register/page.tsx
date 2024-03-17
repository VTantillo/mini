import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RegistrationForm } from './registration-form'

export default function Register() {
  return (
    <main className={cn('grid min-h-full place-content-center gap-4')}>
      <h1 className={cn('mb-4 text-center text-3xl')}>Register</h1>

      <RegistrationForm />

      <div className={cn('text-center')}>
        <Link href={'/login'}>Back to Login</Link>
      </div>
    </main>
  )
}
