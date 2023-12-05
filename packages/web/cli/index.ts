import { argv, exit } from 'node:process'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import { Dev } from './dev'
import { build } from './build'

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
    () => {
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
