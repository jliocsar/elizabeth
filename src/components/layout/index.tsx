import Html from '@kitajs/html'
// @ts-expect-error - no types
import htmx from 'htmx.org/dist/htmx.min.js'
// @ts-expect-error - no types
import responseTargets from 'htmx.org/dist/ext/response-targets.js'
// @ts-expect-error - no types
import hyperscript from 'hyperscript.org/dist/_hyperscript.min.js'

import { css as tailwind } from '../../tailwind.css'
import { css } from './styles.css'

type TProps = Html.PropsWithChildren<{
  title: string
  styles?: string
}>

export function Layout({ title, styles, children }: TProps) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script>
          {htmx}
          {responseTargets}
          {hyperscript}
        </script>
        <style>
          {tailwind}
          {css}
        </style>
        {styles ? <style>{styles}</style> : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
