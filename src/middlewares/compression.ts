import type { ZlibCompressionOptions } from 'bun'
import { Elysia } from 'elysia'

import { logger } from '@logger'

export const encoding = 'gzip'

export function compression(options: ZlibCompressionOptions = {}) {
  const app = new Elysia({
    name: 'compression',
  })
  return app.onResponse(async ctx => {
    // @ts-expect-error - FIXME type mismatch
    const response = ctx.response
    if (typeof response === 'string') {
      try {
        ctx.set.headers['Content-Encoding'] = encoding
        const compressed = Bun.gzipSync(
          Buffer.from(response),
          Object.assign(
            {
              level: process.env.NODE_ENV === 'development' ? 1 : 9,
            },
            options,
          ),
        )
        // @ts-expect-error - FIXME type mismatch
        ctx.response = compressed
      } catch (error) {
        logger.error(error)
      }
    }
  })
}
