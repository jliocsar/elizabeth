import Html from '@kitajs/html'
// @ts-expect-error - no type-checking for css
import { css } from '../styles.css'

type TProps = Html.PropsWithChildren<{
  title: string
}>

export function Layout({ title, children }: TProps) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <script
          type="module"
          src="https://unpkg.com/htmx.org/dist/htmx.min.js"
        ></script>
        <script
          type="module"
          src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"
        ></script>
        <style>{css}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
