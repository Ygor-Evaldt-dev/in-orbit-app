import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const goal = pgTable("meta", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text("titulo")
		.notNull(),
	desireWeeklyFrequency: integer("frequencia_semanal_desejada")
		.notNull(),
	createdAt: timestamp("data_criacao", { withTimezone: true })
		.notNull()
		.defaultNow()
});

export const goalCompleted = pgTable("meta_concluida", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	goalId: text("id_meta")
		.references(() => goal.id)
		.notNull(),
	createdAt: timestamp("data_criacao", { withTimezone: true })
		.notNull()
		.defaultNow()
});