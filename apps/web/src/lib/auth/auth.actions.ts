'use server'

import { db } from 'db/client'
import { dbSession, dbUser, insertUserSchema } from 'db/schema'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  checkPassword,
  generateSessionToken,
  hashPassword,
} from './auth.helpers'
import { revokeSessionToken } from './auth.repo'
import { LoginForm, RegistrationForm } from './auth.types'

export async function registerAction(input: RegistrationForm) {
  const userId = await db.transaction(async (tx) => {
    const [existingUser] = await tx
      .select()
      .from(dbUser)
      .where(eq(dbUser.username, input.username))

    if (existingUser) {
      return null
    }

    const newUser = insertUserSchema.parse({
      ...input,
      password: await hashPassword(input.password),
    })

    const [user] = await tx.insert(dbUser).values(newUser).returning()
    return user.id
  })

  return {
    success: Boolean(userId),
    message: Boolean(userId)
      ? 'Registration successful!'
      : 'There was an error registering',
  }
}

export async function loginAction(input: LoginForm) {
  const token = await db.transaction(async (tx) => {
    const [user] = await db
      .select()
      .from(dbUser)
      .where(sql`lower(${dbUser.username}) = ${input.username.toLowerCase()}`)

    const isValid = user && (await checkPassword(input.password, user.password))

    if (!isValid) {
      return null
    }

    const [session] = await tx
      .insert(dbSession)
      .values({
        sessionToken: generateSessionToken(),
        userId: user.id,
      })
      .returning()

    return session.sessionToken
  })

  if (token) {
    cookies().set('session-token', token, { httpOnly: true })
    revalidatePath('/')
    redirect('/')
  }

  return {
    success: Boolean(token),
    message: Boolean(token)
      ? 'Login Successful'
      : 'Incorrect username or password',
  }
}

export async function logoutAction() {
  const token = cookies().get('session-token')?.value

  if (token) {
    await revokeSessionToken(token)
  }

  cookies().delete('session-token')
  redirect('/login')
}
