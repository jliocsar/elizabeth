import type { UserSchema } from 'lucia'
import { type Context, Elysia } from 'elysia'
import { Htmx } from '@htmx'
import { auth } from './lucia'
import { UnauthorizedError } from './exceptions'
import { Index, SignUp, signIn, signUp, loggedIn, signSchema } from './handlers'

export class Auth {
  static isSignedIn = (redirect = false) => ({
    beforeHandle: ({
      user,
      set,
    }: {
      user: UserSchema
      set: Context['set']
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
      .guard(Auth.isSignedIn(), app => app.get('/me', loggedIn))
      .get('/sign-up', SignUp)
      .post('/sign-out', ({ auth, set }) => {
        auth.setSession(null)
        return Htmx.setRedirect(set, '/auth')
      })
      .guard({ body: signSchema }, app =>
        app
          .post('/sign-in', async ({ body, auth, set }) => {
            const session = await signIn(body)
            auth.setSession(session)
            return Htmx.setRedirect(set, '/')
          })
          .post('/sign-up', async ({ body, auth, set }) => {
            const session = await signUp(body)
            auth.setSession(session)
            return Htmx.setRedirect(set, '/')
          }),
      ),
  )

export * from './lucia'
