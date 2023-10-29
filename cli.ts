import { stdout, argv } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import * as C from 'colorette'

async function printLogo() {
  const logo = path.resolve(import.meta.dir, 'cli-logo.txt')
  const text = await Bun.file(logo).text()
  stdout.write(C.redBright(text) + '\n\n')
}

async function fetchGzippedText(url: string) {
  const result = await fetch(url)
  const text = await result.text()
  return Bun.gzipSync(Buffer.from(text))
}

async function fetchAndWriteExternalScripts() {
  const [htmx, responseTargets, hyperscript] = await Promise.all([
    fetchGzippedText('https://unpkg.com/htmx.org/dist/htmx.min.js'),
    fetchGzippedText('https://unpkg.com/htmx.org/dist/ext/response-targets.js'),
    fetchGzippedText(
      'https://unpkg.com/hyperscript.org/dist/_hyperscript.min.js',
    ),
  ])
  const externalDir = path.resolve(import.meta.dir, 'public', 'external')
  if (!fs.existsSync(externalDir)) {
    fs.mkdirSync(externalDir)
  }
  await Promise.all([
    Bun.write(path.join(externalDir, 'htmx.min.js'), htmx),
    Bun.write(path.join(externalDir, 'response-targets.js'), responseTargets),
    Bun.write(path.join(externalDir, '_hyperscript.min.js'), hyperscript),
  ])
}

await printLogo()

yargs(hideBin(argv))
  .command(
    'build',
    'runs project build',
    () => {},
    async () => {
      await fetchAndWriteExternalScripts()
    },
  )
  .demandCommand(1).argv
