/// <reference types="@kitajs/html/htmx.d.ts" />

// custom support through the `postcss` & `static-compression` plugins
declare module '*.png' {
  const src: JSX.HtmlImageTag.src
  export = src
}
declare module '*.css' {
  const src: JSX.HtmlImageTag.src
  export = src
}
declare module '*.svg' {
  const src: JSX.HtmlImageTag.src
  export = src
}
