/// <reference types="@kitajs/html/htmx.d.ts" />
declare namespace Lucia {
  type DatabaseUserAttributes = {
    email: string
  }
}

declare module '*.css' {
  const css: string
  export { css }
}
