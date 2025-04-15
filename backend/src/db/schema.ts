import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const productTypeEnum = pgEnum("product_type", [
  "Auto",
  "Home",
  "Health",
  "Life",
  "Travel",
  "Business",
  "Liability",
  "Property",
]);

export const insuranceTypeEnum = pgEnum("insurance_type", [
  "Comprehensive",
  "Third Party",
  "Basic",
  "Premium",
  "Standard",
  "Custom",
  "Term",
  "Whole Life",
]);

export const offersTable = pgTable("offers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  price: integer().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  productType: productTypeEnum("product_type").notNull(),
  insuranceType: insuranceTypeEnum("insurance_type").notNull(),
});
