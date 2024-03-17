'use client'

import { logoutAction } from '@/lib/auth/auth.actions'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'

export function Logout() {
  return (
    <Button variant="outline" size="icon" onClick={() => logoutAction()}>
      <LogOut className={cn('size-[1.2rem] ')} />
    </Button>
  )
}
