import { stdout, stderr, argv, exit } from 'node:process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { minify } from 'uglify-js'
import * as C from 'colorette'

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
      stdout.write(
        C.yellow('External scripts already built, skipping fetch...\n'),
      )
      exit(0)
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
    await Bun.write(
      outputPath,
      Bun.gzipSync(Buffer.from(minified), {
        level: 9,
      }),
    )
    exit(0)
  }

  private async fetchText(url: string) {
    const result = await fetch(url, {
      verbose: true,
    })
    return result.text()
  }
}

await printLogo()

yargs(hideBin(argv))
  .command(
    'build',
    'runs project build',
    () => {},
    async () => {
      console.time('build')
      const build = new Build()
      await build.fetchAndWriteExternalScripts()
      console.timeEnd('build')
    },
  )
  .demandCommand(1).argv
