import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  index,
} from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    focus: text("focus").notNull(),
    website: text("website").notNull(),
    message: text("message").notNull(),
    createdAt: text("created_at").notNull(),
    notificationStatus: text("notification_status")
      .notNull()
      .default("pending"),
  },
  (table) => [
    index("inquiries_email_created_idx").on(table.email, table.createdAt),
  ],
);

export const conversionDaily = sqliteTable(
  "conversion_daily",
  {
    day: text("day").notNull(),
    event: text("event").notNull(),
    source: text("source").notNull(),
    count: integer("count").notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.day, table.event, table.source] })],
);
