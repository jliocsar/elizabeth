import { LuciaError } from 'lucia'
import { Layout } from '@components/layout'
import { logger } from '@logger'
import { lucia } from './lucia'
import {
  DuplicateUserError,
  EmailNotFoundError,
  InvalidPasswordError,
} from './exceptions'

// TODO: Check how to grab this with Elysia types
type TSignUpBody = {
  email: string
  password: string
}

export function index() {
  return (
    <Layout title="Login">
      <div hx-ext="response-targets">
        <form
          hx-indicator=".htmx-indicator"
          hx-post="/auth/sign-in"
          hx-target=".result"
          hx-target-400=".not-found"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required="true"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required="true"
          />
          <button type="submit">Login</button>
        </form>
        <img class="htmx-indicator" src="/public/static/spin.svg"></img>
        <div class="result"></div>
        <div class="not-found"></div>
      </div>
    </Layout>
  )
}

export async function signIn(body: TSignUpBody) {
  try {
    const key = await lucia.useKey('email', body.email, body.password)
    const session = await lucia.createSession({
      userId: key.userId,
      attributes: {
        email: body.email,
      },
    })
    return session
  } catch (error) {
    if (error instanceof LuciaError) {
      switch (error.message) {
        case 'AUTH_INVALID_KEY_ID':
          throw new EmailNotFoundError()
        case 'AUTH_INVALID_PASSWORD':
          throw new InvalidPasswordError()
      }
    }
    console.error(error)
    throw error
  }
}

export async function signUp(body: TSignUpBody) {
  const { email, password } = body
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
    if ((error as Error & { code: string }).code === 'SQLITE_CONSTRAINT') {
      throw new DuplicateUserError()
    }
    logger.error(error)
    throw new Error('Something went wrong!')
  }
}
