import { plugin } from 'bun'

await plugin({
  name: 'postcss',
  async setup(build) {
    console.time('postcss')
    const pathCache = new Map<string, string>()
    const { existsSync, mkdirSync } = await import('node:fs')
    const { resolve, join } = await import('node:path')
    const { default: postcss } = await import('postcss')
    const { plugins } = await import('../postcss.config')
    const publicPath = resolve(import.meta.dir, '..', 'public')
    if (!existsSync(publicPath)) {
      mkdirSync(publicPath)
    }
    console.timeEnd('postcss')
    build.onLoad({ filter: /\.css$/ }, async args => {
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
      const cssOutputDir = join(publicPath, 'css')
      if (!existsSync(cssOutputDir)) {
        mkdirSync(cssOutputDir)
      }
      const to =
        from.replace(/(.+\/src\/|\.css$)/g, '').replaceAll('/', '-') + '.css'
      const outputPath = resolve(cssOutputDir, to)
      const text = await Bun.file(from).text()
      const { css } = await postcss(plugins).process(text, { from, to })
      const compressed = Bun.gzipSync(Buffer.from(css), {
        level: process.env.NODE_ENV === 'development' ? 0 : 9,
      })
      await Bun.write(outputPath, compressed)
      pathCache.set(from, to)
      const exports = {
        default: join('/public', 'css', to),
      }
      return {
        exports,
        loader: 'object',
      }
    })
  },
})
