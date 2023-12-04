import { type PluginConstraints, plugin } from 'bun'

// compresses any static file (img, css, fonts etc)
// besides building PostCSS syntax on compress time
await plugin({
  name: 'compressed-static-build',
  async setup(build) {
    const label = `[${process.pid}] compressed-static-build`
    console.time(label)
    const { STATIC_FILTER } = await import('@elizabeth/lib/static')
    const Compression = await import('@elizabeth/lib/compression')
    const constraints: PluginConstraints = {
      filter: STATIC_FILTER,
    }
    console.timeEnd(label)
    build.onLoad(constraints, async args => {
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
