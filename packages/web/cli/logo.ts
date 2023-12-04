import { stdout } from 'node:process'
import * as path from 'node:path'
import * as C from 'colorette'

export async function printLogo() {
  const logo = path.resolve(import.meta.dir, 'logo.txt')
  const text = await Bun.file(logo).text()
  stdout.write(C.redBright(text) + '\n\n')
}
