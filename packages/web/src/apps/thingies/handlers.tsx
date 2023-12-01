import { t } from 'elysia'
import { type TInsertThingy, thingies } from '../../db/schema/thingies'
import { db } from '../../db'
import { logger } from '../../logger'
import { DuplicateThingyError } from './exceptions'
import { Thingy } from './components/thingy'
import { Index } from './components'

export const createSchema = t.Object({
  name: t.String({
    minLength: 1,
  }),
})

export async function index() {
  const thingies = await findAll()
  return <Index thingies={thingies} />
}

export function findAll() {
  return db.select().from(thingies)
}

export async function create(body: TInsertThingy) {
  try {
    await db.insert(thingies).values(body)
    return <Thingy thingy={body} />
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
