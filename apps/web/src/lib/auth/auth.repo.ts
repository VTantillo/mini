import { db } from 'db/client'
import { dbSession, dbUser } from 'db/schema'
import { and, eq, isNull } from 'drizzle-orm'

export async function revokeSessionToken(token: string) {
  await db
    .update(dbSession)
    .set({ revokedAt: new Date() })
    .where(eq(dbSession.sessionToken, token))
}

export async function getActiveSessionUser(token: string | undefined) {
  if (!token) {
    return null
  }

  const results = await db
    .select()
    .from(dbUser)
    .innerJoin(dbSession, eq(dbSession.userId, dbUser.id))
    .where(and(eq(dbSession.sessionToken, token), isNull(dbSession.revokedAt)))

  if (results.length === 0) {
    return null
  }

  return results[0].user
}
