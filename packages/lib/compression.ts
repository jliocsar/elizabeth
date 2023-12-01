import type { ZlibCompressionOptions } from 'bun'

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
