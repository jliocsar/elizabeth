import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import drizzleConfig from '../../drizzle.config'
import * as schema from './schema'

export const client = createClient(drizzleConfig.dbCredentials)
export const db = drizzle(client, {
  schema,
  logger: true,
})
