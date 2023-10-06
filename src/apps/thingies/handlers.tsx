import { Layout } from '@components/layout'
import { db } from '@db'
import { type InsertThingy, thingies } from '@db/schema/thingies'
import { logger } from '@logger'
import { DuplicateThingyError } from './exceptions'

export function index() {
  return (
    <Layout title="Thingies">
      <header>
        <h1>Thingies</h1>
      </header>
      <main hx-ext="response-targets">
        HTMX rules!
        <form
          hx-delete="/thingies"
          hx-target=".success"
          hx-target-4xx=".error"
          hx-target-500=".error"
        >
          <button type="submit">Delete all thingies</button>
        </form>
        <form
          hx-post="/thingies"
          hx-target=".success"
          hx-target-4xx=".error"
          hx-target-500=".error"
        >
          <input name="name" />
          <button type="submit">Create thingy</button>
        </form>
        <div
          class="thingies-list"
          hx-get="/thingies"
          hx-indicator=".htmx-indicator"
          hx-trigger="load, htmx:afterRequest from:form"
          hx-target="this"
        />
        <img class="htmx-indicator" src="/public/static/spin.svg"></img>
        <div class="success"></div>
        <div class="error"></div>
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

export async function create(body: InsertThingy) {
  try {
    await db.insert(thingies).values(body)
  } catch (error) {
    if ((error as Error & { code: string }).code === 'SQLITE_CONSTRAINT') {
      throw new DuplicateThingyError()
    }
    logger.error(error)
    throw new Error('Something went wrong!')
  }
}

export async function deleteAll() {
  await db.delete(thingies).values()
}
