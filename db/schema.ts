import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core'

export const journalEntries = pgTable('journal_entries', {
  id: serial().primaryKey(),
  clientId: text('client_id').notNull(),
  subject: text('subject').notNull(),
  subjectTitle: text('subject_title').notNull(),
  question: text('question').notNull(),
  hypothesisText: text('hypothesis_text').notNull(),
  resultText: text('result_text').notNull(),
  matched: boolean('matched').notNull(),
  lang: text('lang').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
