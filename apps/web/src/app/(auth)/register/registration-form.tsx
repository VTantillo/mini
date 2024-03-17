'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAction } from '@/lib/auth/auth.actions'
import { RegistrationFormSchema } from '@/lib/auth/auth.types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { useZorm } from 'react-zorm'

export function RegistrationForm() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const zo = useZorm('registrationForm', RegistrationFormSchema, {
    onValidSubmit: async (e) => {
      e.preventDefault()
      const res = await registerAction(e.data)

      if (res.success) {
        setRegistrationSuccess(res.success)
      }

      // TODO: Handle the error state if registration wasn't successful

      e.target.reset()
    },
  })

  const disabled = zo.validation?.success === false

  // TODO: Add a registration success state then take them to the login page

  return !registrationSuccess ? (
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

      <div>
        <Label htmlFor={zo.fields.confirmPassword()}>Confirm Password</Label>
        <Input
          type={'password'}
          name={zo.fields.confirmPassword()}
          placeholder={'Confirm Password'}
        />
        {zo.errors.confirmPassword((e) => (
          <span>{e.message}</span>
        ))}
      </div>

      <Button type="submit" disabled={disabled}>
        Register
      </Button>
    </form>
  ) : (
    <div>
      <h1>Registration Successful!</h1>
      <p>Continue to login to get started.</p>
      <Link href={'/login'}>Login</Link>
    </div>
  )
}
