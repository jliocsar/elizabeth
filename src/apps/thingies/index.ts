import { Elysia, t } from 'elysia'
import { Auth, auth } from '@apps/auth'
import { index, findAll, create, deleteAll } from './handlers'

export const thingiesApp = new Elysia({ name: 'thingies' })
  .use(auth)
  .get('/', index)
  .group('/thingies', app =>
    app.get('/', findAll).guard(Auth.isSignedIn, app =>
      app.delete('/', deleteAll).post('/', ({ body }) => create(body), {
        body: t.Object({
          name: t.String({
            minLength: 1,
          }),
        }),
      }),
    ),
  )
