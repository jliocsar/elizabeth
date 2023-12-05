import { type PluginConstraints, plugin } from 'bun'

// compresses any static file (img, css, fonts etc)
// besides building PostCSS syntax on compress time
await plugin({
  name: 'compressed-static-build',
  async setup(build) {
    let Compression: typeof import('@elizabeth/lib/compression') | null = null
    const { STATIC_FILTER } = await import('@elizabeth/lib/static')
    const constraints: PluginConstraints = {
      filter: STATIC_FILTER,
    }
    build.onLoad(constraints, async args => {
      Compression ??= await import('@elizabeth/lib/compression')
      const src = await Compression.compressStaticFile(args.path)
      return {
        exports: {
          default: src,
        },
        loader: 'object',
      }
    })
  },
})
