import { Elysia } from 'elysia'

import { Layout } from '@components/layout'
import { db } from '@db'
import { thingies } from '@db/schema'

export const thingiesApp = new Elysia({ name: 'thingies' })
  .get('/', () => (
    <Layout title="Thingies">
      <header>
        <h1>Thingies</h1>
      </header>
      <main>
        HTMX rules!
        <div hx-get="/thingies" hx-trigger="load" hx-target="this" />
      </main>
    </Layout>
  ))
  .get('/thingies', async () => {
    const allThingies = await db.select().from(thingies)
    return (
      <ul>
        {allThingies.map(thingy => (
          <li>{thingy.name}</li>
        ))}
      </ul>
    )
  })
