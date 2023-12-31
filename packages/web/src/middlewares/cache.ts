import { Elysia } from 'elysia'

export const CACHE_POLICY =
  process.env.NODE_ENV === 'development'
    ? 'no-cache, no-store, must-revalidate'
    : 'public, max-age=31536000, immutable'

export function cache() {
  const app = new Elysia({
    name: 'cache',
  })
  const cache = new Map<string, string>()
  return app.onResponse(async ctx => {
    // const key = ctx.request.url
    // const response = ctx.response
    // if (typeof response === 'string') {
    //   if (cache.has(key)) {
    //     // @ts-expect-error - FIXME type mismatch
    //     ctx.response = cache.get(key)!
    //   } else {
    //     ctx.set.headers['Cache-Control'] = CACHE_POLICY
    //     cache.set(key, response)
    //   }
    // }
  })
}
