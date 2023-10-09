import { type UserSchema, LuciaError } from 'lucia'
import { t } from 'elysia'
import { Layout } from '@components/layout'
import { logger } from '@logger'
import { mergeSchemaProperties } from '@utils/typebox'
import { lucia } from './lucia'
import {
  DuplicateUserError,
  EmailNotFoundError,
  InvalidPasswordError,
} from './exceptions'
import { LoggedIn } from './components/logged-in'
import { css } from './styles.css'

export const signInSchema = t.Object({
  email: t.String(),
  password: t.String(),
})
export const signUpSchema = mergeSchemaProperties(signInSchema, {
  // TODO: Figure out how to handle partial form submits with HTMX
  'confirm-password': t.String(),
})

type TSignInSchema = typeof signInSchema.static
type TSignUpSchema = typeof signUpSchema.static

export function Index() {
  return (
    <Layout title="Login" styles={css}>
      <nav>
        <a href="/auth/sign-up">Register</a>
      </nav>
      <div hx-ext="response-targets">
        <h1>Login</h1>
        <form
          hx-indicator=".htmx-indicator"
          hx-post="/auth/sign-in"
          hx-target-4xx=".error"
          hx-target-5xx=".error"
        >
          <input
            class="email"
            type="email"
            name="email"
            placeholder="Email"
            required="true"
          />
          <input
            class="password"
            type="password"
            name="password"
            placeholder="Password"
            required="true"
          />
          <button type="submit">Login</button>
          <img
            class="htmx-indicator"
            src="/public/static/spin.svg"
            width="40"
            height="40"
          />
        </form>
        <div class="error" />
      </div>
    </Layout>
  )
}

export function SignUp() {
  return (
    <Layout title="Sign up" styles={css}>
      <nav>
        <a href="/auth">Go back</a>
      </nav>
      <div hx-ext="response-targets">
        <h1>Sign Up</h1>
        <form
          hx-indicator=".htmx-indicator"
          hx-post="/auth/sign-up"
          hx-target-4xx=".error"
          hx-target-5xx=".error"
        >
          <input
            class="email"
            type="email"
            name="email"
            placeholder="Email"
            required="true"
          />
          <input
            class="password"
            type="password"
            name="password"
            placeholder="Password"
            required="true"
          />
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            required="true"
            _="on htmx:validation:validate
              if my.value != .password.value
                call me.setCustomValidity('Passwords do not match')
              else
                call me.setCustomValidity('')"
          />
          <button type="submit">Sign up</button>
          <img class="htmx-indicator" src="/public/static/spin.svg" />
        </form>
        <div class="error" />
      </div>
    </Layout>
  )
}

export async function signIn(body: TSignInSchema) {
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

export async function signUp(body: TSignUpSchema) {
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
    return signIn(body)
  } catch (error) {
    if ((error as Error & { code: string }).code === 'SQLITE_CONSTRAINT') {
      throw new DuplicateUserError()
    }
    logger.error(error)
    throw new Error('Something went wrong!')
  }
}

export function loggedIn(user: UserSchema) {
  return <LoggedIn user={user} />
}
