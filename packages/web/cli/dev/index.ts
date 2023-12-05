import { exit } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'

import { logger } from '@logger'

export class Dev {
  private readonly webPackage = path.resolve(import.meta.dir, '../..')
  private app?: ChildProcess

  private async setup() {
    this.app = spawn('bun', ['start'], {
      cwd: this.webPackage,
      stdio: 'inherit',
    })
  }

  private restart() {
    this.app!.kill()
    this.setup()
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
