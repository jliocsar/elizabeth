import { Elysia, t } from 'elysia'

import { index, findAll, create, deleteAll } from './handlers'

export const thingiesApp = new Elysia({ name: 'thingies' })
  .get('/', index)
  .group('/thingies', app =>
    app
      .get('/', findAll)
      .delete('/', deleteAll)
      .post('/', ({ body }) => create(body), {
        body: t.Object({
          name: t.String({
            minLength: 1,
          }),
        }),
      }),
  )
