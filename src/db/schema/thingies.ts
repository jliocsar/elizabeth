import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const thingies = sqliteTable(
  'thingies',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').unique().notNull(),
  },
  table => ({
    nameIdx: index('name_idx').on(table.name),
  }),
)

export type Thingy = typeof thingies
export type TSelectThingy = Thingy['$inferSelect']
export type TInsertThingy = Thingy['$inferInsert']
