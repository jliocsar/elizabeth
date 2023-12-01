import { type UserSchema, LuciaError } from 'lucia'
import { t } from 'elysia'
import { logger } from '../../logger'
import { mergeSchemaProperties } from '../../utils/typebox'
import {
  DuplicateUserError,
  EmailNotFoundError,
  InvalidPasswordError,
} from '../../exceptions/auth'
import { lucia } from './lucia'
import { LoggedIn } from './components/logged-in'
import { Index } from './components'
import { SignUp } from './components/sign-up'

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

export function index() {
  return <Index />
}

export function signUpPage() {
  return <SignUp />
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
