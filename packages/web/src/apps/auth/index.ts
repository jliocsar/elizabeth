import { Elysia } from 'elysia'
import { htmx } from 'elysia-htmx'
import { Auth } from '../../middlewares/auth'
import { cache } from '../../middlewares/cache'
import { auth } from './lucia'
import {
  signIn,
  signUp,
  loggedIn,
  signInSchema,
  signUpSchema,
  index,
  signUpPage,
} from './handlers'

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
        app => app.use(cache()).get('/', index).get('/sign-up', signUpPage),
      )
      .guard(Auth.isSignedIn(), app =>
        app
          .get('/me', ({ user }) => loggedIn(user), Auth.isSignedIn())
          .post('/sign-out', ({ hx, auth }) => {
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
