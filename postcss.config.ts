import { env } from 'node:process'

import type { AcceptedPlugin } from 'postcss'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import cssnano from 'cssnano'

const plugins: AcceptedPlugin[] = [tailwindcss, autoprefixer]
if (env.NODE_ENV === 'production') {
  plugins.push(cssnano)
}

export { plugins }
