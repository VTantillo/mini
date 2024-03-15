import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { ulid } from 'ulid'

export const dbUser = sqliteTable(
  'user',
  {
    id: text('id')
      .$defaultFn(() => ulid())
      .primaryKey()
      .notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    isAdmin: integer('is_admin', { mode: 'boolean' }).default(false).notNull(),
  },
  (u) => {
    return {
      usernameIndex: uniqueIndex('username_idx').on(u.username),
    }
  },
)

export type User = typeof dbUser.$inferSelect
export type NewUser = typeof dbUser.$inferInsert
export const insertUserSchema = createInsertSchema(dbUser)
