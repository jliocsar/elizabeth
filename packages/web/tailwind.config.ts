import type { Config } from 'tailwindcss'

import daisyui, { type Config as DaisyConfig } from 'daisyui'

const daisyuiConfig = {
  logs: false,
} satisfies DaisyConfig

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: daisyuiConfig,
} satisfies Config
