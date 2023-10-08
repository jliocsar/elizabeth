import { Context } from 'elysia'

type HtmxHeader = 'Redirect'

export class Htmx {
  static setHeader(set: Context['set'], name: HtmxHeader, path: string) {
    set.headers[`HX-${name}`] = path
  }

  static setRedirect(set: Context['set'], path: string) {
    Htmx.setHeader(set, 'Redirect', path)
  }
}
