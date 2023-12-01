import path from 'node:path'
import { exit } from 'node:process'

import { migrate } from 'drizzle-orm/libsql/migrator'

import { logger } from '../logger'
import { db } from '.'

try {
  await migrate(db, {
    migrationsFolder: path.resolve(import.meta.dir, 'migrations'),
  })
  logger.info('Tables migrated!')
  exit()
} catch (error) {
  logger.error('Error performing migration: ', (error as Error).message)
  exit(1)
}
