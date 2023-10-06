import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'

import { logger } from '@logger'
import { authApp } from '@apps/auth'
import { thingiesApp } from '@apps/thingies'

const app = new Elysia()
  .use(html({ autoDetect: true, autoDoctype: true }))
  .use(staticPlugin())
  .use(authApp)
  .use(thingiesApp)
  .listen(42069)

logger.info('Listening http://127.0.0.1:%d', app.server!.port)
