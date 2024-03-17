import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  schema: './schema.ts',
  driver: 'better-sqlite',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DB_PATH!,
  },
} satisfies Config
