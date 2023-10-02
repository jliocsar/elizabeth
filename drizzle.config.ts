import { env } from 'node:process'

import { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
