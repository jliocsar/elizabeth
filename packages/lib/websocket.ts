import type { Server } from 'bun'

import { DEFAULT_WS_PORT } from '@elizabeth/config/const'

export class WebSocketServer {
  private server: Server

  constructor() {
    this.server = Bun.serve({
      port: DEFAULT_WS_PORT,
      fetch(req, server) {
        if (server.upgrade(req)) {
          return
        }
        return new Response('Upgrade failed :(', { status: 500 })
      },
      websocket: {
        message(ws, message) {
          // send the message back
          ws.publish('dev', message)
        }, // a message is received
        open(ws) {
          ws.subscribe('dev')
        }, // a socket is opened
        close(ws, code, message) {
          ws.unsubscribe('dev')
        }, // a socket is closed
      },
    })
  }

  publish(event: string, data: string) {
    this.server.publish(event, data)
  }
}
