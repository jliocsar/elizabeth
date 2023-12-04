Bun.serve({
  port: 42070,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return
    }
    return new Response('Upgrade failed :(', { status: 500 })
  },
  websocket: {
    message(ws, message) {
      // send the message back
      ws.send(message)
    }, // a message is received
    open(ws) {}, // a socket is opened
    close(ws, code, message) {}, // a socket is closed
    drain(ws) {}, // the socket is ready to receive more data
  },
})
