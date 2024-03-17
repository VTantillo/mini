import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('../../pkgs/db/mini-db.db')
export const db = drizzle(sqlite)
