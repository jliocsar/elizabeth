import { Elysia, t } from 'elysia'
import type { User } from '@db/schema'
import { lucia, auth } from './lucia'
import { UnauthorizedError } from './exceptions'
import { Index, SignUp, signIn, signUp } from './handlers'

export class Auth {
  static isSignedIn = (redirect = false) => ({
    beforeHandle: ({
      user,
      set,
    }: {
      user: User
      set: { redirect?: string }
    }) => {
      if (!user) {
        if (redirect) {
          set.redirect = '/auth'
        }
        throw new UnauthorizedError()
      }
    },
  })
}

export const authApp = new Elysia({ name: 'auth' })
  .use(auth)
  .group('/auth', app =>
    app
      .guard(
        {
          beforeHandle: ({ user, set }) => {
            if (user) {
              set.redirect = '/'
            }
          },
        },
        app => app.get('/', Index),
      )
      .get('/sign-up', SignUp)
      .post('/sign-out', ({ set, auth }) => {
        auth.setSession(null)
        set.redirect = '/auth'
      })
      .guard(
        {
          body: t.Object({
            email: t.String({
              format: 'email',
            }),
            password: t.String(),
          }),
        },
        app =>
          app
            .post('/sign-in', async context => {
              const { setSession } = lucia.handleRequest(context)
              const { body } = context
              const session = await signIn(body)
              setSession(session)
              context.set.redirect = '/'
            })
            .put('/sign-up', ({ body }) => signUp(body)),
      ),
  )

export * from './lucia'
