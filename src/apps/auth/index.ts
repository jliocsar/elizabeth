import { Elysia, t } from 'elysia'
import { LuciaError } from 'lucia'

import type { User } from '@db/schema'
import { logger } from '@logger'
import { lucia, auth } from './lucia'
import { DuplicateUserError, UnauthorizedError } from './exceptions'

export class Auth {
  static isSignedIn = {
    beforeHandle: ({ user }: { user: User }) => {
      if (!user) {
        throw new UnauthorizedError()
      }
    },
  }
}

export const authApp = new Elysia({
  name: 'auth',
  prefix: '/auth',
})
  .use(auth)
  .guard(Auth.isSignedIn, app =>
    app.post('/sign-out', async ({ auth }) => {
      auth.setSession(null)
      auth.invalidate()
    }),
  )
  .guard(
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
    app =>
      app
        .post('/sign-in', async context => {
          const { setSession } = lucia.handleRequest(context)
          const { body } = context
          const key = await lucia.useKey('email', body.email, body.password)
          const session = await lucia.createSession({
            userId: key.userId,
            attributes: {
              email: body.email,
            },
          })
          return setSession(session)
        })
        .put('/sign-up', async ({ body: { email, password } }) => {
          try {
            await lucia.createUser({
              key: {
                providerId: 'email',
                providerUserId: email,
                password,
              },
              attributes: { email },
            })
            return 'OK'
          } catch (error) {
            console.log(error instanceof LuciaError)
            if (
              (error as Error & { code: string }).code === 'SQLITE_CONSTRAINT'
            ) {
              throw new DuplicateUserError()
            }
            logger.error(error)
            throw new Error('Something went wrong!')
          }
        }),
  )

export * from './lucia'
