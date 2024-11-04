import {
    pgTable,
    varchar,
    serial,
    integer,
    numeric,
    timestamp,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull(),
    icon: varchar("icon"),
    createdBy: varchar("createdBy").notNull(),
});

export const Expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    budgetId: integer("budgetId").references(() => Budgets.id),
});
