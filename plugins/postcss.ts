import { plugin } from 'bun'

await plugin({
  name: 'postcss',
  async setup(build) {
    build.onLoad({ filter: /\.css$/ }, async args => {
      const [{ readFileSync }, { default: postcss }, { plugins }] =
        await Promise.all([
          import('node:fs'),
          import('postcss'),
          import('../postcss.config'),
        ])
      const from = args.path
      const text = readFileSync(from, 'utf8')
      const css = await postcss(plugins).process(text, { from })
      const exports = { css: css.toString() }

      return {
        exports,
        loader: 'object',
      }
    })
  },
})
