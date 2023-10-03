import { exit } from 'node:process'

import { logger } from '../logger'
import { db } from '.'
import { thingies } from './schema'

try {
  await Promise.all([
    db
      .insert(thingies)
      .values([{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }]),
  ])
  logger.info('Tables seeded!')
  exit()
} catch (error) {
  logger.error('Error on seeding: ', (error as Error).message)
  exit(1)
}
