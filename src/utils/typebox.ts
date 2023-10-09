import { t } from 'elysia'

type TObjectFn = typeof t.Object
type TProperties = Parameters<TObjectFn>[0]
type TObject<T extends TProperties> = ReturnType<typeof t.Object<T>>

export function mergeSchemaProperties<
  A extends TProperties,
  B extends TProperties,
>(schemaA: TObject<A>, schemaBProperties: B) {
  return t.Object(
    Object.assign({}, schemaA.properties, schemaBProperties) as A & B,
  )
}
