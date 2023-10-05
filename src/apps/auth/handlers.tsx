import { Layout } from '@components/layout'
import { logger } from '@logger'
import { lucia } from './lucia'
import { DuplicateUserError } from './exceptions'

type TSignUpBody = {
  email: string
  password: string
}

export function index() {
  return <Layout title="Login">Hey!</Layout>
}

export async function signIn(body: TSignUpBody) {
  const key = await lucia.useKey('email', body.email, body.password)
  const session = await lucia.createSession({
    userId: key.userId,
    attributes: {
      email: body.email,
    },
  })
  return session
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
