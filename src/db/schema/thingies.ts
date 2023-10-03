import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const thingies = sqliteTable('thingies', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
})

export type Thingy = typeof thingies
export type SelectThingy = Thingy['$inferSelect']
export type InsertThingy = Thingy['$inferInsert']
