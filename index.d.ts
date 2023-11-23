/// <reference types="@kitajs/html/htmx.d.ts" />
// custom support through the `postcss` & `static-compression` plugins
declare module '*.svg' {
  export default string
}
declare module '*.png' {
  export default string
}
declare module '*.css' {
  export default string
}
