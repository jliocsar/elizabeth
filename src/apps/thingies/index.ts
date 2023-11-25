import { Elysia } from 'elysia'
import { auth } from '@apps/auth'
import { index, findAll, create, deleteAll, createSchema } from './handlers'
import { Auth } from '@middlewares/auth'

export const thingiesApp = new Elysia({ name: 'thingies' })
  .use(auth)
  .guard(Auth.isSignedIn({ redirect: true }), app => app.get('/', index))
  .group('/thingies', app =>
    app // 🦊
      .get('/', findAll)
      .guard(Auth.isSignedIn(), app =>
        app //
          .delete('/', deleteAll)
          .post('/', ({ body }) => create(body), {
            body: createSchema,
          }),
      ),
  )
