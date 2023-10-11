import { stdout } from 'node:process'
import * as colorette from 'colorette'

const banner = `
${colorette.redBright(
  colorette.bold(`
    d####b    d#####P  d######P   d#P d#P
   d#P d#P   d#P         d#P     d#P d#P
  d####K\`   d###P       d#P     d####K"
 d#P a#F   d#P         d#P     d#P A#F
d####P"   d#####P     d#P     d#P d#P
`),
)}
                      ${colorette.italic(colorette.dim('_ stack boilerplate'))}

`

stdout.write(banner + '\n')
stdout.write('Under construction!\n')
