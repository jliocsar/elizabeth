import postcss from 'postcss'
import { plugins } from './postcss.config'

const processor = postcss(plugins)

export function toOutputFileName(from: string, prefix = 'css') {
  return `${prefix}/${from.replaceAll('/', '-')}`
}

export async function processBuffer(buffer: Buffer, from: string, to: string) {
  const text = buffer.toString()
  const { css } = await processor.process(text, { from, to })
  return Buffer.from(css)
}
