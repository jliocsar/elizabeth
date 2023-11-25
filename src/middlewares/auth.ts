import type { UserSchema } from 'lucia'
import type { Context } from 'elysia'
import { UnauthorizedError } from '@exceptions/auth'

type TSignedInOptions = {
  redirect?: boolean
}

export class Auth {
  static isSignedIn = (options: TSignedInOptions = {}) => {
    return {
      beforeHandle: (ctx: { user: UserSchema; set: Context['set'] }) => {
        if (!ctx.user) {
          if (options.redirect) {
            ctx.set.redirect = '/auth'
          }
          throw new UnauthorizedError()
        }
      },
    }
  }
}
