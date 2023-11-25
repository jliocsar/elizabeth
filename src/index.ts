import { env } from 'node:process'

import { type Context, Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'
import { helmet } from 'elysia-helmet'

import { logger } from '@logger'
import { applyRoutes } from '@routes'
import { compression } from '@middlewares'

const encoding = 'gzip'

function handleErrorStatus({
  set,
  error,
}: Context & { error: Readonly<Error> }) {
  if ('status' in error && typeof error.status === 'number') {
    set.status = error.status
  }
  return error.message
}

const app = new Elysia({
  name: 'elizabeth',
})
  .use(app => {
    if (env.NODE_ENV === 'production') {
      return app.use(cors())
    }
    return app.trace(async ({ handle }) => {
      const { name, time, end } = await handle
      logger.info(`[${name.trim()}] TTH %dms`, ((await end) - time).toFixed(3))
    })
  })
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
  .use(compression(encoding))
  .use(swagger())
  .use(
    staticPlugin({
      prefix: '/',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Encoding': encoding,
      },
    }),
  )
  .onError(handleErrorStatus)

applyRoutes(app).listen(42069)

logger.info('Listening http://127.0.0.1:%d', app.server!.port)
