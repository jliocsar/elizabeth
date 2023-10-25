import { plugin } from 'bun'

await plugin({
  name: 'htmx',
  async setup(build) {
    build.onLoad({ filter: /(htmx|hyperscript)\.org/ }, async args => {
      const { readFileSync } = await import('node:fs')
      const from = args.path
      const text = readFileSync(from, 'utf8')
      const exports = { default: text }

      return {
        exports,
        loader: 'object',
      }
    })
  },
})
