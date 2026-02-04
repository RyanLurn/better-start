/* eslint-disable perfectionist/sort-objects */

import {
  timestamp,
  boolean,
  pgTable,
  index,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { timestamps } from "@/db/helpers/timestamps";

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean().notNull(),
  image: text(),
  ...timestamps,
});
