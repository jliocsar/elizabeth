import { env } from 'node:process'

import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema',
  out: './src/db/migrations',
  driver: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL!,
    authToken: env.DATABASE_AUTH_TOKEN!,
  },
  breakpoints: true,
  verbose: true,
  strict: true,
} satisfies Config
