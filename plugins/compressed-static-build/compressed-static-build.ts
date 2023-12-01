import { type PluginConstraints, plugin } from 'bun'

// compresses any static file (img, css, fonts etc)
// besides building PostCSS syntax on compress time
await plugin({
  name: 'compressed-static-build',
  async setup(build) {
    const label = `[${process.pid}] compressed-static-build`
    console.time(label)
    const { existsSync, mkdirSync } = await import('node:fs')
    const { resolve, join, parse } = await import('node:path')
    const Postcss = await import('@elizabeth/lib/postcss')
    const Compression = await import('@elizabeth/lib/compression')
    const webModule = await import.meta.resolve('@elizabeth/web')
    const { dir: webModuleSrcDir } = parse(webModule)
    const publicOutputDir = resolve(webModuleSrcDir, '..', 'public')
    if (!existsSync(publicOutputDir)) {
      mkdirSync(publicOutputDir)
    }
    const imgExtCapture = 'png|jp?eg|gif|svg'
    const fontExtCapture = 'woff2?|eot|ttf|otf'
    const cssExt = 'css'
    const cssExtCapture = new RegExp(`.${cssExt}`)
    const filter = new RegExp(
      '.' + // dot from the file extension
        '(' + // start of capture group
        imgExtCapture + // image types capture
        '|' + // or
        cssExt + // css capture
        '|' + // or
        fontExtCapture +
        ')' + // end of capture group
        '$', // match only the end of string
    )
    const constraints: PluginConstraints = {
      filter,
    }
    console.timeEnd(label)
    build.onLoad(constraints, async args => {
      const from = args.path
      let to = from.replace(/.+src\//g, '')
      const arrayBuffer = await Bun.file(from).arrayBuffer()
      let buffer = Buffer.from(arrayBuffer)
      if (cssExtCapture.test(from)) {
        to = 'css/' + to.replaceAll('/', '-')
        buffer = await Postcss.processBuffer(buffer, from, to)
      }
      const outputPath = join(publicOutputDir, to)
      const outputDir = resolve(outputPath, '..')
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir)
      }
      const compressed = Compression.gzipBuffer(buffer)
      await Bun.write(outputPath, compressed)
      const src = '/public/' + to
      return {
        exports: {
          default: src,
        },
        loader: 'object',
      }
    })
  },
})
