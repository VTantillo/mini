'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '@/lib/auth/auth.actions'
import { LoginFormSchema } from '@/lib/auth/auth.types'
import { cn } from '@/lib/utils'
import { useZorm } from 'react-zorm'

export function LoginForm() {
  const zo = useZorm('loginForm', LoginFormSchema, {
    onValidSubmit: async (e) => {
      e.preventDefault()
      // TODO: Show error message if login wasn't successful
      await loginAction(e.data)
      e.target.reset()
    },
  })

  const disabled = zo.validation?.success === false

  return (
    <form ref={zo.ref} className={cn('flex w-60 flex-col gap-6')}>
      <div>
        <Label htmlFor={zo.fields.username()}>Username</Label>

        <Input
          type={'text'}
          name={zo.fields.username()}
          placeholder={'Username'}
        />
        {zo.errors.username((e) => (
          <span>{e.message}</span>
        ))}
      </div>

      <div>
        <Label htmlFor={zo.fields.password()}>Password</Label>
        <Input
          type={'password'}
          name={zo.fields.password()}
          placeholder={'Password'}
        />
        {zo.errors.password((e) => (
          <span>{e.message}</span>
        ))}
      </div>

      <Button type="submit" disabled={disabled}>
        Login
      </Button>
    </form>
  )
}
