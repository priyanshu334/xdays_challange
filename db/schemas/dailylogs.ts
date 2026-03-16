import {
    pgTable,
    uuid,
    integer,
    boolean,
    text,
    timestamp
} from "drizzle-orm/pg-core"

import { challenges } from "./challanges"

export const dailyLogs = pgTable("daily_logs", {

    id: uuid("id").defaultRandom().primaryKey(),

    challengeId: uuid("challenge_id")
        .references(() => challenges.id)
        .notNull(),

    dayNumber: integer("day_number").notNull(),

    completed: boolean("completed").default(false),

    note: text("note"),

    createdAt: timestamp("created_at").defaultNow()
})