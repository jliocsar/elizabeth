import * as fs from 'node:fs'
import * as path from 'node:path'

import type { ArgumentsCamelCase } from 'yargs'

import * as Compression from '@elizabeth/lib/compression'
import { logger } from '@logger'

import { printLogo } from '../logo'

export class Build {
  private readonly externalDir = path.resolve(
    import.meta.dir,
    '../..',
    'public',
    'external',
  )
  private readonly externalScriptsOutputDir = path.join(
    this.externalDir,
    'app.js',
  )
  private readonly scripts = [
    'https://unpkg.com/htmx.org/dist/htmx.js',
    'https://unpkg.com/htmx.org/dist/ext/response-targets.js',
    'https://unpkg.com/hyperscript.org/dist/_hyperscript.min.js',
  ] as const

  async fetchAndWriteExternalScripts() {
    if (fs.existsSync(this.externalScriptsOutputDir)) {
      return logger.warn('External scripts already built, skipping fetch...')
    }
    if (!fs.existsSync(this.externalDir)) {
      fs.mkdirSync(this.externalDir)
    }
    let scripts = ''
    for (const script of this.scripts) {
      const arrayBuffer = await this.fetchArrayBuffer(script)
      scripts += Buffer.from(arrayBuffer).toString() + ';\n'
    }
    const compressed = Compression.gzipText(scripts)
    await Bun.write(this.externalScriptsOutputDir, compressed)
  }

  private async fetchArrayBuffer(url: string) {
    const result = await fetch(url)
    return result.arrayBuffer()
  }
}

export async function build(
  args: ArgumentsCamelCase<{
    silent?: boolean
  }>,
) {
  if (!args.silent) {
    await printLogo()
  }
  const build = new Build()
  await build.fetchAndWriteExternalScripts()
}
