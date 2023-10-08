import { env } from 'node:process'

import type { AcceptedPlugin } from 'postcss'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import nested from 'postcss-nested'
import cssnano from 'cssnano'

const plugins: AcceptedPlugin[] = [tailwindcss, autoprefixer, nested]
if (env.NODE_ENV === 'production') {
  plugins.push(cssnano)
}

export { plugins }
