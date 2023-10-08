import { Layout } from '@components/layout'
import { db } from '@db'
import { type InsertThingy, thingies } from '@db/schema/thingies'
import { logger } from '@logger'
import { Navbar } from '@components/navbar'
import { DuplicateThingyError } from './exceptions'
import { ThingiesList } from './components/thingies-list'

export function Index() {
  return (
    <Layout title="Thingies">
      <header>
        <h1>Thingies</h1>
        <Navbar />
      </header>
      <ThingiesList />
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
    return <ThingiesList />
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
  return <ThingiesList />
}
