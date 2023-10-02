import Html from '@kitajs/html'
// @ts-ignore
import { css } from '../styles.css'

type TProps = Html.PropsWithChildren<{
  title: string
  className?: string
}>

export function Layout({ title, children, className }: TProps) {
  return (
    <>
      <head>
        <title>{title}</title>
        <style>{css}</style>
      </head>
      <body class={className}>{children}</body>
    </>
  )
}
