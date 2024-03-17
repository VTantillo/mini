import { getSessionToken } from '@/lib/auth/auth.helpers'
import { getActiveSessionUser } from '@/lib/auth/auth.repo'
import { cn } from '@/lib/utils'

export default async function Dashboard() {
  const token = getSessionToken()
  const user = await getActiveSessionUser(token)

  console.log(user)

  return (
    <main className={cn('container space-y-2')}>
      <h1 className={cn('text-3xl')}>Hello, {user ? user.username : 'User'}</h1>
      <p>Minimal set up with auth and sqlite</p>
    </main>
  )
}
