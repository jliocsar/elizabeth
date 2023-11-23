import Elysia from 'elysia'

import { authApp } from '@apps/auth'
import { thingiesApp } from '@apps/thingies'

export function applyRoutes(app: Elysia) {
  return app.use(authApp).use(thingiesApp)
}
