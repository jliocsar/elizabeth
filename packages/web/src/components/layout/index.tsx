import Html from '@kitajs/html'

import css from './styles.css'

type TProps = Html.PropsWithChildren<{
  title: string
  styles?: string
}>

export function Layout({ title, styles, children }: TProps) {
  return (
    <html lang="en">
      <head>
        <title safe>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="/external/app.js" />
        {process.env.NODE_ENV === 'development' ? (
          <script>console.log(htmx)</script>
        ) : null}
        <link rel="stylesheet" href={css} media="all" />
        {styles ? <link rel="stylesheet" href={styles} media="all" /> : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
