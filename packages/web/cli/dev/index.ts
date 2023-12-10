import * as fs from 'node:fs'
import * as path from 'node:path'
import { exit } from 'node:process'

import type { Subprocess } from 'bun'

import * as Compression from '@elizabeth/lib/compression'
import { STATIC_FILTER } from '@elizabeth/lib/static'
import { WebSocketServer } from '@elizabeth/lib/websocket'
import { logger } from '@logger'

export class Dev {
  private readonly ws: WebSocketServer
  private readonly webPackage = path.resolve(import.meta.dir, '../..')
  private app?: Subprocess

  constructor() {
    this.ws = new WebSocketServer()
  }

  private async setup() {
    const index = path.resolve(this.webPackage, 'src', 'index.ts')
    this.app = Bun.spawn(['bun', 'run', '-b', '--silent', '--hot', index], {
      cwd: this.webPackage,
      stdio: ['inherit', 'inherit', 'inherit'],
    })
  }

  private async rebuildAsset(fileName: string) {
    const from = path.resolve(this.webPackage, fileName)
    await Compression.compressStaticFile(from)
    this.ws.publish('dev', 'reload')
  }

  async watch() {
    await this.setup()

    const watcher = fs.watch(
      this.webPackage,
      { recursive: true },
      (event, fileName) => {
        if (!fileName) {
          logger.error('No file name detected, skipping...')
          return
        }
        const isPublicFile = /^public\//.test(fileName)
        if (isPublicFile) {
          return
        }
        const isStaticFile = STATIC_FILTER.test(fileName)
        if (!isStaticFile) {
          return
        }
        logger.info('Detected %s in %s, rebuilding file...', event, fileName)
        return this.rebuildAsset(fileName)
      },
    )

    process.on('SIGINT', () => {
      logger.warn('Closing watcher...')
      watcher.close()
      this.app?.kill()
      exit(0)
    })
  }
}
