import { type Context, Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'

import { logger } from '@logger'
import { authApp } from '@apps/auth'
import { thingiesApp } from '@apps/thingies'

function handleErrorStatus({
  set,
  error,
}: Context & { error: Readonly<Error> }) {
  if ('status' in error && typeof error.status === 'number') {
    set.status = error.status
  }
  return error.message
}

const app = new Elysia()
  .use(swagger())
  .use(html({ autoDetect: true, autoDoctype: true }))
  .use(staticPlugin())
  .onError(handleErrorStatus)
  .use(authApp)
  .use(thingiesApp)
  .listen(42069)

logger.info('Listening http://127.0.0.1:%d', app.server!.port)
