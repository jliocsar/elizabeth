import { env } from 'node:process'

import type { AcceptedPlugin } from 'postcss'
import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const plugins: AcceptedPlugin[] = [
  tailwindcssNesting(),
  tailwindcss(),
  autoprefixer(),
]
if (env.NODE_ENV === 'production') {
  plugins.push(cssnano())
}

export { plugins }
