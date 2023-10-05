import { env } from 'node:process'
import { Elysia, t } from 'elysia'
import type { User } from '@db/schema'
import { lucia, auth } from './lucia'
import { UnauthorizedError } from './exceptions'
import { index, signIn, signUp } from './handlers'

export class Auth {
  static isSignedIn = {
    beforeHandle: ({ user }: { user: User }) => {
      if (env.NODE_ENV === 'production' && !user) {
        throw new UnauthorizedError()
      }
    },
  }
}

export const authApp = new Elysia({
  name: 'auth',
})
  .use(auth)
  .group('/auth', app =>
    app
      .get('/', index)
      .guard(Auth.isSignedIn, app =>
        app.post('/sign-out', ({ auth }) => auth.setSession(null)),
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
              const session = await signIn(body)
              return setSession(session)
            })
            .put('/sign-up', ({ body }) => signUp(body)),
      ),
  )

export * from './lucia'
