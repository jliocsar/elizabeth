/// <reference types="@kitajs/html/htmx.d.ts" />
// hyperscript support
declare namespace JSX {
  interface HtmlTag extends Htmx.Attributes {
    _?: string
  }
}

declare module '*.css' {
  const filePath: string
  export default filePath
}
