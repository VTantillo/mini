import { Nav } from '@/components/nav'
import { getSessionToken } from '@/lib/auth/auth.helpers'
import { redirect } from 'next/navigation'

type Props = {
  children: React.ReactNode
}
export default function ProtectedLayout({ children }: Props) {
  const token = getSessionToken()

  if (!token) {
    redirect('/login')
  }

  return (
    <>
      <Nav />
      {children}
    </>
  )
}
