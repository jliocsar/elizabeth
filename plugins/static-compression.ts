import { type PluginConstraints, plugin } from 'bun'

await plugin({
  name: 'static-compression',
  async setup(build) {
    const label = `[${process.pid}] static-compression`
    console.time(label)
    const pathCache = new Map<string, string>()
    const { existsSync, mkdirSync } = await import('node:fs')
    const { resolve, join } = await import('node:path')
    const staticOutputDir = resolve(import.meta.dir, '..', 'public', 'static')
    if (!existsSync(staticOutputDir)) {
      mkdirSync(staticOutputDir)
    }
    const imagesCapture = 'png|jp?eg|gif|svg'
    const filter = new RegExp(
      '.' + // dot from the file extension
        '(' + // start of capture group
        imagesCapture + // image types capture
        // TODO: Add fonts
        ')' + // end of capture group
        '$', // match only the end of string
    )
    const constraints: PluginConstraints = {
      filter,
    }
    console.timeEnd(label)
    build.onLoad(constraints, async args => {
      const from = args.path
      if (pathCache.has(from)) {
        return {
          exports: {
            default: pathCache.get(from)!,
          },
          loader: 'object',
        }
      }
      const to = from.replace(/.+static\//g, '')
      const outputPath = join(staticOutputDir, to)
      const arrayBuffer = await Bun.file(from).arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const compressed = Bun.gzipSync(buffer, {
        level: process.env.NODE_ENV === 'development' ? 1 : 9,
      })
      await Bun.write(outputPath, compressed)
      const src = 'static/' + to
      pathCache.set(from, src)
      return {
        exports: {
          default: src,
        },
        loader: 'object',
      }
    })
  },
})
