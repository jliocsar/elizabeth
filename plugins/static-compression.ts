import { plugin } from 'bun'

await plugin({
  name: 'static-compression',
  async setup(build) {
    console.time('static-compression')
    const pathCache = new Map<string, string>()
    const { existsSync, mkdirSync } = await import('node:fs')
    const { resolve, join } = await import('node:path')
    console.timeEnd('static-compression')
    build.onLoad(
      {
        // TODO: Add more image types
        filter: /\.(png|jpe?g|gif|svg)$/,
      },
      async args => {
        const from = args.path
        if (pathCache.has(from)) {
          const exports = {
            default: pathCache.get(from),
          }
          return {
            exports,
            loader: 'object',
          }
        }
        const staticOutputDir = resolve(
          import.meta.dir,
          '..',
          'public',
          'static',
        )
        if (!existsSync(staticOutputDir)) {
          mkdirSync(staticOutputDir)
        }
        const to = from.replace(/.+\/src\/static\//g, '')
        const outputPath = resolve(staticOutputDir, to)
        const arrayBuffer = await Bun.file(from).arrayBuffer()
        const compressed = Bun.gzipSync(Buffer.from(arrayBuffer), {
          level: 9,
        })
        await Bun.write(outputPath, compressed)
        pathCache.set(from, to)
        const exports = {
          default: join('/public', 'static', to),
        }
        return {
          exports,
          loader: 'object',
        }
      },
    )
  },
})
