import { stderr, exit } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'

import type { ArgumentsCamelCase } from 'yargs'
import { minify } from 'uglify-js'

import * as Compression from '@elizabeth/lib/compression'
import { logger } from '@logger'

import { printLogo } from './logo'

export class Build {
  async fetchAndWriteExternalScripts() {
    const externalDir = path.resolve(import.meta.dir, 'public', 'external')
    const outputPath = path.join(externalDir, 'app.js')
    if (fs.existsSync(outputPath)) {
      return logger.warn('External scripts already built, skipping fetch...')
    }
    if (!fs.existsSync(externalDir)) {
      fs.mkdirSync(externalDir)
    }
    const { error, code: minified } = minify(
      (
        await Promise.all([
          this.fetchText('https://unpkg.com/htmx.org/dist/htmx.js'),
          this.fetchText(
            'https://unpkg.com/htmx.org/dist/ext/response-targets.js',
          ),
          this.fetchText(
            'https://unpkg.com/hyperscript.org/dist/_hyperscript.min.js',
          ),
        ])
      ).join('\n'),
    )
    if (error) {
      stderr.write(error.message + '\n')
      exit(1)
    }
    const compressed = Compression.gzipText(minified)
    await Bun.write(outputPath, compressed)
  }

  private async fetchText(url: string) {
    const result = await fetch(url)
    return result.text()
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
