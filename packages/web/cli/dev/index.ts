import * as fs from 'node:fs'
import * as path from 'node:path'
import { exit } from 'node:process'

import type { Subprocess } from 'bun'
import terminate from 'terminate'
import { WebSocketServer } from '@elizabeth/lib/websocket'

import { logger } from '@logger'

export class Dev {
  private readonly ws: WebSocketServer
  private readonly webPackage = path.resolve(import.meta.dir, '../..')
  private app?: Subprocess

  constructor() {
    this.ws = new WebSocketServer()
  }

  private setup() {
    this.app = Bun.spawn(['bun', 'start'], {
      cwd: this.webPackage,
      stdio: ['inherit', 'inherit', 'inherit'],
    })
  }

  private restart() {
    const app = this.app
    if (!app?.pid) {
      return this.setup()
    }
    terminate(app.pid, this.setup.bind(this))
  }

  watch() {
    this.setup()

    const watcher = fs.watch(
      this.webPackage,
      { recursive: true },
      (event, fileName) => {
        if (!fileName) {
          logger.error('No file name detected, skipping...')
          return
        }
        if (/^public\//.test(fileName)) {
          return
        }
        logger.info('Detected %s in %s, restarting...', event, fileName)
        this.restart()
      },
    )

    process.on('SIGINT', () => {
      logger.warn('Closing watcher...')
      watcher.close()
      exit(0)
    })
  }
}
