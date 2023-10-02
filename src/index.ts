import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'

import { thingiesApp } from './apps/thingies'

const app = new Elysia()
  .use(html({ autoDetect: true, autoDoctype: true }))
  .use(staticPlugin())
  .use(thingiesApp)
  .listen(42069)

console.log('Listening http://127.0.0.1:%d', app.server!.port)
