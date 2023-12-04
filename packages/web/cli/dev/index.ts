import { exit } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Elysia } from 'elysia'

import * as Compression from '@elizabeth/lib/compression'
import { isStatic } from '@elizabeth/lib/static'
import { logger } from '@logger'

export class Dev {
  private readonly webPackage = path.resolve(import.meta.dir, '../..')
  private app: Elysia = null!

  private async setup() {
    const { startServer } = await import('@app')
    this.app = startServer()
  }

  private restart() {
    this.app.stop()
    return this.setup()
  }

  private async handleStaticChange(fileName: string) {
    await Compression.compressStaticFile(
      path.resolve(import.meta.dir, fileName),
    )
  }

  async watch() {
    await this.setup()

    const watcher = fs.watch(
      this.webPackage,
      { recursive: true },
      async (event, fileName) => {
        if (!fileName) {
          logger.error('No file name detected, skipping...')
          return
        }
        if (fileName instanceof Error) {
          logger.error('Error detected, skipping...')
          logger.error(fileName)
          return
        }
        if (/^public\//.test(fileName)) {
          return
        }
        logger.info('Detected %s in %s, restarting...', event, fileName)
        if (isStatic(fileName)) {
          await this.handleStaticChange(fileName)
        }
        await this.restart()
      },
    )

    process.on('SIGINT', () => {
      logger.warn('Closing watcher...')
      watcher.close()
      exit(0)
    })
  }
}
