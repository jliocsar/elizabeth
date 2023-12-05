import { DEFAULT_WS_PORT } from '@elizabeth/config/const'

type TProps = {
  port?: number
}

export function Devtools({ port = DEFAULT_WS_PORT }: TProps) {
  return (
    <script>{
      /*javascript*/ `
      const socket = htmx.createWebSocket('ws://localhost:${port}')
      socket.addEventListener('message', function (event) {
        if (event.data === 'reload') {
          window.location.reload()
        }
      })
    `
    }</script>
  )
}
