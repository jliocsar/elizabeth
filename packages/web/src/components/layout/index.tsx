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
        <script defer type="module" src="/public/external/app.js" />
        <link rel="stylesheet" href={css} media="all" />
        {styles ? <link rel="stylesheet" href={styles} media="all" /> : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
