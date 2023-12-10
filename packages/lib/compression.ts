import * as path from 'node:path'

import type { ZlibCompressionOptions } from 'bun'

import * as Static from './static'

let Postcss: typeof import('./postcss') | null = null

export function gzipText(text: string, options?: ZlibCompressionOptions) {
  const buffer = Buffer.from(text)
  return gzipBuffer(buffer, options)
}

export function gzipBuffer(buffer: Buffer, options?: ZlibCompressionOptions) {
  return Bun.gzipSync(
    buffer,
    Object.assign(
      {
        level: process.env.NODE_ENV === 'development' ? 1 : 9,
      },
      options,
    ),
  )
}

export async function compressStaticFile(
  from: string,
  publicOutputDir = Static.DEFAULT_PUBLIC_DIR,
) {
  let to = from.replace(/.+src\//g, '')
  const arrayBuffer = await Bun.file(from).arrayBuffer()
  let buffer = Buffer.from(arrayBuffer)
  if (Static.isCss(from)) {
    // PostCSS' import is super slow, so we lazily import it on the first CSS file compression
    Postcss ??= await import('./postcss')
    to = Postcss.toOutputFileName(to)
    buffer = await Postcss.processBuffer(buffer, from, to)
  }
  const outputPath = path.join(publicOutputDir, to)
  const compressed = gzipBuffer(buffer)
  await Bun.write(outputPath, compressed)
  const src = '/' + to
  return src
}
