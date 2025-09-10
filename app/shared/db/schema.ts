import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersSchema = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionsSchema = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
});

export const accountsSchema = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersSchema.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verificationsSchema = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// --------------
// INGREDIENTS
// --------------

export const ingredientsSchema = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", {
    length: 256,
  }).notNull(),
  quantity: integer("quantity").notNull().default(0),
  unity_type: text("unity_type", {
    enum: ["gr", "kg", "ml", "l", "unit"],
  }),
  threshold: integer("threshold").notNull().default(0),
  user_id: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
});

export const ingredientsRelations = relations(ingredientsSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [ingredientsSchema.user_id],
    references: [usersSchema.id],
  }),
}));

// --------------
// MEALS
// --------------

export const mealsSchema = sqliteTable("meals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", {
    length: 256,
  }).notNull(),
  type: text("type", {
    enum: ["breakfast", "lunch", "dinner", "snack"],
  }).notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
});

export const mealsRelations = relations(mealsSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [mealsSchema.user_id],
    references: [usersSchema.id],
  }),
}));

// --------------
// MEAL_INGREDIENTS
// --------------

export const mealIngredientsSchema = sqliteTable("meal_ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  meal_id: integer("meal_id")
    .notNull()
    .references(() => mealsSchema.id),
  ingredient_id: integer("ingredient_id")
    .notNull()
    .references(() => ingredientsSchema.id),
  quantity: integer("quantity").notNull().default(1),
});

export const mealIngredientsRelations = relations(
  mealIngredientsSchema,
  ({ one }) => ({
    meal: one(mealsSchema, {
      fields: [mealIngredientsSchema.meal_id],
      references: [mealsSchema.id],
    }),
    ingredient: one(ingredientsSchema, {
      fields: [mealIngredientsSchema.ingredient_id],
      references: [ingredientsSchema.id],
    }),
  }),
);

// --------------
// MEAL_LOGS
// --------------

export const mealLogsSchema = sqliteTable("meal_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(current_timestamp)`),
  meal_id: integer("meal_id")
    .notNull()
    .references(() => mealsSchema.id),
  user_id: text("user_id")
    .notNull()
    .references(() => usersSchema.id),
});
