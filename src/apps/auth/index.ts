import type { UserSchema } from 'lucia'
import { type Context, Elysia } from 'elysia'
import { htmx } from 'elysia-htmx'
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
  .use(htmx())
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
          .post('/sign-out', ({ hx, auth, set }) => {
            auth.setSession(null)
            return hx.redirect('/auth')
          }),
      )
      .post(
        '/sign-in',
        async ({ body, auth, hx }) => {
          const session = await signIn(body)
          auth.setSession(session)
          return hx.redirect('/')
        },
        { body: signInSchema },
      )
      .post(
        '/sign-up',
        async ({ body, auth, hx }) => {
          const session = await signUp(body)
          auth.setSession(session)
          return hx.redirect('/')
        },
        { body: signUpSchema },
      ),
  )

export * from './lucia'
