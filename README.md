# Mini Example

This repo serves to be a minimal full stack monorepo setup using sqlite as the
DB.

I need to figure out how to use a `.env` from the root of the repo, so for now
to get it running you must have a `.env` in both the `apps/web` and `pkgs/db`
directories with an absolute path to `pkgs/db/<db-filename>.db>` so that they
both reference the same file.

```env
DB_PATH="/Users/me/code/mini/pkgs/db/mini-db.db"
```

## Getting started

After adding the `.env` files as outlined above:

1. Run `pnpm install` from the root of the repo.
2. `cd pkgs/db`
3. Run `pnpm db:push` to create the sqlite file.
4. `cd ../../apps/web`
5. `pnpm dev` to start the next app
