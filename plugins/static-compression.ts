import { plugin } from 'bun'

await plugin({
  name: 'static-compression',
  async setup(build) {
    const pathCache = new Map<string, string>()
    const [fs, path] = await Promise.all([
      import('node:fs'),
      import('node:path'),
    ])
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
        process.stdout.write(`Compressing "${from}"\n`)
        const staticOutputDir = path.resolve(
          import.meta.dir,
          '..',
          'public',
          'static',
        )
        if (!fs.existsSync(staticOutputDir)) {
          fs.mkdirSync(staticOutputDir)
        }
        const to = from.replace(/.+\/src\/static\//g, '')
        const outputPath = path.resolve(staticOutputDir, to)
        const arrayBuffer = await Bun.file(from).arrayBuffer()
        const compressed = Bun.gzipSync(Buffer.from(arrayBuffer), {
          level: 9,
        })
        await Bun.write(outputPath, compressed)
        pathCache.set(from, to)
        const exports = {
          default: path.join('/public', 'static', to),
        }
        return {
          exports,
          loader: 'object',
        }
      },
    )
  },
})
