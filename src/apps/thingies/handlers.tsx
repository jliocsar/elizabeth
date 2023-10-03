import { Layout } from '@components/layout'
import { db } from '@db'
import { type InsertThingy, thingies } from '@db/schema/thingies'

export function index() {
  return (
    <Layout title="Thingies">
      <header>
        <h1>Thingies</h1>
      </header>
      <main>
        HTMX rules!
        <form hx-delete="/thingies" hx-swap="none">
          <button type="submit">Delete all thingies</button>
        </form>
        <form hx-post="/thingies" hx-swap="none">
          <input name="name" />
          <button type="submit">Create thingy</button>
        </form>
        <div
          class="thingies-list"
          hx-get="/thingies"
          hx-trigger="load, htmx:afterRequest from:form"
          hx-target="this"
        />
      </main>
    </Layout>
  )
}

export async function findAll() {
  const allThingies = await db.select().from(thingies)
  return (
    <ul>
      {allThingies.map(thingy => (
        <li>{thingy.name}</li>
      ))}
    </ul>
  )
}

export function create(body: InsertThingy) {
  return db.insert(thingies).values(body)
}

export function deleteAll() {
  return db.delete(thingies).values()
}
