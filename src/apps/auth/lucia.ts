import type { Elysia } from 'elysia'
import { lucia as createLuciaAuth } from 'lucia'
import { elysia } from 'lucia/middleware'
import { libsql as adapter } from '@lucia-auth/adapter-sqlite'
import { client } from '@db'

export const lucia = createLuciaAuth({
  env: 'DEV',
  middleware: elysia(),
  adapter: adapter(client, {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: databaseUser => ({
    email: databaseUser.email,
  }),
  ...(process.env.NODE_ENV !== 'production' && {
    csrfProtection: false,
  }),
})

export const auth = (app: Elysia) =>
  app
    .derive(async context => {
      const handled = lucia.handleRequest(context)
      const session = await handled.validate()
      return {
        auth: handled,
        user: session?.user ?? null,
      }
    })
    .onError(({ set, error }) => {
      if ('status' in error && typeof error.status === 'number') {
        set.status = error.status
      }
      return error.message
    })
