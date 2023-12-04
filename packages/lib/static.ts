import * as path from 'node:path'

export const DEFAULT_PUBLIC_DIR = path.resolve(
  import.meta.dir,
  '..',
  'web',
  'public',
)
export const IMG_EXT_CAPTURE = 'png|jp?eg|gif|svg'
export const FONT_EXT_CAPTURE = 'woff2?|eot|ttf|otf'
export const CSS_EXT = 'css'
export const CSS_EXT_CAPTURE = new RegExp(`.${CSS_EXT}`)
export const STATIC_FILTER = new RegExp(
  '.' + // dot from the file extension
    '(' + // start of capture group
    IMG_EXT_CAPTURE + // image types capture
    '|' + // or
    CSS_EXT + // css capture
    '|' + // or
    FONT_EXT_CAPTURE +
    ')' + // end of capture group
    '$', // match only the end of string
)

export function isCss(testPath: string) {
  return CSS_EXT_CAPTURE.test(testPath)
}

export function isStatic(testPath: string) {
  return STATIC_FILTER.test(testPath)
}
