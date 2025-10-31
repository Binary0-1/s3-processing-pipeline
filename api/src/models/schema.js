import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  originalName: text('original_name').notNull(),
  s3Key: text('s3_key').notNull(),
  processedKey: text('processed_key'),
  status: text('status', { enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'] }).default('PENDING'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

