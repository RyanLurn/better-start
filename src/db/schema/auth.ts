/* eslint-disable perfectionist/sort-objects */

import { timestamp, boolean, pgTable, index, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/db/helpers/timestamps";
import { userId } from "@/db/helpers/user-id";
import { id } from "@/db/helpers/id";

export const userTable = pgTable("users", {
  id,
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull(),
  image: text(),
  ...timestamps,
});

export const sessionTable = pgTable(
  "sessions",
  {
    id,
    userId,
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)]
);
