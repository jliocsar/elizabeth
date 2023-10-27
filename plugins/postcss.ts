import { plugin } from 'bun'

await plugin({
  name: 'postcss',
  async setup(build) {
    build.onLoad({ filter: /\.css$/ }, async args => {
      const [fs, path, { default: postcss }, { plugins }] = await Promise.all([
        import('node:fs'),
        import('node:path'),
        import('postcss'),
        import('../postcss.config'),
      ])
      const from = args.path
      const cssOutputDir = path.resolve(import.meta.dir, '..', 'public', 'css')
      if (!fs.existsSync(cssOutputDir)) {
        fs.mkdirSync(cssOutputDir)
      }
      const to =
        from.replace(/(.+\/src\/|\.css$)/g, '').replaceAll('/', '-') + '.css'
      const outputPath = path.resolve(cssOutputDir, to)
      const text = fs.readFileSync(from, 'utf8')
      const { css } = await postcss(plugins).process(text, { from })
      await Bun.write(outputPath, css.toString())
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
