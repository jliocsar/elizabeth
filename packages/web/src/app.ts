import { env } from 'node:process'

import { type Context, Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'
import { helmet } from 'elysia-helmet'

import { DEFAULT_PORT, DEFAULT_WS_PORT } from '@elizabeth/config/const'
import { logger } from './logger'
import { applyRoutes } from './routes'
import { ENCODING, compression } from './middlewares/compression'
import { CACHE_POLICY } from './middlewares/cache'

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
    return app
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
  .use(compression())
  .use(swagger())
  .use(
    staticPlugin({
      prefix: '/',
      alwaysStatic: true,
      assets: 'public',
      headers: {
        'Cache-Control': CACHE_POLICY,
        'Content-Encoding': ENCODING,
      },
    }),
  )
  .onError(handleErrorStatus)

applyRoutes(app)

export async function startServer(port = DEFAULT_PORT) {
  app.listen(port)
  logger.info('Listening http://127.0.0.1:%d', app.server!.port)
  if (process.env.NODE_ENV === 'development') {
    const ws = new WebSocket(`ws://localhost:${DEFAULT_WS_PORT}`)
    ws.addEventListener('open', () => {
      ws.send('reload')
    })
  }
  return app
}
