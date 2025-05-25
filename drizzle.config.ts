import { defineConfig } from "drizzle-kit"
import 'dotenv/config';

export default defineConfig({
  schema: "./drizzle/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true
})
