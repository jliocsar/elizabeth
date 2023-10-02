import type { AcceptedPlugin } from 'postcss'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import cssnano from 'cssnano'

export const plugins = [
  tailwindcss,
  autoprefixer,
  cssnano,
] satisfies AcceptedPlugin[]
