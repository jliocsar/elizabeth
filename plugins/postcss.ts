import { plugin } from 'bun'

await plugin({
  name: 'postcss',
  async setup(build) {
    const pathCache = new Map<string, string>()
    const [fs, path, { default: postcss }, { plugins }] = await Promise.all([
      import('node:fs'),
      import('node:path'),
      import('postcss'),
      import('../postcss.config'),
    ])
    const publicPath = path.resolve(import.meta.dir, '..', 'public')
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath)
    }
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
      process.stdout.write(`Compiling "${from}"\n`)
      const cssOutputDir = path.join(publicPath, 'css')
      if (!fs.existsSync(cssOutputDir)) {
        fs.mkdirSync(cssOutputDir)
      }
      const to =
        from.replace(/(.+\/src\/|\.css$)/g, '').replaceAll('/', '-') + '.css'
      const outputPath = path.resolve(cssOutputDir, to)
      const text = await Bun.file(from).text()
      const { css } = await postcss(plugins).process(text, { from, to })
      const compressed = Bun.gzipSync(Buffer.from(css), {
        level: 9,
      })
      await Bun.write(outputPath, compressed)
      pathCache.set(from, to)
      const exports = {
        default: path.join('/public', 'css', to),
      }
      return {
        exports,
        loader: 'object',
      }
    })
  },
})
