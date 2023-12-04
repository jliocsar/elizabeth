import * as path from 'node:path'
import * as fs from 'node:fs'

import type { ZlibCompressionOptions } from 'bun'

import * as Postcss from './postcss'
import * as Static from './static'

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
    to = Postcss.toOutputFileName(to)
    buffer = await Postcss.processBuffer(buffer, from, to)
  }
  const outputPath = path.join(publicOutputDir, to)
  const outputDir = path.resolve(outputPath, '..')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  const compressed = gzipBuffer(buffer)
  await Bun.write(outputPath, compressed)
  const src = '/' + to
  return src
}
