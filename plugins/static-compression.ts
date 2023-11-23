import { type PluginConstraints, plugin } from 'bun'
import { logger } from '@logger'

await plugin({
  name: 'static-compression',
  async setup(build) {
    const label = `[${process.pid}] static-compression`
    console.time(label)
    const pathCache = new Map<string, string>()
    const { existsSync, mkdirSync } = await import('node:fs')
    const { resolve, join } = await import('node:path')
    const staticOutputDir = resolve(import.meta.dir, '..', 'public', 'static')
    console.timeEnd(label)
    const constraints: PluginConstraints = {
      filter: /\.(png|jpe?g|gif|svg)$/,
    }
    // bypass import errors for these files
    build.onResolve(constraints, async args => {
      const from = args.path
      console.log({ from })
      if (pathCache.has(from)) {
        return {
          path: pathCache.get(from)!,
        }
      }
      if (!existsSync(staticOutputDir)) {
        mkdirSync(staticOutputDir)
      }
      let [fileName, extension] = from
        .replace(/.+\/src\/static\//g, '')
        .split('.')
      let to = fileName
      let buffer = null
      if (fileName.includes('_')) {
        const { default: sharp } = await import('sharp')
        const params: {
          size?: string
          format?: string
        } = {}
        const parts = fileName.split('_')
        let part: string | undefined
        while ((part = parts.shift())) {
          const [key, value] = part.split('=')
          if (key !== 'size' && key !== 'format') {
            throw new Error(
              `Invalid static file name: ${fileName}. Only "size" and "format" are supported.`,
            )
          }
          params[key] = value
        }
        const converted = sharp(from)
        if (params.size) {
          const [width, height] = params.size.split('x').map(Number)
          if (width && height) {
            to += `-${width}x${height}`
          }
          converted.resize(width, height)
        }
        if (params.format) {
          extension = params.format
          converted.toFormat(params.format as any) // will error on unsupported format
        }
        logger.debug(`Converting ${from} to ${to}`)
        buffer = await converted.toBuffer()
      }
      to += '.' + extension
      const outputPath = join(staticOutputDir, to)
      // no need to convert
      if (!buffer) {
        const arrayBuffer = await Bun.file(from).arrayBuffer()
        buffer = Buffer.from(arrayBuffer)
      }
      const compressed = Bun.gzipSync(buffer, {
        level: process.env.NODE_ENV === 'development' ? 0 : 9,
      })
      await Bun.write(outputPath, compressed)
      pathCache.set(from, to)
      return {
        path: join('/public', 'static', to),
      }
    })
  },
})
