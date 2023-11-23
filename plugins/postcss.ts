import { plugin } from 'bun'

await plugin({
  name: 'postcss',
  async setup(build) {
    const label = `[${process.pid}] postcss`
    console.time(label)
    const pathCache = new Map<string, string>()
    const { existsSync, mkdirSync } = await import('node:fs')
    const { resolve, join } = await import('node:path')
    const { default: postcss } = await import('postcss')
    const { plugins } = await import('../postcss.config')
    const processor = postcss(plugins)
    const publicPath = resolve(import.meta.dir, '..', 'public')
    if (!existsSync(publicPath)) {
      mkdirSync(publicPath)
    }
    console.timeEnd(label)
    build.onLoad({ filter: /\.css$/ }, async args => {
      const from = args.path
      if (pathCache.has(from)) {
        return {
          exports: {
            default: pathCache.get(from)!,
          },
          loader: 'object',
        }
      }
      const cssOutputDir = join(publicPath, 'css')
      if (!existsSync(cssOutputDir)) {
        mkdirSync(cssOutputDir)
      }
      const to =
        from.replace(/(.+\/src\/|\.css$)/g, '').replaceAll('/', '-') + '.css'
      const outputPath = resolve(cssOutputDir, to)
      const text = await Bun.file(from).text()
      const { css } = await processor.process(text, { from, to })
      const compressed = Bun.gzipSync(Buffer.from(css), {
        level: process.env.NODE_ENV === 'development' ? 0 : 9,
      })
      await Bun.write(outputPath, compressed)
      const href = 'css/' + to
      pathCache.set(from, href)
      return {
        exports: {
          default: href,
        },
        loader: 'object',
      }
    })
  },
})
