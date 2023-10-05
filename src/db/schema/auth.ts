import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
  id: text('id', { length: 15 }).primaryKey().notNull(),
  email: text('email', { length: 255 }).notNull(),
})
export const userKeys = sqliteTable('user_key', {
  id: text('id', { length: 255 }).primaryKey().notNull(),
  userId: text('user_id', { length: 15 }).notNull(),
  hashedPassword: text('hashed_password', { length: 255 }),
})
export const userSessions = sqliteTable('user_session', {
  id: text('id', { length: 127 }).primaryKey().notNull(),
  email: text('email', { length: 255 }).notNull(),
  userId: text('user_id', { length: 15 }).notNull(),
  activeExpires: integer('active_expires', { mode: 'number' }).notNull(),
  idleExpires: integer('idle_expires', { mode: 'number' }).notNull(),
})

export const userKeysRelations = relations(userKeys, ({ one }) => ({
  user: one(users, {
    fields: [userKeys.userId],
    references: [users.id],
  }),
}))
export const userSessionRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}))

export type User = typeof users & Lucia.DatabaseUserAttributes
export type SelectUser = User['$inferSelect']
export type InsertUser = User['$inferInsert']
