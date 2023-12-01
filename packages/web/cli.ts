import { stdout, stderr, argv, exit } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Elysia } from 'elysia'
import type { ArgumentsCamelCase } from 'yargs'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { minify } from 'uglify-js'
import * as C from 'colorette'

import * as Compression from '@elizabeth/lib/compression'
import { logger } from '@logger'

async function printLogo() {
  const logo = path.resolve(import.meta.dir, 'cli-logo.txt')
  const text = await Bun.file(logo).text()
  stdout.write(C.redBright(text) + '\n\n')
}

class Build {
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

class Dev {
  private app: Elysia = null!

  private async setup() {
    const { startServer } = await import('@app')
    this.app = startServer()
  }

  private restart() {
    const appPort = this.app.server!.port
    this.app.stop()
    this.app.listen(appPort)
  }

  async watch() {
    await this.setup()

    const watcher = fs.watch(import.meta.dir, (event, filename) => {
      logger.info('Detected %s in %s, restarting...', event, filename)
      this.restart()
    })

    process.on('SIGINT', () => {
      logger.warn('Closing watcher...')
      watcher.close()
      exit(0)
    })
  }
}

async function build(
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

yargs(hideBin(argv))
  .option('silent', {
    alias: 's',
    type: 'boolean',
    description: 'Runs in silent mode',
  })
  .command(
    'dev',
    'runs project in development mode',
    () => {},
    async args => {
      await build(args)
      const dev = new Dev()
      dev.watch()
    },
  )
  .command(
    'build',
    'runs project build',
    () => {},
    async args => {
      console.time('build')
      await build(args)
      console.timeEnd('build')
      exit(0)
    },
  )
  .demandCommand(1).argv
