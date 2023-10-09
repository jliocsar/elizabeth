import Html from '@kitajs/html'
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
        <script
          defer
          type="module"
          src="https://unpkg.com/htmx.org/dist/htmx.min.js"
        />
        <script
          defer
          type="module"
          src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"
        />
        <script
          defer
          type="module"
          src="https://unpkg.com/hyperscript.org/dist/_hyperscript.min.js"
        />
        <style>{tailwind}</style>
        <style>{css}</style>
        {styles ? <style>{styles}</style> : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
