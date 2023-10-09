import type { UserSchema } from 'lucia'
import { type Context, Elysia } from 'elysia'
import { Htmx } from '@htmx'
import { auth } from './lucia'
import { UnauthorizedError } from './exceptions'
import {
  Index,
  SignUp,
  signIn,
  signUp,
  loggedIn,
  signInSchema,
  signUpSchema,
} from './handlers'

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
        app => app.get('/', Index).get('/sign-up', SignUp),
      )
      .guard(Auth.isSignedIn(), app =>
        app
          .get('/me', ({ user }) => loggedIn(user), Auth.isSignedIn())
          .post('/sign-out', ({ auth, set }) => {
            auth.setSession(null)
            return Htmx.setRedirect(set, '/auth')
          }),
      )
      .post(
        '/sign-in',
        async ({ body, auth, set }) => {
          const session = await signIn(body)
          auth.setSession(session)
          return Htmx.setRedirect(set, '/')
        },
        { body: signInSchema },
      )
      .post(
        '/sign-up',
        async ({ body, auth, set }) => {
          const session = await signUp(body)
          auth.setSession(session)
          return Htmx.setRedirect(set, '/')
        },
        { body: signUpSchema },
      ),
  )

export * from './lucia'
