import { env } from 'node:process'

import { type Context, Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'
import { htmx } from 'elysia-htmx'
import { cors } from '@elysiajs/cors'
import { helmet } from 'elysia-helmet'

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
function stage(app: Elysia) {
  if (env.NODE_ENV === 'production') {
    return app.use(cors())
  }
  return app.trace(async ({ handle }) => {
    const { time, end } = await handle
    logger.info('TTH %dms', ((await end) - time).toFixed(3))
  })
}

const app = new Elysia()
  .use(stage)
  .use(
    helmet({
      contentSecurityPolicy: false,
      xDownloadOptions: false,
    }),
  )
  .use(
    html({
      autoDetect: true,
      autoDoctype: true,
    }),
  )
  .use(htmx())
  .use(swagger())
  .use(staticPlugin())
  .onError(handleErrorStatus)
  .use(authApp)
  .use(thingiesApp)
  .listen(42069)

logger.info('Listening http://127.0.0.1:%d', app.server!.port)
