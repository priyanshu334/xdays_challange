import {
    pgTable,
    text,
    integer,
    timestamp,
    uuid
} from "drizzle-orm/pg-core"

import { users } from "./users"

export const challenges = pgTable("challenges", {

    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),

    title: text("title").notNull(),

    description: text("description"),

    durationDays: integer("duration_days").notNull(),

    startDate: timestamp("start_date").notNull(),

    endDate: timestamp("end_date").notNull(),

    createdAt: timestamp("created_at").defaultNow()
})