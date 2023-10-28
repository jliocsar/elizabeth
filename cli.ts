import { argv } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

async function fetchText(url: string) {
  const result = await fetch(url)
  return result.text()
}

yargs(hideBin(argv))
  .command(
    'build',
    'runs project build',
    () => {},
    async () => {
      const [htmx, responseTargets, hyperscript] = await Promise.all([
        fetchText('https://unpkg.com/htmx.org/dist/htmx.min.js'),
        fetchText('https://unpkg.com/htmx.org/dist/ext/response-targets.js'),
        fetchText('https://unpkg.com/hyperscript.org/dist/_hyperscript.min.js'),
      ])
      const externalDir = path.resolve(import.meta.dir, 'public', 'external')
      if (!fs.existsSync(externalDir)) {
        fs.mkdirSync(externalDir)
      }
      await Promise.all([
        Bun.write(path.join(externalDir, 'htmx.min.js'), htmx),
        Bun.write(
          path.join(externalDir, 'response-targets.js'),
          responseTargets,
        ),
        Bun.write(path.join(externalDir, '_hyperscript.min.js'), hyperscript),
      ])
    },
  )
  .demandCommand(1).argv
