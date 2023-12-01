import type { ZlibCompressionOptions } from 'bun'
import { Elysia } from 'elysia'

// import * as Compression from '@elizabeth/lib/compression'
// import { logger } from '../logger'

export const ENCODING = 'gzip'

export function compression(options: ZlibCompressionOptions = {}) {
  const app = new Elysia({
    name: 'compression',
  })
  return app.onResponse(async ctx => {
    // const response = ctx.response
    // if (typeof response === 'string') {
    //   try {
    //     ctx.set.headers['Content-Encoding'] = ENCODING
    //     const compressed = Compression.gzipText(response, options)
    //     // @ts-expect-error - FIXME type mismatch
    //     ctx.response = compressed
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // }
  })
}
